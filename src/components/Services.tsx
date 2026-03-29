import styles from "./Services.module.css";

const services = [
  {
    tag: "Websites",
    title: "Beautiful, fast websites",
    description:
      "From landing pages to full e-commerce platforms — built for performance, SEO, and conversions. Every pixel intentional.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    tag: "Applications",
    title: "Powerful applications",
    description:
      "Web apps, mobile apps, and internal tools tailored to your workflows. Designed for real users, built to scale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    tag: "Systems",
    title: "Reliable systems",
    description:
      "APIs, integrations, automations, and backend infrastructure. The invisible architecture that keeps your business running.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">What We Do</p>
          <h2 className="section-title">
            Everything you need
            <br />
            to go digital.
          </h2>
          <p className="section-subtitle">
            We handle the entire spectrum — from a single landing page to
            complex enterprise systems.
          </p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.tag} className={styles.card}>
              <div className={styles.cardTag}>{service.tag}</div>
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
