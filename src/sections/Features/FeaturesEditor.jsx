// src/sections/Features/FeaturesEditor.jsx
import { useState } from "react";
// [EXISTING] Import shared EditorField component (DRY principle)
import EditorField from "../../components/EditorField/EditorField";
// [EXISTING] Import shared editor styles to eliminate inline styles
import sharedStyles from "../../styles/editor-shared.module.css";
// [NEW] Import shared ID generator for consistency and collision resistance
import { generateId } from "../../utils/idGenerator";

/**
FeaturesEditor — settings form for the Features section.
Handles a dynamic list of feature items (add / remove / edit).
// [EXISTING] Changed prop name from 'props' to 'data' to avoid shadowing and improve readability
// This fixes the confusing 'props.props' JSDoc and prevents variable shadowing
@param {Object}   props.data     - current Features data
@param {Function} props.onChange  - called with full updated data object
*/
function FeaturesEditor({ data, onChange }) {
  // [EXISTING] Changed 'props' to 'data' throughout the component
  function handleTopLevelChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  function handleItemChange(index, field, value) {
    const updatedItems = data.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange({ ...data, items: updatedItems });
  }

  function addItem() {
    const newItem = {
      // [UPDATED] Use shared generateId() instead of Date.now() to prevent ID collisions
      // and ensure consistency across the entire application.
      id: generateId(),
      icon: "✨",
      title: "ویژگی جدید", // [EXISTING] CHANGED: Persian default
      description: "توضیح این ویژگی.", // [EXISTING] CHANGED
    };
    onChange({ ...data, items: [...data.items, newItem] });
  }

  function removeItem(index) {
    const updatedItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: updatedItems });
  }

  return (
    <div>
      {/* Top-level fields - [EXISTING] CHANGED: Persian labels */}
      <EditorField
        label="عنوان بخش  "
        value={data.title}
        onChange={(v) => handleTopLevelChange("title", v)}
      />
      <EditorField
        label="متن دکمه CTA  "
        value={data.ctaText}
        onChange={(v) => handleTopLevelChange("ctaText", v)}
      />
      <EditorField
        label="لینک CTA  "
        value={data.ctaLink}
        onChange={(v) => handleTopLevelChange("ctaLink", v)}
      />

      {/* [EXISTING] Replaced inline style with shared CSS class */}
      <p className={sharedStyles.sectionSubtitle}>آیتم‌های ویژگی‌ها</p>

      {data.items.map((item, index) => (
        <ItemEditor
          key={item.id}
          item={item}
          index={index}
          onChange={handleItemChange}
          onRemove={removeItem}
          isRemovable={data.items.length > 1}
        />
      ))}

      {/* [EXISTING] Replaced inline style with shared CSS class */}
      <button onClick={addItem} className={sharedStyles.addButton}>
        + افزودن ویژگی
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Private sub-components
// ---------------------------------------------------------------------------
function ItemEditor({ item, index, onChange, onRemove, isRemovable }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // [EXISTING] Replaced inline style with shared CSS class
    <div className={sharedStyles.itemContainer}>
      {/* [EXISTING] Replaced inline style with shared CSS class */}
      <div
        className={sharedStyles.itemHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* [EXISTING] Replaced inline style with shared CSS class */}
        <span className={sharedStyles.itemTitle}>
          {item.icon} {item.title || `مورد ${index + 1}`}
        </span>

        {/* [EXISTING] Replaced inline style with shared CSS class */}
        <div className={sharedStyles.itemActions}>
          {/* [EXISTING] Replaced inline style with shared CSS class */}
          <span className={sharedStyles.toggleIcon}>{isOpen ? "▲" : "▼"}</span>

          {isRemovable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              className={sharedStyles.removeButton}
              title="حذف مورد "
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        // [EXISTING] Replaced inline style with shared CSS class
        <div className={sharedStyles.itemBody}>
          {/* [EXISTING] Using shared EditorField instead of local Field */}
          <EditorField
            label="آیکون (Emoji)  "
            value={item.icon}
            onChange={(v) => onChange(index, "icon", v)}
          />
          <EditorField
            label="عنوان "
            value={item.title}
            onChange={(v) => onChange(index, "title", v)}
          />
          <EditorField
            label="توضیحات "
            value={item.description}
            onChange={(v) => onChange(index, "description", v)}
            multiline
          />
        </div>
      )}
    </div>
  );
}

export default FeaturesEditor;
