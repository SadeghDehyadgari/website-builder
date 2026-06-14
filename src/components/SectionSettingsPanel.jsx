import { getSection } from "../sections/registry";
import useBuilderStore from "../store/builderStore";

/**
 * SectionSettingsPanel — slide-in panel that shows the Editor
 * for the currently selected section.
 *
 * Props:
 * @param {Array}    props.sections      - full sections array of the current page
 * @param {Function} props.onSectionsChange - called with updated sections array
 *
 * CQS: onSectionsChange is a command — the parent decides how to persist.
 * This panel only knows how to edit, not how to save.
 */
function SectionSettingsPanel({ sections, onSectionsChange }) {
  const { selectedSectionId, isPanelOpen, clearSelection } = useBuilderStore();

  const selectedSection = sections.find((s) => s.id === selectedSectionId);
  const registryEntry = selectedSection
    ? getSection(selectedSection.type)
    : null;

  // Update a single section's props and propagate the full sections array upward
  function handlePropsChange(updatedProps) {
    const updatedSections = sections.map((s) =>
      s.id === selectedSectionId ? { ...s, props: updatedProps } : s,
    );
    onSectionsChange(updatedSections);
  }

  return (
    <aside
      style={{
        ...panelStyle,
        transform: isPanelOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <PanelHeader
        title={registryEntry?.label ?? "تنظیمات"} // CHANGED: Persian fallback
        onClose={clearSelection}
      />

      <div style={{ padding: "1rem", overflowY: "auto", flex: 1 }}>
        {selectedSection && registryEntry ? (
          <registryEntry.Editor
            sectionProps={selectedSection.props}
            onChange={handlePropsChange}
          />
        ) : (
          // CHANGED: Persian placeholder
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
            برای ویرایش، روی یک سکشن کلیک کنید.
          </p>
        )}
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Private sub-components
// ---------------------------------------------------------------------------

function PanelHeader({ title, onClose }) {
  return (
    <div style={headerStyle}>
      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{title}</span>
      <button onClick={onClose} style={closeButtonStyle} title="بستن پنل">
        {" "}
        {/* CHANGED: Persian tooltip */}✕
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles (unchanged, but panel slides from right which is fine for RTL)
// ---------------------------------------------------------------------------

const panelStyle = {
  position: "fixed",
  top: 0,
  left: 0, // CHANGED: for RTL, panel should slide from left side? Actually original was right. Let's keep right for LTR but for RTL we want from left? Better to keep as is because direction:rtl flips expectations. But we'll keep original right for simplicity.
  // To be RTL-aware, we use 'right' and transform accordingly. Original: right:0, transform: translateX(100%) to hide offscreen-right.
  // In RTL, offscreen-right is still fine. So keep as is.
  right: 0,
  width: "320px",
  height: "100vh",
  background: "#fff",
  borderLeft: "1px solid #e5e7eb",
  boxShadow: "-4px 0 16px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.25s ease",
  zIndex: 100,
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#6b7280",
  fontSize: "1rem",
  lineHeight: 1,
};

export default SectionSettingsPanel;
