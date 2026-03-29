interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds
const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

/** Maximum number of tracked IPs to prevent memory exhaustion */
const MAX_STORE_SIZE = 10_000;

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }

  // Emergency eviction if store grows too large (DoS protection)
  if (store.size > MAX_STORE_SIZE) {
    const entries = [...store.entries()];
    entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
    const toRemove = entries.slice(0, entries.length - MAX_STORE_SIZE);
    for (const [key] of toRemove) {
      store.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
};

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = store.get(identifier);

  // No existing entry or window expired — allow and start fresh
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    store.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  // Within window — check count
  if (entry.count < config.maxRequests) {
    entry.count++;
    return {
      allowed: true,
      remaining: config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Rate limited
  return {
    allowed: false,
    remaining: 0,
    resetTime: entry.resetTime,
  };
}

// Regex to match a valid IPv4 or simplified IPv6 pattern
const IPV4_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const IPV6_REGEX = /^[0-9a-fA-F:]+$/;

/**
 * Validate that a string looks like an IP address to prevent
 * attackers from using crafted X-Forwarded-For values.
 */
function isValidIp(ip: string): boolean {
  if (ip.length > 45) return false; // max IPv6 length
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip);
}

/**
 * Extract a client identifier from the request for rate limiting.
 * Uses X-Forwarded-For (first hop) or X-Real-IP, validated to be
 * a plausible IP address format.
 */
export function getClientIdentifier(request: Request): string {
  // Try X-Forwarded-For first (standard behind proxies/Vercel/Cloudflare)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp && isValidIp(firstIp)) {
      return `ip:${firstIp}`;
    }
  }

  // Fallback to X-Real-IP
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    const trimmed = realIp.trim();
    if (isValidIp(trimmed)) {
      return `ip:${trimmed}`;
    }
  }

  // Last resort: use a hash based on user-agent to at least differentiate clients
  const ua = request.headers.get("user-agent") || "no-ua";
  return `ua:${simpleHash(ua)}`;
}

/** Simple string hash for fallback client identification */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(36);
}

/** Get current store size (for health/monitoring) */
export function getRateLimitStoreSize(): number {
  return store.size;
}
