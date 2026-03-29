"use client";

import { useState, type FormEvent } from "react";
import styles from "./Contact.module.css";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  [key: string]: string | undefined;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
    };

    // Client-side validation
    const clientErrors: FormErrors = {};
    if (!data.name || data.name.trim().length < 2)
      clientErrors.name = "Name must be at least 2 characters";
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      clientErrors.email = "Please enter a valid email address";
    if (!data.message || data.message.trim().length < 10)
      clientErrors.message = "Message must be at least 10 characters";

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          setErrors(result.errors);
          setStatus("idle");
        } else {
          setServerMessage(result.error || "Something went wrong.");
          setStatus("error");
        }
        return;
      }

      setServerMessage(result.message);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setServerMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">
              Let&apos;s build something
              <br />
              together.
            </h2>
            <p className={styles.desc}>
              Tell us about your project. No commitment, no sales pitch — just a
              conversation about what&apos;s possible.
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:hello@construct.dev">hello@construct.dev</a>
              </div>
              <div className={styles.detail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Philippines</span>
              </div>
              <div className={styles.detail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Usually respond within 24 hours</span>
              </div>
            </div>

            <div className={styles.directContact}>
              <p className={styles.directLabel}>Prefer to reach out directly?</p>
              <div className={styles.directLinks}>
                <a
                  href="mailto:hello@construct.dev"
                  className={styles.directLink}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} id="contact-form" noValidate>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  required
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  required
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="company" className={styles.label}>
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your company (optional)"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project — what do you need built?"
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                required
              />
              {errors.message && (
                <span className={styles.errorText}>{errors.message}</span>
              )}
            </div>

            {/* Honeypot — hidden from real users, bots fill it and get rejected */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={status === "submitting"}
              id="contact-submit"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                {serverMessage}
              </div>
            )}
            {status === "error" && (
              <div className={`${styles.statusMessage} ${styles.error}`}>
                {serverMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
