// src/sections/Testimonials/TestimonialsEditor.jsx
// NEW FILE: Editor for Testimonials section

import { useState } from "react";
import styles from "./Testimonials.module.css";

/**
 * Editor for Testimonials section.
 * Allows editing title, description, and managing testimonial items.
 */
const TestimonialsEditor = ({ props, onChange }) => {
  const { title = "", description = "", items = [] } = props;

  // Local state for form fields
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localItems, setLocalItems] = useState(items);

  // Update parent when any change occurs
  const updateParent = (newTitle, newDesc, newItems) => {
    onChange({
      title: newTitle,
      description: newDesc,
      items: newItems,
    });
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setLocalTitle(val);
    updateParent(val, localDescription, localItems);
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setLocalDescription(val);
    updateParent(localTitle, val, localItems);
  };

  // Add a new testimonial item
  const addItem = () => {
    const newItem = {
      id: `t${Date.now()}`,
      avatar: "/avatars/avatar-1.png",
      name: "نام کاربر",
      role: "نقش شغلی",
      quote: "متن نظر کاربر",
    };
    const updated = [...localItems, newItem];
    setLocalItems(updated);
    updateParent(localTitle, localDescription, updated);
  };

  // Remove an item by id
  const removeItem = (id) => {
    const updated = localItems.filter((item) => item.id !== id);
    setLocalItems(updated);
    updateParent(localTitle, localDescription, updated);
  };

  // Update a specific field of an item
  const updateItem = (id, field, value) => {
    const updated = localItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setLocalItems(updated);
    updateParent(localTitle, localDescription, updated);
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorField}>
        <label>عنوان</label>
        <input
          type="text"
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="عنوان بخش"
        />
      </div>

      <div className={styles.editorField}>
        <label>توضیحات</label>
        <textarea
          value={localDescription}
          onChange={handleDescriptionChange}
          placeholder="توضیحات بخش"
          rows={3}
        />
      </div>

      <div className={styles.editorField}>
        <label>لیست نظرات</label>
        <button onClick={addItem} className={styles.addButton}>
          + افزودن نظر جدید
        </button>
      </div>

      {localItems.map((item, index) => (
        <div key={item.id} className={styles.itemEditor}>
          <div className={styles.itemHeader}>
            <span>نظر {index + 1}</span>
            <button
              onClick={() => removeItem(item.id)}
              className={styles.removeButton}
            >
              حذف
            </button>
          </div>

          <div className={styles.itemFields}>
            <div>
              <label>آدرس آواتار</label>
              <input
                type="text"
                value={item.avatar || ""}
                onChange={(e) => updateItem(item.id, "avatar", e.target.value)}
                placeholder="/avatars/avatar-1.png"
              />
            </div>
            <div>
              <label>نام</label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
                placeholder="نام کاربر"
              />
            </div>
            <div>
              <label>نقش شغلی</label>
              <input
                type="text"
                value={item.role || ""}
                onChange={(e) => updateItem(item.id, "role", e.target.value)}
                placeholder="مدیر محصول"
              />
            </div>
            <div>
              <label>متن نظر</label>
              <textarea
                value={item.quote || ""}
                onChange={(e) => updateItem(item.id, "quote", e.target.value)}
                placeholder="متن نظر کاربر"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsEditor;
