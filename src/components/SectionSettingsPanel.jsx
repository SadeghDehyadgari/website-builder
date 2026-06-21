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
        {/* [EXISTING] Display section label or fallback */}
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
          // [FIXED] Changed prop name from 'sectionProps' to 'props' to match the destructuring in Editor components.
          // This prevents 'Cannot destructure property of undefined' crashes.
          <entry.Editor props={selected.props} onChange={handleChange} />
        ) : (
          <p style={{ color: "#9ca3af" }}>Click a section to edit</p>
        )}
      </div>
    </aside>
  );
}

export default SectionSettingsPanel;
