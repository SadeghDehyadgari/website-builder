// src/components/AddSectionMenu/AddSectionMenu.jsx
// [NEW] Dropdown menu with 2-column grid for adding sections
// [UPDATED] Converted from always-visible list to dropdown for space efficiency
import { useState, useRef, useEffect } from "react";
import { getAllSectionTypes, getSection } from "../../sections/registry";
import styles from "./AddSectionMenu.module.css";

/**
 * AddSectionMenu - dropdown menu for adding new sections to the page
 * Command pattern: onAdd(newSection) - caller decides what to do with the new section
 * @param {Object} props
 * @param {Function} props.onAdd - callback when a section is added
 */
function AddSectionMenu({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sectionTypes = getAllSectionTypes();

  // [NEW] Close dropdown when clicking outside (Tell, Don't Ask - component manages its own state)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // [NEW] Close dropdown on Escape key (Accessibility best practice)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // [EXISTING] Command: Create and add a new section (no return value - CQS)
  const handleAddSection = (type) => {
    const entry = getSection(type);
    if (entry) {
      onAdd({
        id: `section-${crypto.randomUUID()}`,
        type,
        props: { ...entry.defaultProps },
      });
      setIsOpen(false); // Close dropdown after selection
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>+ افزودن سکشن</span>
        <span className={`${styles.chevron} ${isOpen ? styles.open : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          <div className={styles.grid}>
            {sectionTypes.map(({ type, label }) => (
              <button
                key={type}
                className={styles.option}
                onClick={() => handleAddSection(type)}
                role="option"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSectionMenu;
