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
              <path d="M10 24L16 8L22 24" stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
              <path d="M13.5 19H18.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span>ADIstudio</span>
          </div>
          <p className={styles.tagline}>
            We build digital products that work.
          </p>
          <a href="mailto:mros.adrian.adi@gmail.com" className={styles.email}>
            mros.adrian.adi@gmail.com
          </a>
          <p className={styles.location}>Philippines</p>
          <p className={styles.copyright}>
            © {year} ADIstudio. All rights reserved.
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
