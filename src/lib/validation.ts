import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters")
    .trim()
    .toLowerCase(),
  company: z
    .string()
    .max(200, "Company name must be under 200 characters")
    .trim()
    .optional()
    .default(""),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be under 5000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field && typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false as const, errors: fieldErrors };
  }

  return { success: true as const, data: result.data };
}
