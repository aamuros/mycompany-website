import styles from "./Testimonials.module.css";

const testimonials = [
  {
    quote:
      "They took a vague idea and turned it into a system that now runs half our operations. No hand-holding needed — they just got it done.",
    name: "Sarah Chen",
    role: "COO",
    company: "Meridian Logistics",
  },
  {
    quote:
      "Our old site was embarrassing. The new one loads fast, ranks well, and actually brings in leads. Best money we've spent this year.",
    name: "James Okafor",
    role: "Founder",
    company: "Greenline Supply",
  },
  {
    quote:
      "What impressed me most was the communication. Weekly updates, honest timelines, and zero surprises on the invoice.",
    name: "Maria Torres",
    role: "Head of Product",
    company: "Kova Health",
  },
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonials}`} id="testimonials">
      <div className="container">
        <p className="section-label">What Clients Say</p>
        <h2 className="section-title">
          Trusted by teams
          <br />
          that ship.
        </h2>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <blockquote key={t.name} className={styles.card}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <footer className={styles.author}>
                <div className={styles.avatar}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <cite className={styles.name}>{t.name}</cite>
                  <span className={styles.role}>
                    {t.role}, {t.company}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
