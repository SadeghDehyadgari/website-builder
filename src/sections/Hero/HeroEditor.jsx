// src/sections/Hero/HeroEditor.jsx
// [UPDATED] Replaced local Field component and inline styles with shared EditorField.
import EditorField from "../../components/EditorField/EditorField";

/**
HeroEditor — settings form for the Hero section.
Receives current data and an onChange callback.
Command pattern: onChange(updatedData) — caller decides what to do with the update.
Single Responsibility: collect user input for Hero data only.
UPDATED: Removed subtitle field.
// [FIXED] Changed prop name from 'props' to 'data' to avoid shadowing and improve readability
// This fixes the confusing 'props.props' JSDoc and prevents variable shadowing
@param {Object}   props.data     - current Hero data
@param {Function} props.onChange  - called with the full updated data object
*/
function HeroEditor({ data, onChange }) {
  // [FIXED] Changed 'props' to 'data' throughout the component
  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div>
      {/* CHANGED: Persian labels, no subtitle */}
      <EditorField
        label="عنوان "
        value={data.title}
        onChange={(v) => handleFieldChange("title", v)}
      />
      <EditorField
        label="توضیحات "
        value={data.description}
        onChange={(v) => handleFieldChange("description", v)}
        multiline
      />
      <EditorField
        label="آدرس تصویر "
        value={data.image}
        onChange={(v) => handleFieldChange("image", v)}
      />
      <EditorField
        label="متن دکمه CTA "
        value={data.ctaText}
        onChange={(v) => handleFieldChange("ctaText", v)}
      />
      <EditorField
        label="لینک دکمه CTA "
        value={data.ctaLink}
        onChange={(v) => handleFieldChange("ctaLink", v)}
      />
    </div>
  );
}

// [REMOVED] Local Field component and inputStyle object to adhere to DRY.
// Now using shared EditorField from src/components/EditorField/EditorField.jsx

export default HeroEditor;
