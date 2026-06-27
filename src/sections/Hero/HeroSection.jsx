// src/sections/Hero/HeroSection.jsx
// [UPDATED] Added URL validation to prevent XSS via javascript: or data: URIs.
import styles from "./Hero.module.css";
import Button from "../../components/Button/Button";
// [NEW] Import security utility for URL validation
import { isSafeUrl } from "../../utils/urlUtils";

/**
HeroSection — pure presentational component.
Receives all data via props; contains zero business logic.
Single Responsibility: render the Hero section UI only.
@param {Object}  props
@param {string}  props.title
@param {string}  props.description
@param {string}  props.image        - URL for the hero image
@param {string}  props.ctaText
@param {string}  props.ctaLink
*/
function HeroSection({ title, description, image, ctaText, ctaLink }) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}

        {/* [UPDATED] Validate ctaLink before rendering the button to prevent XSS */}
        {ctaText && ctaLink && isSafeUrl(ctaLink) && (
          <div className={styles.ctaWrapper}>
            <Button
              variant="secondary" /* orange from variables */
              withArrow
              href={ctaLink}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>

      {/* [UPDATED] Validate image URL before rendering to prevent malicious data: URIs */}
      {image && isSafeUrl(image) && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
