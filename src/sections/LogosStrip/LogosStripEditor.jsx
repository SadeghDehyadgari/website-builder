// src/sections/LogosStrip/LogosStripEditor.jsx
import { useState } from "react";
// [UPDATED] Import shared EditorField and styles (DRY principle)
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
// [UPDATED] Import shared ID generator for consistency
import { generateId } from "../../utils/idGenerator";

/**
 * LogosStripEditor - Manages list of logo items (image URL + alt text).
 * Command pattern: onChange(updatedData) — caller decides what to do.
 * @param {Object}   props.data     - current LogosStrip data
 * @param {Function} props.onChange  - called with full updated data object
 */
const LogosStripEditor = ({ data, onChange }) => {
  const logos = data.logos || [];

  // [EXISTING] Local state for the "Add New" form is a "Draft" pattern.
  // It's acceptable here because we don't want to update the main data
  // until the user explicitly clicks "Add".
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");

  const addLogo = () => {
    if (!newImageUrl.trim()) return;
    const newItem = {
      id: generateId(), // [UPDATED] Use shared generateId()
      imageUrl: newImageUrl.trim(),
      alt: newAlt.trim() || "لوگوی مشتری",
    };
    onChange({
      ...data,
      logos: [...logos, newItem],
    });
    setNewImageUrl("");
    setNewAlt("");
  };

  const removeLogo = (id) => {
    onChange({
      ...data,
      logos: logos.filter((item) => item.id !== id),
    });
  };

  const updateLogo = (id, field, value) => {
    onChange({
      ...data,
      logos: logos.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>مدیریت لوگوها</h3>

      {/* Add new logo form */}
      <p className={sharedStyles.sectionSubtitle}>افزودن لوگوی جدید</p>
      <EditorField
        id="new-logo-url"
        label="آدرس تصویر لوگو"
        value={newImageUrl}
        onChange={setNewImageUrl}
        placeholder="/logos/example.svg"
      />
      <EditorField
        id="new-logo-alt"
        label="متن جایگزین (اختیاری)"
        value={newAlt}
        onChange={setNewAlt}
        placeholder="نام شرکت"
      />
      <button onClick={addLogo} className={sharedStyles.addButton}>
        + افزودن لوگو
      </button>

      {/* List of existing logos */}
      <p className={sharedStyles.sectionSubtitle}>
        لوگوهای موجود ({logos.length})
      </p>

      {logos.length === 0 && (
        <p className={sharedStyles.hint}>هنوز لوگویی اضافه نشده است.</p>
      )}

      {logos.map((item) => (
        <div key={item.id} className={sharedStyles.itemContainer}>
          <div className={sharedStyles.itemBody}>
            <EditorField
              id={`logo-${item.id}-url`}
              label="آدرس تصویر"
              value={item.imageUrl}
              onChange={(v) => updateLogo(item.id, "imageUrl", v)}
              placeholder="/logos/example.svg"
            />
            <EditorField
              id={`logo-${item.id}-alt`}
              label="متن جایگزین"
              value={item.alt}
              onChange={(v) => updateLogo(item.id, "alt", v)}
              placeholder="نام شرکت"
            />

            {/* Remove button aligned to the end */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.5rem",
              }}
            >
              <button
                onClick={() => removeLogo(item.id)}
                className={sharedStyles.removeButton}
                aria-label="حذف لوگو"
              >
                ✕ حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogosStripEditor;
