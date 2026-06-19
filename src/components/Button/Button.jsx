// src/components/Button/Button.jsx
// NEW: Reusable Button component with variant and optional arrow icon

import styles from "./Button.module.css";

/**
 * Reusable Button component with optional arrow icon.
 * Uses CSS modules and global CSS variables for theming.
 *
 * @param {string}        props.children  - button text
 * @param {string}        props.href      - URL for anchor tag (optional)
 * @param {string}        props.variant   - "primary" (green) or "secondary" (orange) — default "primary"
 * @param {boolean}       props.withArrow - if true, shows a left-pointing arrow (RTL-aware)
 * @param {string}        props.className - additional CSS classes
 * @param {Function}      props.onClick   - click handler (optional)
 * @param {object}        props.rest      - other props (e.g., target, rel)
 */
function Button({
  children,
  href,
  variant = "primary",
  withArrow = false,
  className = "",
  onClick,
  ...rest
}) {
  // Build class names
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  // Content: text + optional arrow icon
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <svg
          className={styles.arrowIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  // Render as <a> if href provided, otherwise as <button>
  if (href) {
    return (
      <a href={href} className={buttonClasses} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}

export default Button;
