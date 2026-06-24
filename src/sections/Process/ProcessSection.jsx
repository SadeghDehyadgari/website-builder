// src/sections/Process/ProcessSection.jsx
// NEW: Process section component – renders title, description, CTA button and responsive image

import Button from "../../components/Button/Button";
import styles from "./Process.module.css";

const ProcessSection = ({
  title = "روند تبدیل ایده به محصول",
  description = "از ایده‌پردازی تا پیاده‌سازی نهایی، ما در هر قدم همراه شما هستیم.",
  ctaText = "شروع کنید",
  ctaLink = "#",
  desktopImage = "/images/process.svg",
  mobileImage = "/images/process-mobile.svg",
  alt = "روند تبدیل ایده به محصول",
}) => {
  return (
    <section className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}

      {ctaText && ctaLink && (
        <div className={styles.ctaWrapper}>
          <Button variant="primary" withArrow href={ctaLink}>
            {ctaText}
          </Button>
        </div>
      )}

      <div className={styles.imageWrapper}>
        <picture>
          {/* Mobile version – loaded first for small screens */}
          <source media="(max-width: 768px)" srcSet={mobileImage} />
          {/* Desktop version – fallback */}
          <source media="(min-width: 769px)" srcSet={desktopImage} />
          <img src={desktopImage} alt={alt} loading="lazy" />
        </picture>
      </div>
    </section>
  );
};

export default ProcessSection;
