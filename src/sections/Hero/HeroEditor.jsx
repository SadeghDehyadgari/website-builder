/**
 * HeroEditor — settings form for the Hero section.
 *
 * Receives current props and an onChange callback.
 * Command pattern: onChange(updatedProps) — caller decides what to do with the update.
 * Single Responsibility: collect user input for Hero props only.
 * UPDATED: Removed subtitle field.
 *
 * @param {Object}   props.sectionProps  - current Hero props
 * @param {Function} props.onChange      - called with the full updated props object
 */
function HeroEditor({ sectionProps, onChange }) {
  function handleFieldChange(field, value) {
    onChange({ ...sectionProps, [field]: value });
  }

  return (
    <div>
      {/* CHANGED: Persian labels, no subtitle */}
      <Field
        label="عنوان"
        value={sectionProps.title}
        onChange={(v) => handleFieldChange("title", v)}
      />
      <Field
        label="توضیحات"
        value={sectionProps.description}
        onChange={(v) => handleFieldChange("description", v)}
        multiline
      />
      <Field
        label="آدرس تصویر"
        value={sectionProps.image}
        onChange={(v) => handleFieldChange("image", v)}
      />
      <Field
        label="متن دکمه CTA"
        value={sectionProps.ctaText}
        onChange={(v) => handleFieldChange("ctaText", v)}
      />
      <Field
        label="لینک دکمه CTA"
        value={sectionProps.ctaLink}
        onChange={(v) => handleFieldChange("ctaLink", v)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Private helper (unchanged)
// ---------------------------------------------------------------------------

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

export default HeroEditor;
