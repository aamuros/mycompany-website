import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={`container ${styles.footerInner}`}>
        <p className={styles.copyright}>
          © {year} Construct. All rights reserved.
        </p>
        <div className={styles.links}>
          <a href="#services" className={styles.link}>
            Services
          </a>
          <a href="#process" className={styles.link}>
            Process
          </a>
          <a href="#contact" className={styles.link}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
