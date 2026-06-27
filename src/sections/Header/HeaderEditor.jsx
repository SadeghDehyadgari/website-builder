// src/sections/Header/HeaderEditor.jsx
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
import { generateId } from "../../utils/idGenerator";
import styles from "./Header.module.css";

/**
HeaderEditor - Form for editing header section properties.
Allows adding/removing/editing navigation links and changing logo.
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current Header data
@param {Function} props.onChange  - called with full updated data object
*/
const HeaderEditor = ({ data, onChange }) => {
  const { logo = "/logos/karyar-studio-logo.svg", links = [] } = data || {};

  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  function addLink() {
    const newId = generateId(); // [UPDATED] Use shared generateId()
    onChange({
      ...data,
      links: [...links, { id: newId, label: "", slug: "" }],
    });
  }

  function removeLink(id) {
    onChange({ ...data, links: links.filter((link) => link.id !== id) });
  }

  function updateLink(id, field, value) {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link,
    );
    onChange({ ...data, links: updatedLinks });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات هدر</h3>

      <EditorField
        id="header-logo"
        label="آدرس لوگو"
        value={logo}
        onChange={(v) => handleFieldChange("logo", v)}
        placeholder="/logos/karyar-studio-logo.svg"
      />
      <small className={sharedStyles.hint}>مسیر تصویر در پوشه public</small>

      <p className={sharedStyles.sectionSubtitle}>لینک‌های ناوبری</p>

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
          {/* [UPDATED] Using shared removeButton for consistency */}
          <button
            type="button"
            onClick={() => removeLink(link.id)}
            className={sharedStyles.removeButton}
            aria-label="حذف لینک"
          >
            ✕
          </button>
        </div>
      ))}

      {/* [UPDATED] Using shared addButton for consistency */}
      <button
        type="button"
        onClick={addLink}
        className={sharedStyles.addButton}
      >
        + افزودن لینک جدید
      </button>
    </div>
  );
};

export default HeaderEditor;
