import styles from "./Process.module.css";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We listen. You tell us what you need, what's not working, and where you want to go. No jargon, no upsells.",
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "We map out the solution — scope, timeline, and cost — so you know exactly what you're getting before we write a line of code.",
  },
  {
    number: "03",
    title: "Build & Iterate",
    description:
      "We build in short cycles and show you progress every week. You stay in the loop and can steer the ship at any point.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We deploy, monitor, and stick around. If something breaks at 2 AM, that's our problem — not yours.",
  },
];

export default function Process() {
  return (
    <section className={`section ${styles.process}`} id="process">
      <div className="container">
        <p className="section-label">How We Work</p>
        <h2 className="section-title">
          Simple, transparent
          <br />
          process.
        </h2>
        <p className="section-subtitle">
          No surprises, no disappearing acts. Here&apos;s how every project
          goes from idea to launch.
        </p>
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
