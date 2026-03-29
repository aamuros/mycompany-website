import styles from "./Pricing.module.css";

const tiers = [
  {
    label: "Starter",
    price: "Free",
    note: "Portfolio projects",
    description:
      "I'm currently building my portfolio and taking on selected projects for free. You get a production-ready product; I get experience and a testimonial.",
    features: [
      "Landing page or portfolio site",
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
      "Source code ownership",
    ],
    cta: "Get started",
    href: "#contact",
    highlight: true,
  },
  {
    label: "Project",
    price: "Custom",
    note: "Larger builds",
    description:
      "For more complex work — web apps, dashboards, or multi-page systems. Scope and timeline agreed upfront, no surprises.",
    features: [
      "Web app or internal tool",
      "Database & backend API",
      "Authentication & user management",
      "Third-party integrations",
      "Deployment & hosting setup",
      "2 weeks post-launch support",
    ],
    cta: "Let's talk scope",
    href: "#contact",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className={`section ${styles.pricing}`} id="pricing">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Pricing</p>
          <h2 className="section-title">
            Transparent,
            <br />
            no surprises.
          </h2>
          <p className="section-subtitle">
            I&apos;m a solo developer actively growing my portfolio. Right now I
            take on free projects in exchange for real-world experience and
            honest feedback.
          </p>
        </div>
        <div className={styles.grid}>
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`${styles.card} ${tier.highlight ? styles.cardHighlight : ""}`}
            >
              {tier.highlight && (
                <div className={styles.badge}>Available now</div>
              )}
              <div className={styles.tierLabel}>{tier.label}</div>
              <div className={styles.priceRow}>
                <span className={styles.price}>{tier.price}</span>
                <span className={styles.priceNote}>{tier.note}</span>
              </div>
              <p className={styles.desc}>{tier.description}</p>
              <ul className={styles.features}>
                {tier.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={tier.href} className={`${styles.cta} ${tier.highlight ? styles.ctaPrimary : styles.ctaSecondary}`}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>
          All projects include full source code ownership. No lock-in, no
          recurring fees unless you choose hosting that has them.
        </p>
      </div>
    </section>
  );
}
