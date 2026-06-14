import styles from "./Features.module.css";

/**
 * FeaturesSection — pure presentational component.
 *
 * @param {string} props.title
 * @param {Array}  props.items  - [{ id, icon, title, description }]
 * @param {string} props.ctaText
 * @param {string} props.ctaLink
 */
function FeaturesSection({ title, items = [], ctaText, ctaLink }) {
  return (
    <section className={styles.features}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <ul className={styles.grid}>
        {items.map((item) => (
          <FeatureCard key={item.id} {...item} />
        ))}
      </ul>

      {ctaText && (
        <a href={ctaLink} className={styles.cta}>
          {ctaText}
        </a>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Private sub-component — single card, not exported
// ---------------------------------------------------------------------------

/**
 * @param {string} props.icon
 * @param {string} props.title
 * @param {string} props.description
 */
function FeatureCard({ icon, title, description }) {
  return (
    <li className={styles.card}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </li>
  );
}

export default FeaturesSection;
