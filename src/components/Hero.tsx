import styles from "./Hero.module.css";

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.headline}>
          We build digital
          <br />
          products that work.
        </h1>
        <p className={styles.subline}>
          Websites, applications, and systems — designed and engineered
          for businesses that need reliable, high-quality solutions.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className="btn btn-primary" id="hero-cta">
            Start a Project
          </a>
          <a href="#work" className="btn btn-outline" id="hero-learn-more">
            See Our Work →
          </a>
        </div>
        <div className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
