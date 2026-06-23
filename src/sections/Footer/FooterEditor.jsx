// FooterEditor - settings panel for editing footer props
// [FIXED] Changed prop name from 'sectionProps' to 'props' to match SectionSettingsPanel
// [FIXED] Changed onChange calls to pass full props object instead of field name + value
/**
Helper component to edit a single social link item
*/
function SocialLinkItem({ item, index, onChange, onRemove }) {
  const handleIconChange = (e) => onChange(index, "icon", e.target.value);
  const handleUrlChange = (e) => onChange(index, "url", e.target.value);
  return (
    <div
      style={{
        marginBottom: "1rem",
        border: "1px solid #ddd",
        padding: "0.5rem",
      }}
    >
      <div>
        <label>آیکون (مسیر): </label>
        <input
          type="text"
          value={item.icon || ""}
          onChange={handleIconChange}
          placeholder="/icons/linkedin.svg"
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
      </div>
      <div>
        <label>آدرس لینک: </label>
        <input
          type="url"
          value={item.url || ""}
          onChange={handleUrlChange}
          placeholder="https://..."
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
      </div>
      <button onClick={onRemove} style={{ color: "red" }}>
        حذف
      </button>
    </div>
  );
}

function FooterEditor({ props, onChange }) {
  // [FIXED] Changed 'sectionProps' to 'props'
  const { logo = "", socialLinks = [], copyrightText = "" } = props;

  // [FIXED] Changed onChange calls to pass full props object
  const handleLogoChange = (e) => {
    onChange({ ...props, logo: e.target.value });
  };

  const handleCopyrightChange = (e) => {
    onChange({ ...props, copyrightText: e.target.value });
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...props, socialLinks: updated });
  };

  const addSocialLink = () => {
    const newLink = { icon: "", url: "" };
    onChange({ ...props, socialLinks: [...socialLinks, newLink] });
  };

  const removeSocialLink = (index) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    onChange({ ...props, socialLinks: updated });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>ویرایش فوتر</h3>
      <div style={{ marginBottom: "1rem" }}>
        <label>لوگو (آدرس تصویر): </label>
        <input
          type="text"
          value={logo}
          onChange={handleLogoChange}
          placeholder="/logos/karyar-studio-logo.svg"
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>متن کپی‌رایت: </label>
        <textarea
          value={copyrightText}
          onChange={handleCopyrightChange}
          placeholder="تمام حقوق محفوظ است..."
          rows="2"
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <label>شبکه‌های اجتماعی: </label>
        {socialLinks.map((item, idx) => (
          <SocialLinkItem
            key={idx}
            item={item}
            index={idx}
            onChange={handleSocialLinkChange}
            onRemove={() => removeSocialLink(idx)}
          />
        ))}
        <button onClick={addSocialLink}>+ افزودن شبکه اجتماعی</button>
      </div>
    </div>
  );
}

export default FooterEditor;
