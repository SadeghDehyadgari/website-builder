// src/sections/Hero/HeroSection.jsx
// UPDATED: Removed subtitle prop, using shared Button component with secondary variant and arrow.

import styles from "./Hero.module.css";
import Button from "../../components/Button/Button"; /* NEW: Shared Button */

/**
 * HeroSection — pure presentational component.
 *
 * Receives all data via props; contains zero business logic.
 * Single Responsibility: render the Hero section UI only.
 *
 * @param {Object}  props
 * @param {string}  props.title
 * @param {string}  props.description
 * @param {string}  props.image        - URL for the hero image
 * @param {string}  props.ctaText
 * @param {string}  props.ctaLink
 */
function HeroSection({ title, description, image, ctaText, ctaLink }) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {ctaText && ctaLink && (
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

      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
