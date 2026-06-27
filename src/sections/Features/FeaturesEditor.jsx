// src/sections/Features/FeaturesEditor.jsx
import { useState } from "react";
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
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
      // [EXISTING] Use shared generateId() instead of Date.now() to prevent ID collisions
      // and ensure consistency across the entire application.
      id: generateId(),
      icon: "✨",
      title: "ویژگی جدید",
      description: "توضیح این ویژگی.",
    };
    onChange({ ...data, items: [...data.items, newItem] });
  }

  function removeItem(index) {
    const updatedItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: updatedItems });
  }

  return (
    // [UPDATED] Added editorContainer for consistent layout across all editors
    <div className={sharedStyles.editorContainer}>
      {/* [UPDATED] Added editorTitle for consistent UX across all editors */}
      <h3 className={sharedStyles.editorTitle}>تنظیمات ویژگی‌ها</h3>
      <EditorField
        id="features-title"
        label="عنوان بخش"
        value={data.title}
        onChange={(v) => handleTopLevelChange("title", v)}
        placeholder="عنوان اصلی بخش ویژگی‌ها"
      />

      <EditorField
        id="features-ctaText"
        label="متن دکمه CTA"
        value={data.ctaText}
        onChange={(v) => handleTopLevelChange("ctaText", v)}
        placeholder="مثلاً: مشاهده خدمات"
      />
      <EditorField
        id="features-ctaLink"
        label="لینک CTA"
        value={data.ctaLink}
        onChange={(v) => handleTopLevelChange("ctaLink", v)}
        placeholder="مثلاً: /services"
      />

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
    <div className={sharedStyles.itemContainer}>
      <div
        className={sharedStyles.itemHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={sharedStyles.itemTitle}>
          {item.icon} {item.title || `مورد ${index + 1}`}
        </span>

        <div className={sharedStyles.itemActions}>
          <span className={sharedStyles.toggleIcon}>{isOpen ? "▲" : "▼"}</span>

          {isRemovable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              className={sharedStyles.removeButton}
              title="حذف مورد"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className={sharedStyles.itemBody}>
          <EditorField
            id={`features-item-${index}-icon`}
            label="آیکون (Emoji)"
            value={item.icon}
            onChange={(v) => onChange(index, "icon", v)}
            placeholder="✨"
          />
          <EditorField
            id={`features-item-${index}-title`}
            label="عنوان"
            value={item.title}
            onChange={(v) => onChange(index, "title", v)}
            placeholder="عنوان ویژگی"
          />
          <EditorField
            id={`features-item-${index}-description`}
            label="توضیحات"
            value={item.description}
            onChange={(v) => onChange(index, "description", v)}
            multiline
            placeholder="توضیح کوتاه درباره ویژگی"
          />
        </div>
      )}
    </div>
  );
}

export default FeaturesEditor;
