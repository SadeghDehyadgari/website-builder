/**
HeroEditor — settings form for the Hero section.
Receives current props and an onChange callback.
Command pattern: onChange(updatedProps) — caller decides what to do with the update.
Single Responsibility: collect user input for Hero props only.
UPDATED: Removed subtitle field.
// [FIXED] Changed prop name from 'sectionProps' to 'props' to match SectionSettingsPanel
// This fixes the "Cannot read properties of undefined (reading 'title')" error
@param {Object}   props.props  - current Hero props
@param {Function} props.onChange      - called with the full updated props object
*/
function HeroEditor({ props, onChange }) {
  // [FIXED] Changed 'sectionProps' to 'props' throughout the component
  function handleFieldChange(field, value) {
    onChange({ ...props, [field]: value });
  }

  return (
    <div>
      {/* CHANGED: Persian labels, no subtitle */}
      <Field
        label="عنوان "
        value={props.title}
        onChange={(v) => handleFieldChange("title", v)}
      />
      <Field
        label="توضیحات "
        value={props.description}
        onChange={(v) => handleFieldChange("description", v)}
        multiline
      />
      <Field
        label="آدرس تصویر "
        value={props.image}
        onChange={(v) => handleFieldChange("image", v)}
      />
      <Field
        label="متن دکمه CTA "
        value={props.ctaText}
        onChange={(v) => handleFieldChange("ctaText", v)}
      />
      <Field
        label="لینک دکمه CTA "
        value={props.ctaLink}
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
