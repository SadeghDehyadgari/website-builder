// src/sections/LogosStrip/LogosStripEditor.jsx
import { useState } from "react";
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
import { generateId } from "../../utils/idGenerator";

/**
LogosStripEditor - Manages list of logo items (image URL + alt text).
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current LogosStrip data
@param {Function} props.onChange  - called with full updated data object
*/
const LogosStripEditor = ({ data, onChange }) => {
  const logos = data.logos || [];

  // [EXISTING] Draft State pattern (acceptable for 2-field form)
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");

  const addLogo = () => {
    if (!newImageUrl.trim()) return;
    const newItem = {
      id: generateId(),
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

      {/* List of existing logos */}
      <p className={sharedStyles.sectionSubtitle}>
        لوگوهای موجود ({logos.length})
      </p>

      {logos.length === 0 && (
        <p className={sharedStyles.hint}>هنوز لوگویی اضافه نشده است.</p>
      )}

      {logos.map((item) => (
        <div key={item.id} className={sharedStyles.itemContainer}>
          {/* [UPDATED] Item Header with title and remove button */}
          <div className={sharedStyles.itemHeader}>
            <span className={sharedStyles.itemTitle}>
              {item.alt || "لوگوی مشتری"}
            </span>
            {/* [UPDATED] Remove button in header, text changed to just "✕" */}
            <button
              onClick={() => removeLogo(item.id)}
              className={sharedStyles.removeButton}
              aria-label="حذف لوگو"
            >
              ✕
            </button>
          </div>

          {/* Item Body with fields */}
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
          </div>
        </div>
      ))}

      {/* [UPDATED] Add new logo form moved to bottom */}
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
    </div>
  );
};

export default LogosStripEditor;
