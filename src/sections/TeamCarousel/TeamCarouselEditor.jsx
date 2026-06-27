// src/sections/TeamCarousel/TeamCarouselEditor.jsx
import { useState } from "react";
// [UPDATED] Import shared EditorField and styles (DRY principle)
import EditorField from "../../components/EditorField/EditorField";
import sharedStyles from "../../styles/editor-shared.module.css";
// [UPDATED] Import shared ID generator for consistency
import { generateId } from "../../utils/idGenerator";

/**
TeamCarouselEditor - Manages list of team members (avatar, name, role).
Command pattern: onChange(updatedData) — caller decides what to do.
@param {Object}   props.data     - current TeamCarousel data
@param {Function} props.onChange  - called with full updated data object
*/
const TeamCarouselEditor = ({ data, onChange }) => {
  const members = data.members || [];

  // [EXISTING] Local state for the "Add New" form is a "Draft" pattern.
  // It's acceptable here because we don't want to update the main data
  // until the user explicitly clicks "Add".
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
      id: generateId(), // [UPDATED] Use shared generateId()
      ...newMember,
    };
    onChange({
      ...data,
      members: [...members, newItem],
    });
    setNewMember({ avatar: "", name: "", role: "" });
  };

  const removeMember = (id) => {
    onChange({
      ...data,
      members: members.filter((m) => m.id !== id),
    });
  };

  const updateMember = (id, field, value) => {
    onChange({
      ...data,
      members: members.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    });
  };

  return (
    <div className={sharedStyles.editorContainer}>
      <h3 className={sharedStyles.editorTitle}>مدیریت تیم</h3>

      <EditorField
        id="team-title"
        label="عنوان سکشن"
        value={data.title}
        onChange={(v) => onChange({ ...data, title: v })}
        placeholder="عنوان بخش تیم"
      />

      <EditorField
        id="team-description"
        label="توضیحات (اختیاری)"
        value={data.description}
        onChange={(v) => onChange({ ...data, description: v })}
        placeholder="توضیح کوتاه درباره تیم"
      />

      <p className={sharedStyles.sectionSubtitle}>افزودن عضو جدید</p>

      <EditorField
        id="new-member-avatar"
        label="آدرس تصویر"
        value={newMember.avatar}
        onChange={(v) => setNewMember({ ...newMember, avatar: v })}
        placeholder="/avatars/example.png"
      />
      <EditorField
        id="new-member-name"
        label="نام"
        value={newMember.name}
        onChange={(v) => setNewMember({ ...newMember, name: v })}
        placeholder="نام عضو"
      />
      <EditorField
        id="new-member-role"
        label="سمت"
        value={newMember.role}
        onChange={(v) => setNewMember({ ...newMember, role: v })}
        placeholder="سمت عضو"
      />

      <button onClick={addMember} className={sharedStyles.addButton}>
        + افزودن عضو
      </button>

      <p className={sharedStyles.sectionSubtitle}>
        اعضای تیم ({members.length})
      </p>

      {members.length === 0 && (
        <p className={sharedStyles.hint}>هیچ عضوی اضافه نشده است.</p>
      )}

      {members.map((member) => (
        <div key={member.id} className={sharedStyles.itemContainer}>
          <div className={sharedStyles.itemBody}>
            <EditorField
              id={`member-${member.id}-avatar`}
              label="آدرس تصویر"
              value={member.avatar}
              onChange={(v) => updateMember(member.id, "avatar", v)}
              placeholder="/avatars/example.png"
            />
            <EditorField
              id={`member-${member.id}-name`}
              label="نام"
              value={member.name}
              onChange={(v) => updateMember(member.id, "name", v)}
              placeholder="نام عضو"
            />
            <EditorField
              id={`member-${member.id}-role`}
              label="سمت"
              value={member.role}
              onChange={(v) => updateMember(member.id, "role", v)}
              placeholder="سمت عضو"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.5rem",
              }}
            >
              <button
                onClick={() => removeMember(member.id)}
                className={sharedStyles.removeButton}
                aria-label="حذف عضو"
              >
                ✕ حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamCarouselEditor;
