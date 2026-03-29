import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);

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

  // Send email notification
  const emailResult = await sendContactNotification(validation.data);
  if (!emailResult.success) {
    return NextResponse.json(
      { success: false, error: "Failed to process your request. Please try again." },
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
