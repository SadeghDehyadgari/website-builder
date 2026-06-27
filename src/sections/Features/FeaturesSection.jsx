// src/sections/Features/FeaturesSection.jsx
// [UPDATED] Added URL validation for CTA link and image icons to prevent XSS.
import styles from "./Features.module.css";
import Button from "../../components/Button/Button";
// [NEW] Import security utility for URL validation
import { isSafeUrl } from "../../utils/urlUtils";

/**
FeaturesSection — pure presentational component.
Renders a title, a grid of feature cards (horizontal: icon left, text right),
and a CTA button with an arrow using the shared Button component.
@param {string} props.title
@param {Array}  props.items  - [{ id, icon, title, description }]
@param {string} props.ctaText
@param {string} props.ctaLink
*/
function FeaturesSection({ title, items = [], ctaText, ctaLink }) {
  return (
    <section className={styles.features}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <ul className={styles.grid}>
        {items.map((item, index) => (
          <FeatureCard key={item.id} item={item} index={index} />
        ))}
      </ul>

      {/* [UPDATED] Validate ctaLink before rendering the button to prevent XSS */}
      {ctaText && isSafeUrl(ctaLink) && (
        <Button
          href={ctaLink}
          variant="primary"
          withArrow
          className={styles.ctaButton}
        >
          {ctaText}
        </Button>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Private sub-component — single card
// ---------------------------------------------------------------------------
/**
Renders a single feature card with horizontal layout:
Icon (image or emoji) on the left (right in RTL)
Title + description on the right (left in RTL)
Card shadow color is based on index: 0 -> green, 1 -> orange.
@param {Object} props.item   - { icon, title, description }
@param {number} props.index  - position in the list
*/
function FeatureCard({ item, index }) {
  const { icon, title, description } = item;

  // Determine card style class based on index
  let cardStyleClass = styles.cardNeutral;
  if (index === 0) cardStyleClass = styles.cardGreen;
  else if (index === 1) cardStyleClass = styles.cardOrange;

  // Render icon as image if it's a path (starts with "/" or contains ".svg")
  const isImageIcon = icon && (icon.startsWith("/") || icon.includes(".svg"));

  return (
    <li className={`${styles.card} ${cardStyleClass}`}>
      {/* UPDATED: Icon first, then text — keeps icon on left (right in RTL) */}
      <div className={styles.cardContent}>
        {/* Icon section (left) */}
        <div className={styles.iconWrapper}>
          {isImageIcon ? (
            // [UPDATED] Validate icon URL before rendering to prevent malicious data: URIs
            <img
              src={isSafeUrl(icon) ? icon : ""}
              alt=""
              className={styles.iconImage}
            />
          ) : (
            <span className={styles.iconEmoji}>{icon}</span>
          )}
        </div>

        {/* Text section (right) */}
        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
    </li>
  );
}

export default FeaturesSection;
