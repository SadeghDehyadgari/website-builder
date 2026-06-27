// src/sections/Process/ProcessEditor.jsx
// [FIXED] Now using shared EditorField component (DRY principle)
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";

/**
ProcessEditor — settings form for the Process section.
Receives current data and an onChange callback.
Command pattern: onChange(updatedData) — caller decides what to do with the update.
Single Responsibility: collect user input for Process data only.
@param {Object}   props.data     - current Process data
@param {Function} props.onChange  - called with the full updated data object
*/
function ProcessEditor({ data, onChange }) {
  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات سکشن فرآیند</h3>

      <EditorField
        id="process-title"
        label="عنوان"
        value={data.title}
        onChange={(v) => handleFieldChange("title", v)}
        placeholder="عنوان بخش فرآیند"
      />

      <EditorField
        id="process-description"
        label="توضیحات"
        value={data.description}
        onChange={(v) => handleFieldChange("description", v)}
        multiline
        placeholder="توضیح درباره فرآیند کار"
      />

      <EditorField
        id="process-ctaText"
        label="متن دکمه"
        value={data.ctaText}
        onChange={(v) => handleFieldChange("ctaText", v)}
        placeholder="مثلاً: شروع کنید"
      />

      <EditorField
        id="process-ctaLink"
        label="لینک دکمه"
        value={data.ctaLink}
        onChange={(v) => handleFieldChange("ctaLink", v)}
        placeholder="مثلاً: /contact"
      />

      <EditorField
        id="process-desktopImage"
        label="تصویر دسکتاپ (مسیر)"
        value={data.desktopImage}
        onChange={(v) => handleFieldChange("desktopImage", v)}
        placeholder="/images/process.svg"
      />

      <EditorField
        id="process-mobileImage"
        label="تصویر موبایل (مسیر)"
        value={data.mobileImage}
        onChange={(v) => handleFieldChange("mobileImage", v)}
        placeholder="/images/process-mobile.svg"
      />

      <EditorField
        id="process-alt"
        label="متن جایگزین (alt)"
        value={data.alt}
        onChange={(v) => handleFieldChange("alt", v)}
        placeholder="توضیح تصویر برای accessibility"
      />
    </div>
  );
}

export default ProcessEditor;
