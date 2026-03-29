import { Resend } from "resend";
import type { ContactFormData } from "./validation";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "hello@example.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "contact@example.com";

/** Timeout for email sending operations (10 seconds) */
const EMAIL_TIMEOUT_MS = 10_000;

export async function sendContactNotification(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const { name, email, company, message } = data;

  const subject = `New Contact: ${name}${company ? ` (${company})` : ""}`;

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    ``,
    `Message:`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
        New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 100px; vertical-align: top;">Name</td>
          <td style="padding: 8px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a>
          </td>
        </tr>
        ${
          company
            ? `<tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;">Company</td>
          <td style="padding: 8px 0; color: #1a1a1a;">${escapeHtml(company)}</td>
        </tr>`
            : ""
        }
      </table>
      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="color: #666; margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
        <p style="color: #1a1a1a; margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  // Dev mode: log to console if no API key configured
  if (!resend) {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 CONTACT FORM SUBMISSION (Dev Mode)");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(textBody);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    return { success: true };
  }

  try {
    const { error } = await withTimeout(
      resend.emails.send({
        from: `Contact Form <${FROM_EMAIL}>`,
        to: [NOTIFICATION_EMAIL],
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
      EMAIL_TIMEOUT_MS
    );

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (err) {
    if (err instanceof TimeoutError) {
      console.error("Email send timeout after", EMAIL_TIMEOUT_MS, "ms");
      return { success: false, error: "Email service timeout" };
    }
    console.error("Email send error:", err);
    return { success: false, error: "Failed to send email" };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

class TimeoutError extends Error {
  constructor(ms: number) {
    super(`Operation timed out after ${ms}ms`);
    this.name = "TimeoutError";
  }
}

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new TimeoutError(ms)), ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
}
