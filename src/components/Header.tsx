"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      id="header"
    >
      <div className={styles.headerInner}>
        <a href="#" className={styles.logo} aria-label="Home">
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
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={styles.mobileCta}
            onClick={() => setMenuOpen(false)}
          >
            Start a Project
          </a>
        </nav>

        <a href="#contact" className={styles.cta} id="header-cta">
          Start a Project
        </a>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.menuLine} ${menuOpen ? styles.menuLineOpen : ""}`} />
          <span className={`${styles.menuLine} ${menuOpen ? styles.menuLineOpen : ""}`} />
        </button>
      </div>
    </header>
  );
}
