import styles from "./Work.module.css";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Website",
    description:
      "A high-performance online store with real-time inventory, seamless checkout, and a custom CMS for product management.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Field Operations App",
    category: "Application",
    description:
      "A mobile-first app for field teams to log inspections, capture photos, sync offline data, and generate instant reports.",
    tags: ["React Native", "Node.js", "AWS"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Logistics Automation",
    category: "System",
    description:
      "An end-to-end system connecting warehouse, dispatch, and delivery — automating routing, tracking, and real-time notifications.",
    tags: ["Python", "Redis", "API Integration"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

export default function Work() {
  return (
    <section className={`section ${styles.work}`} id="work">
      <div className="container">
        <p className="section-label">Our Work</p>
        <h2 className="section-title">
          Projects we&apos;re
          <br />
          proud of.
        </h2>
        <p className="section-subtitle">
          A selection of recent builds across different industries and
          challenges.
        </p>
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.title} className={styles.card}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
