// src/sections/ProjectsCarousel/ProjectsCarouselEditor.jsx
import { useState } from "react";
// [NEW] Import shared editor styles
import sharedStyles from "../../styles/editor-shared.module.css";

const ProjectsCarouselEditor = ({ props, onChange }) => {
  const { title = "", autoplayInterval = 5000, slides = [] } = props;

  const [localTitle, setLocalTitle] = useState(title);
  const [localInterval, setLocalInterval] = useState(autoplayInterval);
  const [localSlides, setLocalSlides] = useState(slides);

  const updateParent = (newTitle, newInterval, newSlides) => {
    onChange({
      title: newTitle,
      autoplayInterval: newInterval,
      slides: newSlides,
    });
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setLocalTitle(val);
    updateParent(val, localInterval, localSlides);
  };

  const handleIntervalChange = (e) => {
    const val = Number(e.target.value);
    setLocalInterval(val);
    updateParent(localTitle, val, localSlides);
  };

  const addSlide = () => {
    const newSlide = {
      id: `p${Date.now()}`,
      logo: "/logos/digikala.svg",
      title: "عنوان پروژه جدید",
      description: "توضیح مختصر درباره پروژه...",
      image: "/mockups/default-mock.jpg",
    };
    const updated = [...localSlides, newSlide];
    setLocalSlides(updated);
    updateParent(localTitle, localInterval, updated);
  };

  const removeSlide = (id) => {
    const updated = localSlides.filter((s) => s.id !== id);
    setLocalSlides(updated);
    updateParent(localTitle, localInterval, updated);
  };

  const updateSlide = (id, field, value) => {
    const updated = localSlides.map((s) =>
      s.id === id ? { ...s, [field]: value } : s,
    );
    setLocalSlides(updated);
    updateParent(localTitle, localInterval, updated);
  };

  return (
    // [CHANGED] Use sharedStyles for container
    <div className={sharedStyles.editorContainer}>
      <div className={sharedStyles.editorField}>
        <label>عنوان بخش</label>
        <input
          type="text"
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="عنوان بخش"
        />
      </div>

      <div className={sharedStyles.editorField}>
        <label>فاصله زمانی Autoplay (میلی‌ثانیه)</label>
        <input
          type="number"
          value={localInterval}
          onChange={handleIntervalChange}
          min="0"
          step="500"
        />
        <small>۰ = غیرفعال</small>
      </div>

      <div className={sharedStyles.editorField}>
        <label>لیست اسلایدها</label>
        {/* [CHANGED] Use sharedStyles for button */}
        <button onClick={addSlide} className={sharedStyles.addButton}>
          + افزودن اسلاید جدید
        </button>
      </div>

      {localSlides.map((slide, index) => (
        // [CHANGED] Use sharedStyles for item wrapper
        <div key={slide.id} className={sharedStyles.itemEditor}>
          <div className={sharedStyles.itemHeader}>
            <span>اسلاید {index + 1}</span>
            {/* [CHANGED] Use sharedStyles for remove button */}
            <button
              onClick={() => removeSlide(slide.id)}
              className={sharedStyles.removeButton}
            >
              حذف
            </button>
          </div>

          {/* [CHANGED] Use sharedStyles for fields grid */}
          <div className={sharedStyles.itemFields}>
            <div>
              <label>آدرس لوگو</label>
              <input
                type="text"
                value={slide.logo || ""}
                onChange={(e) => updateSlide(slide.id, "logo", e.target.value)}
                placeholder="/logos/logo.svg"
              />
            </div>
            <div>
              <label>عنوان پروژه</label>
              <input
                type="text"
                value={slide.title || ""}
                onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                placeholder="عنوان پروژه"
              />
            </div>
            <div>
              <label>توضیحات</label>
              <textarea
                value={slide.description || ""}
                onChange={(e) =>
                  updateSlide(slide.id, "description", e.target.value)
                }
                placeholder="توضیحات پروژه"
                rows={3}
              />
            </div>
            <div>
              <label>آدرس تصویر موکاپ</label>
              <input
                type="text"
                value={slide.image || ""}
                onChange={(e) => updateSlide(slide.id, "image", e.target.value)}
                placeholder="/mockups/mock.jpg"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsCarouselEditor;
