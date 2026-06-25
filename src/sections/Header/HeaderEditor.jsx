// src/sections/Header/HeaderEditor.jsx
// NEW: Editor for Header section - manages logo and navigation links
// [FIXED] Removed useState - was causing infinite loop
// [FIXED] Removed useEffect - onChange in dependency caused infinite re-renders
// [FIXED] Now uses props directly (single source of truth)
// [FIXED] Matches HeroEditor/FeaturesEditor/FooterEditor pattern
import styles from "./Header.module.css";

/**
HeaderEditor - Form for editing header section properties
Allows adding/removing/editing navigation links and changing logo
Command pattern: onChange(updatedProps) — caller decides what to do.
@param {Object}   props.props   - current Header props
@param {Function} props.onChange - called with full updated props object
*/
const HeaderEditor = ({ props, onChange }) => {
  // [FIXED] No local state - using props directly
  // [FIXED] No useEffect - calling onChange immediately on input change
  
  const { logo = "/logos/karyar-studio-logo.svg", links = [] } = props || {};

  // [NEW] Helper function to handle top-level field changes
  function handleFieldChange(field, value) {
    onChange({ ...props, [field]: value });
  }

  // [NEW] Handlers for link management (array operations)
  function addLink() {
    const newId = `link-${Date.now()}`;
    onChange({ ...props, links: [...links, { id: newId, label: "", slug: "" }] });
  }

  function removeLink(id) {
    onChange({ ...props, links: links.filter((link) => link.id !== id) });
  }

  function updateLink(id, field, value) {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link,
    );
    onChange({ ...props, links: updatedLinks });
  }

  return (
    <div className={styles.editor}>
      <h3 className={styles.editorTitle}>تنظیمات هدر</h3>

      {/* Logo field */}
      <div className={styles.fieldGroup}>
        <label htmlFor="header-logo">آدرس لوگو</label>
        <input
          id="header-logo"
          type="text"
          value={logo}
          onChange={(e) => handleFieldChange("logo", e.target.value)}
          placeholder="/logos/karyar-studio-logo.svg"
        />
        <small className={styles.hint}>مسیر تصویر در پوشه public</small>
      </div>

      {/* Navigation links */}
      <div className={styles.fieldGroup}>
        <label>لینک‌های ناوبری</label>
        {links.map((link) => (
          <div key={link.id} className={styles.linkRow}>
            <input
              type="text"
              placeholder="عنوان (مثلاً: درباره ما)"
              value={link.label}
              onChange={(e) => updateLink(link.id, "label", e.target.value)}
              className={styles.linkLabelInput}
            />
            <input
              type="text"
              placeholder="slug (مثلاً: about)"
              value={link.slug}
              onChange={(e) => updateLink(link.id, "slug", e.target.value)}
              className={styles.linkSlugInput}
            />
            <button
              type="button"
              onClick={() => removeLink(link.id)}
              className={styles.removeLinkBtn}
              aria-label="حذف لینک"
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" onClick={addLink} className={styles.addLinkBtn}>
          + افزودن لینک جدید
        </button>
      </div>
    </div>
  );
};

export default HeaderEditor;