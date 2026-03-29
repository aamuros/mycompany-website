import { redis } from "./redis";
import type { ContactFormData } from "./validation";

const CONTACT_LOG_KEY = "contact:submissions";
/** Keep submissions for 90 days */
const SUBMISSION_TTL_SECONDS = 90 * 24 * 60 * 60;

interface ContactLogEntry extends ContactFormData {
  submittedAt: string;
  ip: string;
}

/**
 * Persist a contact form submission to Redis as a backup to email.
 * Silently no-ops in dev mode (no Redis) — never blocks the request.
 */
export async function logContactSubmission(
  data: ContactFormData,
  ip: string
): Promise<void> {
  if (!redis) return;

  try {
    const entry: ContactLogEntry = {
      ...data,
      submittedAt: new Date().toISOString(),
      ip,
    };

    // Store in a sorted set keyed by timestamp for easy range queries
    const score = Date.now();
    const member = JSON.stringify(entry);
    await redis.zadd(CONTACT_LOG_KEY, { score, member });

    // Prune entries older than the TTL
    const cutoff = Date.now() - SUBMISSION_TTL_SECONDS * 1000;
    await redis.zremrangebyscore(CONTACT_LOG_KEY, 0, cutoff);
  } catch (err) {
    // Log but never throw — this is a backup, not critical path
    console.error("Failed to log contact submission to Redis:", err);
  }
}
