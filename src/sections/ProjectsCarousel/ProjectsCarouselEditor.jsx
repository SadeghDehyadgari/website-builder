// src/sections/ProjectsCarousel/ProjectsCarouselEditor.jsx
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
import { generateId } from "../../utils/idGenerator";

/**
ProjectsCarouselEditor - Form for editing projects carousel properties.
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current ProjectsCarousel data
@param {Function} props.onChange  - called with full updated data object
*/
const ProjectsCarouselEditor = ({ data, onChange }) => {
  const slides = data.slides || [];

  function handleTopLevelChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  function handleSlideChange(index, field, value) {
    const updatedSlides = slides.map((slide, i) =>
      i === index ? { ...slide, [field]: value } : slide,
    );
    onChange({ ...data, slides: updatedSlides });
  }

  function addSlide() {
    const newSlide = {
      id: generateId(), // [UPDATED] Use shared generateId()
      logo: "/logos/karyar.svg",
      title: "عنوان پروژه جدید",
      description: "توضیح مختصر درباره پروژه...",
      image: "/mockups/default-mock.jpg",
    };
    onChange({ ...data, slides: [...slides, newSlide] });
  }

  function removeSlide(id) {
    onChange({ ...data, slides: slides.filter((s) => s.id !== id) });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات پروژه‌ها</h3>

      <EditorField
        id="projects-title"
        label="عنوان بخش"
        value={data.title}
        onChange={(v) => handleTopLevelChange("title", v)}
        placeholder="عنوان اصلی بخش پروژه‌ها"
      />

      <EditorField
        id="projects-autoplay"
        label="فاصله زمانی Autoplay (میلی‌ثانیه)"
        value={data.autoplayInterval}
        onChange={(v) => handleTopLevelChange("autoplayInterval", Number(v))}
        placeholder="5000"
      />
      <small className={sharedStyles.hint}>۰ = غیرفعال</small>

      <p className={sharedStyles.sectionSubtitle}>لیست اسلایدها</p>

      {slides.map((slide, index) => (
        <div key={slide.id} className={sharedStyles.itemContainer}>
          <div className={sharedStyles.itemHeader}>
            <span className={sharedStyles.itemTitle}>اسلاید {index + 1}</span>
            <button
              onClick={() => removeSlide(slide.id)}
              className={sharedStyles.removeButton}
              aria-label="حذف اسلاید"
            >
              ✕
            </button>
          </div>

          <div className={sharedStyles.itemBody}>
            <EditorField
              id={`project-${slide.id}-logo`}
              label="آدرس لوگو"
              value={slide.logo}
              onChange={(v) => handleSlideChange(index, "logo", v)}
              placeholder="/logos/logo.svg"
            />
            <EditorField
              id={`project-${slide.id}-title`}
              label="عنوان پروژه"
              value={slide.title}
              onChange={(v) => handleSlideChange(index, "title", v)}
              placeholder="عنوان پروژه"
            />
            <EditorField
              id={`project-${slide.id}-description`}
              label="توضیحات"
              value={slide.description}
              onChange={(v) => handleSlideChange(index, "description", v)}
              multiline
              placeholder="توضیحات پروژه"
            />
            <EditorField
              id={`project-${slide.id}-image`}
              label="آدرس تصویر موکاپ"
              value={slide.image}
              onChange={(v) => handleSlideChange(index, "image", v)}
              placeholder="/mockups/mock.jpg"
            />
          </div>
        </div>
      ))}

      <button onClick={addSlide} className={sharedStyles.addButton}>
        + افزودن اسلاید جدید
      </button>
    </div>
  );
};

export default ProjectsCarouselEditor;
