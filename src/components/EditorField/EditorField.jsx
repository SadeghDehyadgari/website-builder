// src/components/EditorField/EditorField.jsx
// [UPDATED] Using shared editor styles for consistency
import sharedStyles from "../../styles/editor-shared.module.css";

/**
 * EditorField — reusable form field for section editors.
 * Single Responsibility: render a labeled input or textarea.
 * @param {Object} props
 * @param {string} props.label - Field label text
 * @param {string} props.value - Current field value
 * @param {Function} props.onChange - Called with the new string value
 * @param {boolean} [props.multiline=false] - If true, renders a textarea
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.id] - HTML id attribute for accessibility
 */
function EditorField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  id,
}) {
  return (
    <div className={sharedStyles.fieldGroup}>
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea
          id={id}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default EditorField;
