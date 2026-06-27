// src/sections/Hero/HeroEditor.jsx
// [FIXED] Now using shared EditorField component (DRY principle)
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";

/**
HeroEditor — settings form for the Hero section.
Receives current data and an onChange callback.
Command pattern: onChange(updatedData) — caller decides what to do with the update.
Single Responsibility: collect user input for Hero data only.
@param {Object}   props.data     - current Hero data
@param {Function} props.onChange  - called with the full updated data object
*/
function HeroEditor({ data, onChange }) {
  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات بخش قهرمان</h3>

      <EditorField
        id="hero-title"
        label="عنوان"
        value={data.title}
        onChange={(v) => handleFieldChange("title", v)}
        placeholder="عنوان اصلی صفحه"
      />

      <EditorField
        id="hero-description"
        label="توضیحات"
        value={data.description}
        onChange={(v) => handleFieldChange("description", v)}
        multiline
        placeholder="توضیح کوتاه درباره صفحه"
      />

      <EditorField
        id="hero-image"
        label="آدرس تصویر"
        value={data.image}
        onChange={(v) => handleFieldChange("image", v)}
        placeholder="/images/hero.svg"
      />

      <EditorField
        id="hero-ctaText"
        label="متن دکمه CTA"
        value={data.ctaText}
        onChange={(v) => handleFieldChange("ctaText", v)}
        placeholder="مثلاً: شروع کنید"
      />

      <EditorField
        id="hero-ctaLink"
        label="لینک دکمه CTA"
        value={data.ctaLink}
        onChange={(v) => handleFieldChange("ctaLink", v)}
        placeholder="مثلاً: /contact"
      />
    </div>
  );
}

export default HeroEditor;
