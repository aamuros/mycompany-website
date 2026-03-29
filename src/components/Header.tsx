"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
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
            <path d="M10 24L16 8L22 24" stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
            <path d="M13.5 19H18.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span>ADIstudio</span>
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
