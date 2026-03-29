import { NextResponse } from "next/server";

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
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
