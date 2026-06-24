// src/sections/Testimonials/TestimonialsEditor.jsx
import { useState } from "react";
// [NEW] Import shared editor styles
import sharedStyles from "../../styles/editor-shared.module.css";

const TestimonialsEditor = ({ props, onChange }) => {
  const { title = "", description = "", items = [] } = props;

  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localItems, setLocalItems] = useState(items);

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

  const removeItem = (id) => {
    const updated = localItems.filter((item) => item.id !== id);
    setLocalItems(updated);
    updateParent(localTitle, localDescription, updated);
  };

  const updateItem = (id, field, value) => {
    const updated = localItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setLocalItems(updated);
    updateParent(localTitle, localDescription, updated);
  };

  return (
    // [CHANGED] Use sharedStyles for container
    <div className={sharedStyles.editorContainer}>
      <div className={sharedStyles.editorField}>
        <label>عنوان</label>
        <input
          type="text"
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="عنوان بخش"
        />
      </div>

      <div className={sharedStyles.editorField}>
        <label>توضیحات</label>
        <textarea
          value={localDescription}
          onChange={handleDescriptionChange}
          placeholder="توضیحات بخش"
          rows={3}
        />
      </div>

      <div className={sharedStyles.editorField}>
        <label>لیست نظرات</label>
        {/* [CHANGED] Use sharedStyles for button */}
        <button onClick={addItem} className={sharedStyles.addButton}>
          + افزودن نظر جدید
        </button>
      </div>

      {localItems.map((item, index) => (
        // [CHANGED] Use sharedStyles for item wrapper
        <div key={item.id} className={sharedStyles.itemEditor}>
          <div className={sharedStyles.itemHeader}>
            <span>نظر {index + 1}</span>
            {/* [CHANGED] Use sharedStyles for remove button */}
            <button
              onClick={() => removeItem(item.id)}
              className={sharedStyles.removeButton}
            >
              حذف
            </button>
          </div>

          {/* [CHANGED] Use sharedStyles for fields grid */}
          <div className={sharedStyles.itemFields}>
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
