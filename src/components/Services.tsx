import styles from "./Services.module.css";

const services = [
  {
    title: "Custom Software",
    description:
      "Purpose-built applications designed around your workflows — not the other way around. From internal tools to customer-facing platforms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "System Integration",
    description:
      "Connect your existing tools and platforms into one seamless workflow. APIs, data pipelines, and middleware that just work.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Process Automation",
    description:
      "Eliminate repetitive manual work with intelligent automation. We identify bottlenecks and build systems that handle them for you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Technical Consulting",
    description:
      "Strategic guidance on architecture, technology selection, and scaling. We help you make the right decisions before writing a single line of code.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4m0-4h.01" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <p className="section-label">What We Build</p>
        <h2 className="section-title">
          Solutions engineered for
          <br />
          how you actually work.
        </h2>
        <p className="section-subtitle">
          We don&apos;t sell off-the-shelf products. Every system we build starts
          with understanding your unique challenges.
        </p>
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.title} className={styles.card}>
              <div className={styles.cardIcon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
