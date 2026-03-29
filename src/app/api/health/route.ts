import { NextResponse } from "next/server";
import { getRateLimitStoreSize } from "@/lib/rate-limit";

/**
 * Health check endpoint for monitoring and deployment readiness probes.
 * Returns system status and basic metrics.
 */
export async function GET() {
  const now = Date.now();

  const health = {
    status: "healthy",
    timestamp: new Date(now).toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "0.1.0",
    environment: process.env.NODE_ENV || "development",
    checks: {
      email: process.env.RESEND_API_KEY ? "configured" : "dev-mode",
      rateLimiter: {
        status: "active",
        trackedClients: getRateLimitStoreSize(),
      },
    },
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
