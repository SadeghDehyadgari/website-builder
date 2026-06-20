// src/sections/Banner/BannerSection.jsx
// NEW: Banner section component

import Button from "../../components/Button/Button";
import styles from "./Banner.module.css";

/**
 * BannerSection - Renders a banner with title, CTA button and background image
 * Used in both Public View and Admin Builder (via PageRenderer)
 */
const BannerSection = ({ props }) => {
  const {
    title = "عنوان بنر",
    ctaText = "شروع کنید",
    ctaLink = "#",
    backgroundImage = "/images/banner.png",
  } = props || {};

  // Build inline style for background image with light transparent overlay
  // Overlay uses white with low opacity to make dark text readable
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "rgba(255, 255, 255, 0.65)", // Light overlay with low opacity
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "overlay", // Creates a transparent overlay effect
  };

  return (
    <section
      className={styles.banner}
      style={backgroundStyle}
      aria-label="بنر تبلیغاتی"
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.ctaWrapper}>
          <Button
            variant="secondary" // Orange button (--color-primary-orange)
            withArrow
            href={ctaLink}
            className={styles.ctaButton}
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
