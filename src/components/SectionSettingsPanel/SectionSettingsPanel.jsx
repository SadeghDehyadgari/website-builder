// src/components/SectionSettingsPanel/SectionSettingsPanel.jsx
import { useMemo } from "react";
import { getSection } from "../../sections/registry";
import useBuilderStore from "../../store/builderStore";
import styles from "./SectionSettingsPanel.module.css";

function SectionSettingsPanel({ sections, onUpdateSection }) {
  const { selectedSectionId, isPanelOpen, clearSelection } = useBuilderStore();
  const selected = useMemo(
    () => sections.find((s) => s.id === selectedSectionId),
    [sections, selectedSectionId],
  );
  const entry = selected ? getSection(selected.type) : null;

  // [EXISTING] Command: Update section props (no return value - CQS)
  const handleChange = (newProps) => {
    if (selectedSectionId) onUpdateSection(selectedSectionId, newProps);
  };

  // [EXISTING] Defensive Programming: Fallback chain for props
  // 1. Use existing props from the section
  // 2. Fallback to defaultProps from registry if props is missing/undefined
  // 3. Final fallback to an empty object to prevent crashes
  // This prevents "Cannot read properties of undefined" crashes when loading legacy or incomplete data
  const editorProps = selected?.props || entry?.defaultProps || {};

  return (
    <aside className={`${styles.panel} ${isPanelOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <span className={styles.title}>{entry?.label ?? "Settings"}</span>
        <button
          onClick={clearSelection}
          className={styles.closeBtn}
          aria-label="بستن پنل"
        >
          ✕
        </button>
      </div>
      <div className={styles.content}>
        {selected && entry ? (
          // [EXISTING] Using the safe 'editorProps' variable instead of directly passing selected.props
          <entry.Editor props={editorProps} onChange={handleChange} />
        ) : (
          <p className={styles.emptyText}>Click a section to edit</p>
        )}
      </div>
    </aside>
  );
}

export default SectionSettingsPanel;
