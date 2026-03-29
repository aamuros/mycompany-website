import { Redis } from "@upstash/redis";

/**
 * Shared Upstash Redis client.
 * Returns null when credentials are missing (dev mode) so callers
 * can fall back to in-memory behaviour.
 */
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;
