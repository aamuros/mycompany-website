"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      id="header"
    >
      <div className={styles.headerInner}>
        <a href="#" className={styles.logo} aria-label="Home">
          <span className={styles.logoMark}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 19h20L12 2z" />
            </svg>
          </span>
          <span>Construct</span>
        </a>
        <a
          href="#contact"
          className={styles.cta}
          id="header-cta"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
