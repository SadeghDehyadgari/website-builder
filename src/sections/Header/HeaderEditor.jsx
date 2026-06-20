// src/sections/Header/HeaderEditor.jsx
// NEW: Editor for Header section - manages logo and navigation links

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

/**
 * HeaderEditor - Form for editing header section properties
 * Allows adding/removing/editing navigation links and changing logo
 */
const HeaderEditor = ({ props, onChange }) => {
  const [logo, setLogo] = useState(
    props?.logo || "/logos/karyar-studio-logo.svg",
  );
  const [links, setLinks] = useState(
    props?.links || [
      { id: "link-1", label: "صفحه اصلی", slug: "/" },
      { id: "link-2", label: "خدمات", slug: "/services" },
      { id: "link-3", label: "درباره ما", slug: "/about" },
    ],
  );

  // Notify parent whenever any field changes
  useEffect(() => {
    onChange({ logo, links });
  }, [logo, links, onChange]);

  // Handlers for link management
  const addLink = () => {
    const newId = `link-${Date.now()}`;
    setLinks([...links, { id: newId, label: "", slug: "" }]);
  };

  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const updateLink = (id, field, value) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    );
  };

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
          onChange={(e) => setLogo(e.target.value)}
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
