// src/components/EditorField/EditorField.jsx
// [NEW] Extracted shared Field component to adhere to DRY principle.
// Used across all section editors for consistent form inputs and styling.
import sharedStyles from "../../styles/editor-shared.module.css";

/**
 * EditorField — reusable form field for section editors.
 * Single Responsibility: render a labeled input or textarea.
 * Follows "Tell, Don't Ask" by simply reporting changes via onChange.
 * @param {Object} props
 * @param {string} props.label - Field label text
 * @param {string} props.value - Current field value
 * @param {Function} props.onChange - Called with the new string value
 * @param {boolean} [props.multiline=false] - If true, renders a textarea
 */
function EditorField({ label, value, onChange, multiline = false }) {
  return (
    <label className={sharedStyles.field}>
      {label}
      {multiline ? (
        <textarea
          className={sharedStyles.textarea}
          value={value || ""}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={sharedStyles.input}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export default EditorField;
