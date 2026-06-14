import { useState } from "react";

/**
 * FeaturesEditor — settings form for the Features section.
 *
 * Handles a dynamic list of feature items (add / remove / edit).
 *
 * @param {Object}   props.sectionProps  - current Features props
 * @param {Function} props.onChange      - called with full updated props object
 */
function FeaturesEditor({ sectionProps, onChange }) {
  function handleTopLevelChange(field, value) {
    onChange({ ...sectionProps, [field]: value });
  }

  function handleItemChange(index, field, value) {
    const updatedItems = sectionProps.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange({ ...sectionProps, items: updatedItems });
  }

  function addItem() {
    const newItem = {
      id: `f${Date.now()}`,
      icon: "✨",
      title: "ویژگی جدید", // CHANGED: Persian default
      description: "توضیح این ویژگی.", // CHANGED
    };
    onChange({ ...sectionProps, items: [...sectionProps.items, newItem] });
  }

  function removeItem(index) {
    const updatedItems = sectionProps.items.filter((_, i) => i !== index);
    onChange({ ...sectionProps, items: updatedItems });
  }

  return (
    <div>
      {/* Top-level fields - CHANGED: Persian labels */}
      <Field
        label="عنوان بخش"
        value={sectionProps.title}
        onChange={(v) => handleTopLevelChange("title", v)}
      />
      <Field
        label="متن دکمه CTA"
        value={sectionProps.ctaText}
        onChange={(v) => handleTopLevelChange("ctaText", v)}
      />
      <Field
        label="لینک CTA"
        value={sectionProps.ctaLink}
        onChange={(v) => handleTopLevelChange("ctaLink", v)}
      />

      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: "#374151",
        }}
      >
        آیتم‌های ویژگی‌ها
      </p>

      {sectionProps.items.map((item, index) => (
        <ItemEditor
          key={item.id}
          item={item}
          index={index}
          onChange={handleItemChange}
          onRemove={removeItem}
          isRemovable={sectionProps.items.length > 1}
        />
      ))}

      <button onClick={addItem} style={addButtonStyle}>
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
    <div style={itemContainerStyle}>
      <div style={itemHeaderStyle} onClick={() => setIsOpen((prev) => !prev)}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>
          {item.icon} {item.title || `مورد ${index + 1}`}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            {isOpen ? "▲" : "▼"}
          </span>
          {isRemovable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              style={removeButtonStyle}
              title="حذف مورد"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div style={{ padding: "0.5rem 0.75rem 0.75rem" }}>
          <Field
            label="آیکون (Emoji)"
            value={item.icon}
            onChange={(v) => onChange(index, "icon", v)}
          />
          <Field
            label="عنوان"
            value={item.title}
            onChange={(v) => onChange(index, "title", v)}
          />
          <Field
            label="توضیحات"
            value={item.description}
            onChange={(v) => onChange(index, "description", v)}
            multiline
          />
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }) {
  const inputStyle = {
    width: "100%",
    padding: "0.4rem 0.6rem",
    marginTop: "0.25rem",
    marginBottom: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <label style={{ display: "block", fontSize: "0.8rem", color: "#374151" }}>
      {label}
      {multiline ? (
        <textarea
          value={value || ""}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          style={inputStyle}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

// Styles (unchanged)
const itemContainerStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  marginBottom: "0.6rem",
  overflow: "hidden",
};

const itemHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 0.75rem",
  background: "#f9fafb",
  cursor: "pointer",
  userSelect: "none",
};

const removeButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#ef4444",
  fontSize: "0.75rem",
  padding: "0 2px",
  lineHeight: 1,
};

const addButtonStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  background: "none",
  border: "1px dashed #d1d5db",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.8rem",
  color: "#6b7280",
};

export default FeaturesEditor;
