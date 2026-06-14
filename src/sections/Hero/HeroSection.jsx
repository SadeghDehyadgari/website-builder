import styles from "./Hero.module.css";

/**
 * HeroSection — pure presentational component.
 *
 * Receives all data via props; contains zero business logic.
 * Single Responsibility: render the Hero section UI only.
 *
 * @param {Object}  props
 * @param {string}  props.title
 * @param {string}  props.subtitle
 * @param {string}  props.description
 * @param {string}  props.image        - URL for the hero image
 * @param {string}  props.ctaText
 * @param {string}  props.ctaLink
 */
function HeroSection({
  title,
  subtitle,
  description,
  image,
  ctaText,
  ctaLink,
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {ctaText && (
          <a href={ctaLink} className={styles.cta}>
            {ctaText}
          </a>
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
