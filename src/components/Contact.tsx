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
              Have a project in mind? Drop me a message or reach out directly —
              no commitment, just a conversation about what&apos;s possible.
            </p>

            <div className={styles.details}>
              <div className={styles.detail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:mros.adrian.adi@gmail.com">mros.adrian.adi@gmail.com</a>
              </div>
              <div className={styles.detail}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-5.93-5.93 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+639660020335">+639 660 020 335</a>
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
                <span>Usually responds within 24 hours</span>
              </div>
            </div>

            <div className={styles.directContact}>
              <p className={styles.directLabel}>Prefer to chat directly?</p>
              <div className={styles.directLinks}>
                <a
                  href="https://m.me/mros.adii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directLink}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464C18.627 22.222 24 17.248 24 11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                  </svg>
                  Messenger
                </a>
                <a
                  href="https://www.facebook.com/mros.adii/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directLink}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {status === "success" ? (
            <div className={styles.successPanel}>
              <div className={styles.successIcon} aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.5 14.5L12 18L19.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={styles.successTitle}>Message sent</h3>
              <p className={styles.successText}>{serverMessage}</p>
              <button
                className={styles.successReset}
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
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
                    placeholder="you@example.com"
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
                  placeholder="Tell me about your project — what do you need built?"
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

              {status === "error" && (
                <div className={`${styles.statusMessage} ${styles.error}`}>
                  {serverMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
