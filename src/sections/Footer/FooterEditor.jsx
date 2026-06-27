// src/sections/Footer/FooterEditor.jsx
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
import { generateId } from "../../utils/idGenerator";

/**
FooterEditor - settings panel for editing footer props.
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current Footer data
@param {Function} props.onChange  - called with full updated data object
*/
function FooterEditor({ data, onChange }) {
  const socialLinks = data.socialLinks || [];

  function handleFieldChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  function handleSocialLinkChange(index, field, value) {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, socialLinks: updated });
  }

  function addSocialLink() {
    // [UPDATED] Added ID for new items to maintain consistency
    const newLink = { id: generateId(), icon: "", url: "" };
    onChange({ ...data, socialLinks: [...socialLinks, newLink] });
  }

  function removeSocialLink(index) {
    const updated = socialLinks.filter((_, i) => i !== index);
    onChange({ ...data, socialLinks: updated });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات فوتر</h3>

      <EditorField
        id="footer-logo"
        label="لوگو (آدرس تصویر)"
        value={data.logo}
        onChange={(v) => handleFieldChange("logo", v)}
        placeholder="/logos/karyar-studio-logo.svg"
      />

      <EditorField
        id="footer-copyright"
        label="متن کپی‌رایت"
        value={data.copyrightText}
        onChange={(v) => handleFieldChange("copyrightText", v)}
        multiline
        placeholder="تمام حقوق محفوظ است..."
      />

      <p className={sharedStyles.sectionSubtitle}>شبکه‌های اجتماعی</p>

      {socialLinks.map((item, index) => (
        <div key={item.id || index} className={sharedStyles.itemContainer}>
          {/* [UPDATED] Item Header with title and remove button */}
          <div className={sharedStyles.itemHeader}>
            <span className={sharedStyles.itemTitle}>
              شبکه اجتماعی {index + 1}
            </span>
            {/* [UPDATED] Remove button in header, text changed to just "✕" */}
            <button
              onClick={() => removeSocialLink(index)}
              className={sharedStyles.removeButton}
              aria-label="حذف شبکه اجتماعی"
            >
              ✕
            </button>
          </div>

          {/* Item Body with fields */}
          <div className={sharedStyles.itemBody}>
            <EditorField
              id={`social-${index}-icon`}
              label="آیکون (مسیر)"
              value={item.icon}
              onChange={(v) => handleSocialLinkChange(index, "icon", v)}
              placeholder="/icons/linkedin.svg"
            />
            <EditorField
              id={`social-${index}-url`}
              label="آدرس لینک"
              value={item.url}
              onChange={(v) => handleSocialLinkChange(index, "url", v)}
              placeholder="https://..."
            />
          </div>
        </div>
      ))}

      <button onClick={addSocialLink} className={sharedStyles.addButton}>
        + افزودن شبکه اجتماعی
      </button>
    </div>
  );
}

export default FooterEditor;
