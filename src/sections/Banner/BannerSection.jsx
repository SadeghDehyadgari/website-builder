// src/sections/Banner/BannerSection.jsx
// [UPDATED] Added URL validation for background image and CTA link.
// [UPDATED] Removed duplicated background properties from inline style (they exist in CSS).
import Button from "../../components/Button/Button";
import styles from "./Banner.module.css";
// [NEW] Import security utility for URL validation
import { isSafeUrl } from "../../utils/urlUtils";

/**
BannerSection - Renders a banner with title, CTA button and background image
Used in both Public View and Admin Builder (via PageRenderer)
*/
const BannerSection = ({
  title = "عنوان بنر",
  ctaText = "شروع کنید",
  ctaLink = "#",
  backgroundImage = "/images/banner.png",
}) => {
  // [UPDATED] Only include dynamic properties in inline style.
  // Static properties (size, position, blend-mode) are handled by Banner.module.css.
  // [UPDATED] Validate backgroundImage to prevent CSS injection / XSS.
  const backgroundStyle = {
    backgroundImage: isSafeUrl(backgroundImage)
      ? `url(${backgroundImage})`
      : "none",
    backgroundColor: "rgba(255, 255, 255, 0.65)", // Light overlay with low opacity
  };

  return (
    <section
      className={styles.banner}
      style={backgroundStyle}
      aria-label="بنر تبلیغاتی"
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        {/* [UPDATED] Validate ctaLink before rendering the button to prevent XSS */}
        {ctaText && isSafeUrl(ctaLink) && (
          <div className={styles.ctaWrapper}>
            <Button
              variant="secondary"
              withArrow
              href={ctaLink}
              className={styles.ctaButton}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerSection;
