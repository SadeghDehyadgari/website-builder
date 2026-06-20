// src/sections/Header/HeaderSection.jsx
// NEW: Header section component with logo and navigation links

import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

/**
 * HeaderSection - Renders a site header with logo and navigation links
 * Used as a section in PageRenderer, can be added/edited via Admin panel
 *
 * Props:
 *   logo (string) - path to logo image
 *   links (array) - [{ id, label, slug }]
 */
const HeaderSection = ({
  logo = "/logos/karyar-studio-logo.svg",
  links = [],
}) => {
  // Fallback links if none provided (for preview/default)
  const defaultLinks = [
    { id: "link-1", label: "صفحه اصلی", slug: "/" },
    { id: "link-2", label: "خدمات", slug: "/services" },
    { id: "link-3", label: "درباره ما", slug: "/about" },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <img src={logo} alt="لوگوی سایت" className={styles.logo} />
        </div>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="منوی اصلی">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.id} className={styles.navItem}>
                <NavLink
                  to={link.slug}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                  end={link.slug === "/"} // exact match for home
                >
                  {link.label}
                  {/* Orange dot indicator for active link */}
                  <span className={styles.activeDot} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSection;
