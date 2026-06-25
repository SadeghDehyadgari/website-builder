// src/sections/Banner/BannerEditor.jsx
// [FIXED] Removed useState - was causing infinite loop
// [FIXED] Removed useEffect - onChange in dependency caused infinite re-renders
// [FIXED] Now uses props directly (single source of truth)
// [FIXED] Matches HeroEditor/FeaturesEditor/FooterEditor pattern
import styles from "./Banner.module.css";

/**
BannerEditor - Form for editing banner section properties
Command pattern: onChange(updatedProps) — caller decides what to do.
@param {Object}   props.props   - current Banner props
@param {Function} props.onChange - called with full updated props object
*/
const BannerEditor = ({ props, onChange }) => {
  // [FIXED] No local state - using props directly
  // [FIXED] No useEffect - calling onChange immediately on input change

  function handleFieldChange(field, value) {
    onChange({ ...props, [field]: value });
  }

  return (
    <div className={styles.editor}>
      <h3 className={styles.editorTitle}>تنظیمات بنر</h3>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-title">عنوان</label>
        <input
          id="banner-title"
          type="text"
          value={props.title || ""}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          placeholder="عنوان بنر"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-ctaText">متن دکمه</label>
        <input
          id="banner-ctaText"
          type="text"
          value={props.ctaText || ""}
          onChange={(e) => handleFieldChange("ctaText", e.target.value)}
          placeholder="مثلاً: شروع کنید"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-ctaLink">لینک دکمه</label>
        <input
          id="banner-ctaLink"
          type="text"
          value={props.ctaLink || "#"}
          onChange={(e) => handleFieldChange("ctaLink", e.target.value)}
          placeholder="مثلاً: /contact"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-background">آدرس تصویر پس‌زمینه</label>
        <input
          id="banner-background"
          type="text"
          value={props.backgroundImage || "/images/banner.png"}
          onChange={(e) => handleFieldChange("backgroundImage", e.target.value)}
          placeholder="/images/banner.png"
        />
        <small className={styles.hint}>مسیر تصویر در پوشه public</small>
      </div>
    </div>
  );
};

export default BannerEditor;
