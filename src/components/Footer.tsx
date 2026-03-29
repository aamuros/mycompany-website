import styles from "./Footer.module.css";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <svg
              className={styles.logoIcon}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path
                d="M10 22V10h4.5c1.4 0 2.5.4 3.2 1.1.7.7 1.1 1.6 1.1 2.7 0 1.1-.4 2-1.1 2.7-.7.7-1.8 1.1-3.2 1.1H13v4.4h-3z"
                fill="white"
              />
            </svg>
            <span>Construct</span>
          </div>
          <p className={styles.tagline}>
            We build digital products that work.
          </p>
          <a href="mailto:hello@construct.dev" className={styles.email}>
            hello@construct.dev
          </a>
          <p className={styles.copyright}>
            © {year} Construct. All rights reserved.
          </p>
        </div>
        <nav className={styles.links}>
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
