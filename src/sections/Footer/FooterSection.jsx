// FooterSection - renders footer with logo, social links, copyright
import styles from "./Footer.module.css";

/**
 * FooterSection Component
 * @param {string} props.logo - URL of logo image
 * @param {Array} props.socialLinks - Array of { icon: string, url: string }
 * @param {string} props.copyrightText - Copyright text
 */
function FooterSection({ logo, socialLinks = [], copyrightText }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          {/* Right side: Logo */}
          <div className={styles.logoArea}>
            {logo && <img src={logo} alt="Logo" className={styles.logoImage} />}
          </div>

          {/* Left side: Social media icons */}
          <div className={styles.socialLinks}>
            {socialLinks.map((item, index) => (
              <a
                key={item.icon || index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img
                  src={item.icon}
                  alt="social icon"
                  className={styles.socialIcon}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <hr className={styles.divider} />

        {/* Copyright */}
        <div className={styles.copyright}>
          {copyrightText || "تمام حقوق محفوظ است."}
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
