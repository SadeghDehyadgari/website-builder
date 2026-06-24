// src/sections/Banner/BannerEditor.jsx
// NEW: Banner editor component for Admin Panel

import { useState, useEffect } from "react";
import styles from "./Banner.module.css";

/**
 * BannerEditor - Form for editing banner section properties
 */
const BannerEditor = ({ props, onChange }) => {
  // Local state initialized from props
  const [title, setTitle] = useState(props?.title || "");
  const [ctaText, setCtaText] = useState(props?.ctaText || "");
  const [ctaLink, setCtaLink] = useState(props?.ctaLink || "#");
  const [backgroundImage, setBackgroundImage] = useState(
    props?.backgroundImage || "/images/banner.png",
  );

  // Notify parent of changes whenever any field updates
  useEffect(() => {
    onChange({
      title,
      ctaText,
      ctaLink,
      backgroundImage,
    });
  }, [title, ctaText, ctaLink, backgroundImage, onChange]);

  return (
    <div className={styles.editor}>
      <h3 className={styles.editorTitle}>تنظیمات بنر</h3>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-title">عنوان</label>
        <input
          id="banner-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان بنر"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-ctaText">متن دکمه</label>
        <input
          id="banner-ctaText"
          type="text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
          placeholder="مثلاً: شروع کنید"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-ctaLink">لینک دکمه</label>
        <input
          id="banner-ctaLink"
          type="text"
          value={ctaLink}
          onChange={(e) => setCtaLink(e.target.value)}
          placeholder="مثلاً: /contact"
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="banner-background">آدرس تصویر پس‌زمینه</label>
        <input
          id="banner-background"
          type="text"
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
          placeholder="/images/banner.png"
        />
        <small className={styles.hint}>مسیر تصویر در پوشه public</small>
      </div>
    </div>
  );
};

export default BannerEditor;
