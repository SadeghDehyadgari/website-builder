// src/components/SectionSettingsPanel.jsx
import { getSection } from "../sections/registry";
import useBuilderStore from "../store/builderStore";

function SectionSettingsPanel({ sections, onUpdateSection }) {
  const { selectedSectionId, isPanelOpen, clearSelection } = useBuilderStore();
  const selected = sections.find((s) => s.id === selectedSectionId);
  const entry = selected ? getSection(selected.type) : null;

  const handleChange = (newProps) => {
    if (selectedSectionId) onUpdateSection(selectedSectionId, newProps);
  };

  // [FIX] Defensive Programming: Fallback chain for props
  // 1. Use existing props from the section
  // 2. Fallback to defaultProps from registry if props is missing/undefined
  // 3. Final fallback to an empty object to prevent crashes
  // This prevents "Cannot read properties of undefined" crashes when loading legacy or incomplete data
  const editorProps = selected?.props || entry?.defaultProps || {};

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "360px",
        height: "100vh",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "4px 0 16px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        zIndex: 9999,
        transform: isPanelOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <span style={{ fontWeight: 600 }}>{entry?.label ?? "Settings"}</span>
        <button
          onClick={clearSelection}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          ✕
        </button>
      </div>
      <div style={{ padding: "1rem", overflowY: "auto", flex: 1 }}>
        {selected && entry ? (
          // [FIXED] Using the safe 'editorProps' variable instead of directly passing selected.props
          <entry.Editor props={editorProps} onChange={handleChange} />
        ) : (
          <p style={{ color: "#9ca3af" }}>Click a section to edit</p>
        )}
      </div>
    </aside>
  );
}

export default SectionSettingsPanel;
