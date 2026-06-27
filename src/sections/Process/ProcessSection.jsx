// src/sections/Process/ProcessSection.jsx
// [UPDATED] Added URL validation to prevent XSS via malicious URIs in links and images.
import Button from "../../components/Button/Button";
import styles from "./Process.module.css";
// [NEW] Import security utility for URL validation
import { isSafeUrl } from "../../utils/urlUtils";

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

      {/* [UPDATED] Validate ctaLink before rendering the button to prevent XSS */}
      {ctaText && ctaLink && isSafeUrl(ctaLink) && (
        <div className={styles.ctaWrapper}>
          <Button variant="primary" withArrow href={ctaLink}>
            {ctaText}
          </Button>
        </div>
      )}

      <div className={styles.imageWrapper}>
        <picture>
          {/* [UPDATED] Validate image URLs before rendering to prevent malicious data: URIs */}
          <source
            media="(max-width: 768px)"
            srcSet={isSafeUrl(mobileImage) ? mobileImage : ""}
          />
          <source
            media="(min-width: 769px)"
            srcSet={isSafeUrl(desktopImage) ? desktopImage : ""}
          />
          <img
            src={isSafeUrl(desktopImage) ? desktopImage : ""}
            alt={alt}
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
};

export default ProcessSection;
