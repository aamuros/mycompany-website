import styles from "./Work.module.css";

const projects = [
  {
    title: "Hardware Store — Online Ordering",
    category: "Website",
    description:
      "Full-stack e-commerce platform for a Philippine hardware retailer. Product browsing with variants, shopping cart, order tracking, and an admin dashboard with sales analytics, inventory control, and SMS notifications.",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    href: "https://github.com/aamuros/hardware-store",
  },
  {
    title: "Hardware Store — Point of Sale",
    category: "Application",
    description:
      "Offline-first mobile POS system built for hardware stores with unreliable internet. Supports barcode lookup, multiple payment methods (cash, GCash, card), cash session management, inventory tracking, and sales reporting — all stored locally on-device.",
    tags: ["React Native", "Expo", "SQLite", "TypeScript"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    href: "https://github.com/aamuros/hardware-store-POS",
  },
  {
    title: "ADIstudio — This Website",
    category: "Website",
    description:
      "The site you\u2019re looking at right now. A fast, server-rendered marketing site with a secured contact form, rate limiting, email delivery via Resend, Redis-backed submission logs, and Sentry error monitoring.",
    tags: ["Next.js", "TypeScript", "Redis", "Sentry"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    href: "https://github.com/aamuros/mycompany-website",
  },
];

export default function Work() {
  return (
    <section className={`section ${styles.work}`} id="work">
      <div className="container">
        <p className="section-label">My Work</p>
        <h2 className="section-title">
          Real projects,
          <br />
          real code.
        </h2>
        <p className="section-subtitle">
          Every project here is live, open-source, and built by me.
          Click through to see the code.
        </p>
        <div className={styles.grid}>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className={styles.cardPreview}
                style={{ background: project.gradient }}
              >
                <div className={styles.mockWindow}>
                  <div className={styles.mockDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.mockContent}>
                    <div className={styles.mockLine} style={{ width: "60%" }} />
                    <div className={styles.mockLine} style={{ width: "80%" }} />
                    <div className={styles.mockLine} style={{ width: "45%" }} />
                  </div>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardCategory}>{project.category}</div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.cardLink}>
                  View on GitHub →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
