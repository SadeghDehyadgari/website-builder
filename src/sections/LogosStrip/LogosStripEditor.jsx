// src/sections/LogosStrip/LogosStripEditor.jsx
// NEW: Editor for LogosStrip – manage list of logo items (image URL + alt text).

import { useState } from "react";
import styles from "./LogosStrip.module.css";

/**
 * LogosStripEditor
 * Allows adding, removing, and editing logo items.
 * Each item: { id, imageUrl, alt }
 */
const LogosStripEditor = ({ props = {}, onChange }) => {
  const { logos = [] } = props;

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");

  const addLogo = () => {
    if (!newImageUrl.trim()) return;
    const newItem = {
      id: `logo-${Date.now()}`,
      imageUrl: newImageUrl.trim(),
      alt: newAlt.trim() || "لوگوی مشتری",
    };
    onChange({
      ...props,
      logos: [...logos, newItem],
    });
    setNewImageUrl("");
    setNewAlt("");
  };

  const removeLogo = (id) => {
    onChange({
      ...props,
      logos: logos.filter((item) => item.id !== id),
    });
  };

  const updateLogo = (id, field, value) => {
    onChange({
      ...props,
      logos: logos.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  return (
    <div className={styles.editorContainer}>
      <h4 className={styles.editorTitle}>مدیریت لوگوها</h4>

      {/* Add new logo form */}
      <div className={styles.addForm}>
        <input
          type="text"
          placeholder="آدرس تصویر لوگو"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="متن جایگزین (اختیاری)"
          value={newAlt}
          onChange={(e) => setNewAlt(e.target.value)}
          className={styles.input}
        />
        <button onClick={addLogo} className={styles.addButton}>
          اضافه کردن
        </button>
      </div>

      {/* List of existing logos */}
      {logos.length === 0 && (
        <p className={styles.emptyMessage}>هنوز لوگویی اضافه نشده است.</p>
      )}

      {logos.map((item) => (
        <div key={item.id} className={styles.logoItemEditor}>
          <input
            type="text"
            value={item.imageUrl}
            onChange={(e) => updateLogo(item.id, "imageUrl", e.target.value)}
            className={styles.input}
            placeholder="آدرس تصویر"
          />
          <input
            type="text"
            value={item.alt || ""}
            onChange={(e) => updateLogo(item.id, "alt", e.target.value)}
            className={styles.input}
            placeholder="متن جایگزین"
          />
          <button
            onClick={() => removeLogo(item.id)}
            className={styles.removeButton}
            aria-label="حذف لوگو"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default LogosStripEditor;
