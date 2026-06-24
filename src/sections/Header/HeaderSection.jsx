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
  // CHANGED: Updated default links to use "home" slug instead of "/" for root page.
  // This aligns with the database schema where the home page slug is "home".
  const defaultLinks = [
    { id: "link-1", label: "صفحه اصلی", slug: "home" },
    { id: "link-2", label: "خدمات", slug: "/services" },
    { id: "link-3", label: "درباره ما", slug: "/about" },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  // CHANGED (FIX): Helper function to resolve the correct navigation path.
  // - If slug is "home" → "/" (root)
  // - If slug already starts with "/" → return as-is (e.g., "/about", "/services")
  // - Otherwise → prefix with "/" (e.g., "contact" → "/contact")
  // This handles both database formats safely and prevents double-slash issues.
  const getLinkPath = (slug) => {
    if (slug === "home") return "/";
    if (slug.startsWith("/")) return slug;
    return `/${slug}`;
  };

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
                  to={getLinkPath(link.slug)}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                  // CHANGED (FIX): Only set end={true} for home link to ensure
                  // exact matching on root path. For other links, leave undefined.
                  end={link.slug === "home"}
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
