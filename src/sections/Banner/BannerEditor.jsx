// src/sections/Banner/BannerEditor.jsx
// [FIXED] Now using shared EditorField component (DRY principle)
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";

/**
BannerEditor - Form for editing banner section properties.
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current Banner data
@param {Function} props.onChange  - called with full updated data object
*/
const BannerEditor = ({ data, onChange }) => {
  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات بنر</h3>

      <EditorField
        id="banner-title"
        label="عنوان"
        value={data.title}
        onChange={(v) => handleFieldChange("title", v)}
        placeholder="عنوان بنر"
      />

      <EditorField
        id="banner-ctaText"
        label="متن دکمه"
        value={data.ctaText}
        onChange={(v) => handleFieldChange("ctaText", v)}
        placeholder="مثلاً: شروع کنید"
      />

      <EditorField
        id="banner-ctaLink"
        label="لینک دکمه"
        value={data.ctaLink}
        onChange={(v) => handleFieldChange("ctaLink", v)}
        placeholder="مثلاً: /contact"
      />

      <EditorField
        id="banner-background"
        label="آدرس تصویر پس‌زمینه"
        value={data.backgroundImage}
        onChange={(v) => handleFieldChange("backgroundImage", v)}
        placeholder="/images/banner.png"
      />
    </div>
  );
};

export default BannerEditor;
