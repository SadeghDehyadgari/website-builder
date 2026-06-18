// src/sections/TeamCarousel/TeamCarouselEditor.jsx
// NEW: Editor for TeamCarousel – manage title, description, and member list.

import { useState } from "react";
import styles from "./TeamCarousel.module.css";

const TeamCarouselEditor = ({ props = {}, onChange }) => {
  const { title = "", description = "", members = [] } = props;

  const [newMember, setNewMember] = useState({
    avatar: "",
    name: "",
    role: "",
  });

  const addMember = () => {
    if (
      !newMember.avatar.trim() ||
      !newMember.name.trim() ||
      !newMember.role.trim()
    )
      return;
    const newItem = {
      id: `member-${Date.now()}`,
      ...newMember,
    };
    onChange({
      ...props,
      members: [...members, newItem],
    });
    setNewMember({ avatar: "", name: "", role: "" });
  };

  const removeMember = (id) => {
    onChange({
      ...props,
      members: members.filter((m) => m.id !== id),
    });
  };

  const updateMember = (id, field, value) => {
    onChange({
      ...props,
      members: members.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    });
  };

  return (
    <div className={styles.editorContainer}>
      <h4 className={styles.editorTitle}>مدیریت تیم</h4>

      <input
        type="text"
        placeholder="عنوان سکشن"
        value={title}
        onChange={(e) => onChange({ ...props, title: e.target.value })}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="توضیحات (اختیاری)"
        value={description}
        onChange={(e) => onChange({ ...props, description: e.target.value })}
        className={styles.input}
      />

      <div className={styles.addForm}>
        <input
          type="text"
          placeholder="آدرس تصویر (مثال: /avatars/aida.png)"
          value={newMember.avatar}
          onChange={(e) =>
            setNewMember({ ...newMember, avatar: e.target.value })
          }
          className={styles.input}
        />
        <input
          type="text"
          placeholder="نام"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="سمت"
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          className={styles.input}
        />
        <button onClick={addMember} className={styles.addButton}>
          اضافه کردن
        </button>
      </div>

      {members.length === 0 && (
        <p className={styles.emptyMessage}>هیچ عضوی اضافه نشده است.</p>
      )}

      {members.map((member) => (
        <div key={member.id} className={styles.memberEditor}>
          <input
            type="text"
            value={member.avatar}
            onChange={(e) => updateMember(member.id, "avatar", e.target.value)}
            className={styles.input}
            placeholder="آدرس تصویر"
          />
          <input
            type="text"
            value={member.name}
            onChange={(e) => updateMember(member.id, "name", e.target.value)}
            className={styles.input}
            placeholder="نام"
          />
          <input
            type="text"
            value={member.role}
            onChange={(e) => updateMember(member.id, "role", e.target.value)}
            className={styles.input}
            placeholder="سمت"
          />
          <button
            onClick={() => removeMember(member.id)}
            className={styles.removeButton}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default TeamCarouselEditor;
