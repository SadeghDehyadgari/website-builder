// src/sections/Process/ProcessEditor.jsx
// UPDATED: Removed useEffect to avoid cascading renders; state initialized directly from props.
// Uses default values when props are undefined.

import { useState } from "react";

const ProcessEditor = ({ props = {}, onChange }) => {
  // Initialize local state directly from props (once, on mount)
  // This avoids the need for a synchronizing useEffect.
  const [localProps, setLocalProps] = useState({
    title: props.title ?? "روند تبدیل ایده به محصول",
    description:
      props.description ??
      "از ایده‌پردازی تا پیاده‌سازی نهایی، ما در هر قدم همراه شما هستیم.",
    ctaText: props.ctaText ?? "شروع کنید",
    ctaLink: props.ctaLink ?? "#",
    desktopImage: props.desktopImage ?? "/images/process.svg",
    mobileImage: props.mobileImage ?? "/images/process-mobile.svg",
    alt: props.alt ?? "روند تبدیل ایده به محصول",
  });

  // Handle individual field changes – updates local state and notifies parent
  const handleChange = (field, value) => {
    const updated = { ...localProps, [field]: value };
    setLocalProps(updated);
    // Tell parent about the change (tell, don't ask)
    onChange(updated);
  };

  return (
    <div style={{ padding: "1rem", direction: "rtl" }}>
      <h4 style={{ marginBottom: "1rem" }}>تنظیمات سکشن فرآیند</h4>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          عنوان
        </label>
        <input
          type="text"
          value={localProps.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          توضیحات
        </label>
        <textarea
          value={localProps.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          متن دکمه
        </label>
        <input
          type="text"
          value={localProps.ctaText}
          onChange={(e) => handleChange("ctaText", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          لینک دکمه
        </label>
        <input
          type="text"
          value={localProps.ctaLink}
          onChange={(e) => handleChange("ctaLink", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          تصویر دسکتاپ (مسیر)
        </label>
        <input
          type="text"
          value={localProps.desktopImage}
          onChange={(e) => handleChange("desktopImage", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          تصویر موبایل (مسیر)
        </label>
        <input
          type="text"
          value={localProps.mobileImage}
          onChange={(e) => handleChange("mobileImage", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "0.8rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.3rem",
            fontWeight: "bold",
          }}
        >
          متن جایگزین (alt)
        </label>
        <input
          type="text"
          value={localProps.alt}
          onChange={(e) => handleChange("alt", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>
  );
};

export default ProcessEditor;
