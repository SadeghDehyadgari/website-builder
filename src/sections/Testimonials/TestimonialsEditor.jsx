// src/sections/Testimonials/TestimonialsEditor.jsx
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
import { generateId } from "../../utils/idGenerator";

/**
TestimonialsEditor - Form for editing testimonials properties.
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current Testimonials data
@param {Function} props.onChange  - called with full updated data object
*/
const TestimonialsEditor = ({ data, onChange }) => {
  const items = data.items || [];

  function handleTopLevelChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  function handleItemChange(index, field, value) {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange({ ...data, items: updatedItems });
  }

  function addItem() {
    const newItem = {
      id: generateId(), // [UPDATED] Use shared generateId()
      avatar: "/avatars/avatar-1.png",
      name: "نام کاربر",
      role: "نقش شغلی",
      quote: "متن نظر کاربر",
    };
    onChange({ ...data, items: [...items, newItem] });
  }

  function removeItem(id) {
    onChange({ ...data, items: items.filter((item) => item.id !== id) });
  }

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>تنظیمات نظرات مشتریان</h3>

      <EditorField
        id="testimonials-title"
        label="عنوان بخش"
        value={data.title}
        onChange={(v) => handleTopLevelChange("title", v)}
        placeholder="عنوان اصلی بخش نظرات"
      />

      <EditorField
        id="testimonials-description"
        label="توضیحات"
        value={data.description}
        onChange={(v) => handleTopLevelChange("description", v)}
        multiline
        placeholder="توضیح کوتاه درباره بخش نظرات"
      />

      <p className={sharedStyles.sectionSubtitle}>لیست نظرات</p>

      <button onClick={addItem} className={sharedStyles.addButton}>
        + افزودن نظر جدید
      </button>

      {items.map((item, index) => (
        <div key={item.id} className={sharedStyles.itemContainer}>
          <div className={sharedStyles.itemHeader}>
            <span className={sharedStyles.itemTitle}>نظر {index + 1}</span>
            <button
              onClick={() => removeItem(item.id)}
              className={sharedStyles.removeButton}
              aria-label="حذف نظر"
            >
              ✕
            </button>
          </div>

          <div className={sharedStyles.itemBody}>
            <EditorField
              id={`testimonial-${item.id}-avatar`}
              label="آدرس آواتار"
              value={item.avatar}
              onChange={(v) => handleItemChange(index, "avatar", v)}
              placeholder="/avatars/avatar-1.png"
            />
            <EditorField
              id={`testimonial-${item.id}-name`}
              label="نام"
              value={item.name}
              onChange={(v) => handleItemChange(index, "name", v)}
              placeholder="نام کاربر"
            />
            <EditorField
              id={`testimonial-${item.id}-role`}
              label="نقش شغلی"
              value={item.role}
              onChange={(v) => handleItemChange(index, "role", v)}
              placeholder="مدیر محصول"
            />
            <EditorField
              id={`testimonial-${item.id}-quote`}
              label="متن نظر"
              value={item.quote}
              onChange={(v) => handleItemChange(index, "quote", v)}
              multiline
              placeholder="متن نظر کاربر"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsEditor;
