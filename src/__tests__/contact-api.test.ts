import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateContactForm } from "@/lib/validation";

// ── Validation unit tests ───────────────────────────────────────────

describe("validateContactForm", () => {
  const validPayload = {
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    company: "ACME Corp",
    message: "I need a website for my business, can you help?",
    website: "", // honeypot — must be empty
  };

  it("accepts a valid submission", () => {
    const result = validateContactForm(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Juan Dela Cruz");
      expect(result.data.email).toBe("juan@example.com");
    }
  });

  it("lowercases the email", () => {
    const result = validateContactForm({
      ...validPayload,
      email: "JUAN@Example.COM",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("juan@example.com");
    }
  });

  it("rejects missing name", () => {
    const result = validateContactForm({ ...validPayload, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toHaveProperty("name");
    }
  });

  it("rejects name that is too short", () => {
    const result = validateContactForm({ ...validPayload, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = validateContactForm({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toHaveProperty("email");
    }
  });

  it("rejects message that is too short", () => {
    const result = validateContactForm({ ...validPayload, message: "Hi" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toHaveProperty("message");
    }
  });

  it("rejects message that is too long", () => {
    const result = validateContactForm({
      ...validPayload,
      message: "x".repeat(5001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects filled honeypot field", () => {
    const result = validateContactForm({
      ...validPayload,
      website: "http://spam.bot",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      // Should NOT reveal the honeypot field name
      expect(result.errors).not.toHaveProperty("website");
      expect(result.errors).toHaveProperty("_form");
    }
  });

  it("strips control characters from name", () => {
    const result = validateContactForm({
      ...validPayload,
      name: "Juan\x00\x01 Dela Cruz",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Juan Dela Cruz");
    }
  });

  it("allows newlines in message but strips other control chars", () => {
    const result = validateContactForm({
      ...validPayload,
      message: "Line one\nLine two\x00\x07end of message here",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toContain("\n");
      expect(result.data.message).not.toContain("\x00");
      expect(result.data.message).not.toContain("\x07");
    }
  });

  it("rejects non-object input", () => {
    expect(validateContactForm(null).success).toBe(false);
    expect(validateContactForm("string").success).toBe(false);
    expect(validateContactForm([]).success).toBe(false);
    expect(validateContactForm(42).success).toBe(false);
  });

  it("trims whitespace from name", () => {
    const result = validateContactForm({
      ...validPayload,
      name: "  Juan Dela Cruz  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Juan Dela Cruz");
    }
  });

  it("treats company as optional", () => {
    const { company: _, ...noCompany } = validPayload;
    const result = validateContactForm(noCompany);
    expect(result.success).toBe(true);
  });
});

// ── Rate limiter unit tests ─────────────────────────────────────────

describe("checkRateLimit (in-memory)", () => {
  // Dynamic import so we get a fresh module per test file
  let checkRateLimit: typeof import("@/lib/rate-limit").checkRateLimit;
  let getClientIdentifier: typeof import("@/lib/rate-limit").getClientIdentifier;

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import("@/lib/rate-limit");
    checkRateLimit = mod.checkRateLimit;
    getClientIdentifier = mod.getClientIdentifier;
  });

  it("allows requests within the limit", async () => {
    const result = await checkRateLimit("test-client", {
      maxRequests: 3,
      windowMs: 60_000,
    });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks after exceeding the limit", async () => {
    const config = { maxRequests: 2, windowMs: 60_000 };

    const r1 = await checkRateLimit("flood-client", config);
    expect(r1.allowed).toBe(true);

    const r2 = await checkRateLimit("flood-client", config);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(0);

    const r3 = await checkRateLimit("flood-client", config);
    expect(r3.allowed).toBe(false);
    expect(r3.remaining).toBe(0);
  });

  it("tracks different clients independently", async () => {
    const config = { maxRequests: 1, windowMs: 60_000 };

    const r1 = await checkRateLimit("client-a", config);
    expect(r1.allowed).toBe(true);

    const r2 = await checkRateLimit("client-b", config);
    expect(r2.allowed).toBe(true);
  });

  it("extracts IP from x-forwarded-for", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.50, 10.0.0.1" },
    });
    expect(getClientIdentifier(request)).toBe("ip:203.0.113.50");
  });

  it("falls back to x-real-ip", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: { "x-real-ip": "198.51.100.22" },
    });
    expect(getClientIdentifier(request)).toBe("ip:198.51.100.22");
  });

  it("falls back to user-agent hash when no IP", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: { "user-agent": "TestBot/1.0" },
    });
    const id = getClientIdentifier(request);
    expect(id).toMatch(/^ua:/);
  });
});
