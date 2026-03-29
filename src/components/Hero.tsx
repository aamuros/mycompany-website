import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.headline}>
          We build systems
          <br />
          <span className={styles.headlineAccent}>that simplify complexity.</span>
        </h1>
        <p className={styles.subline}>
          Custom software, integrations, and automation — engineered to
          streamline your operations and scale with your business.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className="btn btn-primary" id="hero-cta">
            Start a Conversation
          </a>
          <a href="#services" className="btn btn-outline" id="hero-learn-more">
            What We Build →
          </a>
        </div>
      </div>
    </section>
  );
}
