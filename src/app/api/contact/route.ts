import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { validateContactForm } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier, getClientIp } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";
import { logContactSubmission } from "@/lib/contact-log";

export async function POST(request: Request) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = await checkRateLimit(clientId);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
          ),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetTime),
        },
      }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validate
  const validation = validateContactForm(body);
  if (!validation.success) {
    return NextResponse.json(
      { success: false, errors: validation.errors },
      { status: 400 }
    );
  }

  // Persist to database as backup (fire-and-forget, never blocks)
  const clientIp = getClientIp(request);
  logContactSubmission(validation.data, clientIp).catch((err) =>
    console.error("Contact log error:", err)
  );

  // Send email notification
  const emailResult = await sendContactNotification(validation.data);
  if (!emailResult.success) {
    Sentry.captureMessage("Contact form email failed", {
      level: "error",
      extra: { email: validation.data.email, error: emailResult.error },
    });
    console.error("Contact form email failed:", emailResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send your message. Please try again or reach out directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Thank you for reaching out. We'll get back to you shortly.",
    },
    {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": String(rateLimit.resetTime),
      },
    }
  );
}
