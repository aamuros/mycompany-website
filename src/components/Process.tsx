import styles from "./Process.module.css";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We listen first. Understanding your business, pain points, and goals before proposing any solution.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Architecture and planning with your team. Clear specs, realistic timelines, and no surprises.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Iterative development with regular check-ins. You see progress every week, not just at the end.",
  },
  {
    number: "04",
    title: "Support",
    description:
      "Launch is the beginning, not the end. Monitoring, maintenance, and evolution as your needs grow.",
  },
];

export default function Process() {
  return (
    <section className={`section ${styles.process}`} id="process">
      <div className="container">
        <p className="section-label">Our Approach</p>
        <h2 className="section-title">
          Simple process.
          <br />
          Reliable outcomes.
        </h2>
        <p className="section-subtitle">
          No black-box development. We work transparently from start to finish.
        </p>
        <div className={styles.timeline}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
