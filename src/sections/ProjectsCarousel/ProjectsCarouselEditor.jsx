// src/sections/ProjectsCarousel/ProjectsCarouselEditor.jsx
// NEW FILE: Editor for ProjectsCarousel section – allows editing title, autoplay interval, and slides.

import { useState } from "react";
import styles from "./ProjectsCarousel.module.css";

/**
 * Editor for ProjectsCarousel section.
 */
const ProjectsCarouselEditor = ({ props, onChange }) => {
  const { title = "", autoplayInterval = 5000, slides = [] } = props;

  // Local state
  const [localTitle, setLocalTitle] = useState(title);
  const [localInterval, setLocalInterval] = useState(autoplayInterval);
  const [localSlides, setLocalSlides] = useState(slides);

  // Notify parent of changes
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

  // Add a new slide
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

  // Remove a slide by id
  const removeSlide = (id) => {
    const updated = localSlides.filter((s) => s.id !== id);
    setLocalSlides(updated);
    updateParent(localTitle, localInterval, updated);
  };

  // Update a specific field of a slide
  const updateSlide = (id, field, value) => {
    const updated = localSlides.map((s) =>
      s.id === id ? { ...s, [field]: value } : s,
    );
    setLocalSlides(updated);
    updateParent(localTitle, localInterval, updated);
  };

  return (
    <div className={styles.editorContainer}>
      {/* Title */}
      <div className={styles.editorField}>
        <label>عنوان بخش</label>
        <input
          type="text"
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="عنوان بخش"
        />
      </div>

      {/* Autoplay interval */}
      <div className={styles.editorField}>
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

      {/* Slides list */}
      <div className={styles.editorField}>
        <label>لیست اسلایدها</label>
        <button onClick={addSlide} className={styles.addButton}>
          + افزودن اسلاید جدید
        </button>
      </div>

      {localSlides.map((slide, index) => (
        <div key={slide.id} className={styles.itemEditor}>
          <div className={styles.itemHeader}>
            <span>اسلاید {index + 1}</span>
            <button
              onClick={() => removeSlide(slide.id)}
              className={styles.removeButton}
            >
              حذف
            </button>
          </div>

          <div className={styles.itemFields}>
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
