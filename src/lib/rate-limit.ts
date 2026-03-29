import { redis } from "./redis";

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

// ── Redis-backed rate limiter (production) ──────────────────────────

async function checkRateLimitRedis(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Sliding window: remove old entries, add current, count
  const pipeline = redis!.pipeline();
  pipeline.zremrangebyscore(key, 0, windowStart);
  pipeline.zadd(key, { score: now, member: `${now}:${Math.random()}` });
  pipeline.zcard(key);
  pipeline.pexpire(key, config.windowMs);

  const results = await pipeline.exec();
  const count = results[2] as number;

  const resetTime = now + config.windowMs;
  if (count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime };
  }
  return {
    allowed: true,
    remaining: config.maxRequests - count,
    resetTime,
  };
}

// ── In-memory rate limiter (dev / fallback) ─────────────────────────

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 60 * 1000;
const MAX_STORE_SIZE = 10_000;
let lastCleanup = Date.now();

function cleanupMemoryStore() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of memoryStore) {
    if (now > entry.resetTime) memoryStore.delete(key);
  }

  if (memoryStore.size > MAX_STORE_SIZE) {
    const entries = [...memoryStore.entries()];
    entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
    for (const [key] of entries.slice(0, entries.length - MAX_STORE_SIZE)) {
      memoryStore.delete(key);
    }
  }
}

function checkRateLimitMemory(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanupMemoryStore();

  const now = Date.now();
  const entry = memoryStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    memoryStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  if (entry.count < config.maxRequests) {
    entry.count++;
    return {
      allowed: true,
      remaining: config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  return { allowed: false, remaining: 0, resetTime: entry.resetTime };
}

// ── Public API ──────────────────────────────────────────────────────

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): Promise<RateLimitResult> {
  if (redis) {
    try {
      return await checkRateLimitRedis(identifier, config);
    } catch (err) {
      console.error("Redis rate-limit error, falling back to memory:", err);
    }
  }
  return checkRateLimitMemory(identifier, config);
}

// ── IP extraction ───────────────────────────────────────────────────

const IPV4_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const IPV6_REGEX = /^[0-9a-fA-F:]+$/;

function isValidIp(ip: string): boolean {
  if (ip.length > 45) return false;
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip);
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp && isValidIp(firstIp)) return `ip:${firstIp}`;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    const trimmed = realIp.trim();
    if (isValidIp(trimmed)) return `ip:${trimmed}`;
  }

  const ua = request.headers.get("user-agent") || "no-ua";
  return `ua:${simpleHash(ua)}`;
}

/** Extract raw IP string for logging (not prefixed) */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp && isValidIp(firstIp)) return firstIp;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp && isValidIp(realIp.trim())) return realIp.trim();
  return "unknown";
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}
