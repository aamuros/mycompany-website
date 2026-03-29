import { z } from "zod";

/**
 * Strip control characters (except newlines/tabs in message) that could be
 * used for log injection or display corruption.
 */
function stripControlChars(str: string, allowNewlines = false): string {
  if (allowNewlines) {
    // Keep \n and \t but remove other control chars
    return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }
  return str.replace(/[\x00-\x1F\x7F]/g, "");
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim()
    .transform((v) => stripControlChars(v)),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters")
    .trim()
    .toLowerCase()
    .transform((v) => stripControlChars(v)),
  company: z
    .string()
    .max(200, "Company name must be under 200 characters")
    .trim()
    .transform((v) => stripControlChars(v))
    .optional()
    .default(""),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters")
    .trim()
    .transform((v) => stripControlChars(v, true)),

  // Honeypot field — must be empty. Bots often fill all fields.
  website: z
    .string()
    .max(0, "This field must be empty")
    .optional()
    .default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown) {
  // Reject non-object input early
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return {
      success: false as const,
      errors: { _form: "Invalid request format" },
    };
  }

  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field && typeof field === "string" && !fieldErrors[field]) {
        // Don't reveal honeypot field name in errors
        if (field === "website") {
          fieldErrors["_form"] = "Submission rejected";
        } else {
          fieldErrors[field] = issue.message;
        }
      }
    }
    return { success: false as const, errors: fieldErrors };
  }

  return { success: true as const, data: result.data };
}
