import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Maximum allowed request body size in bytes (100KB) */
const MAX_BODY_SIZE = 100 * 1024;

export function proxy(request: NextRequest) {
  // --- Body size limit for API routes ---
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { success: false, error: "Request body too large" },
        { status: 413 }
      );
    }

    // Block non-JSON content types on POST/PUT/PATCH
    const method = request.method.toUpperCase();
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const contentType = request.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        return NextResponse.json(
          { success: false, error: "Content-Type must be application/json" },
          { status: 415 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
