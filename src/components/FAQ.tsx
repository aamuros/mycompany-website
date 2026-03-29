"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    q: "How long does a project take?",
    a: "A simple landing page typically takes 3–5 days. A multi-page site takes 1–2 weeks. More complex apps — dashboards, booking systems, custom tools — depend on scope. I'll give you a clear timeline before we start, and I'll keep you updated throughout.",
  },
  {
    q: "How many revisions do I get?",
    a: "As many as it takes to get it right. I don't count revisions — if something isn't what you envisioned, we fix it. I'd rather spend an extra day getting it perfect than ship something you're not proud of.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. I stay available after launch to handle any bugs or issues that come up. For ongoing updates or new features, we can arrange that separately — just reach out and we'll figure out what works.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Just a clear idea of what you need. We'll get on a quick call, you'll walk me through your goals, and I'll handle the rest. If you have brand assets (logo, colors) or content (text, images), great — if not, I can work with placeholder content to start.",
  },
  {
    q: "Will I own the code and design?",
    a: "100%. When the project is done, everything is yours — source code, design files, and all assets. No licensing fees, no lock-in. You can hand it off to any developer in the future.",
  },
  {
    q: "Do you work with clients outside the Philippines?",
    a: "Yes, I work with clients remotely regardless of location. Communication happens over chat, email, or video call — wherever you're most comfortable. Payments can be arranged via bank transfer, GCash, or international options.",
  },
  {
    q: "Why is it free right now?",
    a: "I'm a solo developer building real-world experience and a strong portfolio. Taking on free projects lets me work on diverse problems and collect genuine testimonials. In return, you get a production-quality product built with care — not a template thrown together.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={`section ${styles.faq}`} id="faq">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <p className="section-label">FAQ</p>
            <h2 className="section-title">
              Frequently
              <br />
              asked.
            </h2>
            <p className={styles.headerNote}>
              Still have questions?{" "}
              <a href="#contact">Send me a message.</a>
            </p>
          </div>
          <div className={styles.list}>
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <svg
                    className={styles.chevron}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {open === i && (
                  <div className={styles.answer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
