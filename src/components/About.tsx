import styles from "./About.module.css";

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <p className="section-label">About Us</p>
        <h2 className="section-title">
          Small team.
          <br />
          Big impact.
        </h2>
        <div className={styles.content}>
          <p className={styles.text}>
            We&apos;re a focused team of engineers and architects who believe
            great systems should be <strong>invisible</strong> — they just work.
            No bloated teams, no unnecessary overhead. Just{" "}
            <strong>direct access to senior talent</strong> who care about
            getting it right.
            <br />
            <br />
            We partner with companies that have real operational challenges and
            deliver solutions that are built to last — not just to ship.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>50+</div>
              <div className={styles.statLabel}>Systems Delivered</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>99%</div>
              <div className={styles.statLabel}>Client Retention</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>8+</div>
              <div className={styles.statLabel}>Years in Business</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>24h</div>
              <div className={styles.statLabel}>Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
