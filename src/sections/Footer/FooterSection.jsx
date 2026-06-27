// src/sections/Footer/FooterSection.jsx
import styles from "./Footer.module.css";
import { isSafeUrl } from "../../utils/urlUtils";

/**
FooterSection - renders footer with logo, social links, copyright
@param {Object} props
@param {string} props.logo - URL of logo image
@param {Array} props.socialLinks - Array of { icon: string, url: string }
@param {string} props.copyrightText - Copyright text
*/
function FooterSection({
  logo = "/logos/karyar-studio-logo.svg",
  socialLinks = [],
  copyrightText = "تمام حقوق محتوای این سایت متعلق به شرکت کاریار استودیو است.",
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          {/* Right side: Logo */}
          <div className={styles.logoArea}>
            {/* [UPDATED] Validate logo URL and add fallback for alt */}
            {logo && isSafeUrl(logo) && (
              <img
                src={logo}
                alt="لوگوی کاریار استودیو"
                className={styles.logoImage}
              />
            )}
          </div>

          {/* Left side: Social media icons */}
          <div className={styles.socialLinks}>
            {socialLinks.map((item, index) => {
              // [UPDATED] Validate URLs to prevent XSS
              const safeUrl = isSafeUrl(item.url) ? item.url : "#";
              const safeIcon = isSafeUrl(item.icon) ? item.icon : "";

              return (
                <a
                  key={item.id || index}
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="شبکه اجتماعی"
                >
                  {safeIcon && (
                    <img
                      src={safeIcon}
                      alt="آیکون شبکه اجتماعی"
                      className={styles.socialIcon}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider line */}
        <hr className={styles.divider} />

        {/* Copyright */}
        <div className={styles.copyright}>{copyrightText}</div>
      </div>
    </footer>
  );
}

export default FooterSection;
