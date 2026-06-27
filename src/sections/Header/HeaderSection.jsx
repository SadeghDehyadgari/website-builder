// src/sections/Header/HeaderSection.jsx
// [UPDATED] Added URL validation for logo and fixed Open Redirect vulnerability in getLinkPath.
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { isSafeUrl } from "../../utils/urlUtils";

const HeaderSection = ({
  logo = "/logos/karyar-studio-logo.svg",
  links = [],
}) => {
  const defaultLinks = [
    { id: "link-1", label: "صفحه اصلی", slug: "home" },
    { id: "link-2", label: "خدمات", slug: "/services" },
    { id: "link-3", label: "درباره ما", slug: "/about" },
  ];
  const navLinks = links.length > 0 ? links : defaultLinks;

  // [UPDATED] Helper function to resolve the correct navigation path.
  // [SECURITY] Prevents protocol-relative URLs (e.g., //evil.com) which can lead to Open Redirect.
  const getLinkPath = (slug) => {
    if (!slug) return "/";
    if (slug === "home") return "/";
    if (slug.startsWith("//")) return "/"; // [SECURITY] Block protocol-relative URLs
    if (slug.startsWith("/")) return slug;
    return `/${slug}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          {/* [UPDATED] Validate logo URL to prevent XSS */}
          <img
            src={isSafeUrl(logo) ? logo : "/logos/karyar-studio-logo.svg"}
            alt="لوگوی سایت"
            className={styles.logo}
          />
        </div>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="منوی اصلی">
          <ul className={styles.navList}>
            {/* [UPDATED] Added fallback for key */}
            {navLinks.map((link, index) => (
              <li key={link.id || index} className={styles.navItem}>
                <NavLink
                  to={getLinkPath(link.slug)}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
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
