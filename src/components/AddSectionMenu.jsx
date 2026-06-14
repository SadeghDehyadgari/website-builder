import { getAllSectionTypes, getSection } from "../sections/registry";

/**
 * AddSectionMenu — shows a button for each registered section type.
 *
 * Open-Closed: the button list is derived entirely from the registry.
 * Adding a new section type in registry.js automatically adds it here.
 *
 * @param {Function} props.onAdd - called with { id, type, props } when user clicks
 */
function AddSectionMenu({ onAdd }) {
  const sectionTypes = getAllSectionTypes();

  function handleAddSection(type) {
    const entry = getSection(type);
    if (entry) {
      onAdd({
        id: `section-${crypto.randomUUID()}`,
        type,
        props: { ...entry.defaultProps },
      });
    }
  }

  return (
    <div style={menuStyle}>
      {/* CHANGED: Persian label */}
      <p style={headingStyle}>افزودن سکشن</p>
      <ul style={listStyle}>
        {sectionTypes.map(({ type, label }) => (
          <li key={type} style={listItemStyle}>
            <button onClick={() => handleAddSection(type)} style={buttonStyle}>
              + {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styles (unchanged)
// ---------------------------------------------------------------------------

const menuStyle = {
  padding: "1rem",
};

const headingStyle = {
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#9ca3af",
  margin: "0 0 0.75rem",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

const listItemStyle = {
  margin: 0,
};

const buttonStyle = {
  width: "100%",
  textAlign: "right", // CHANGED: RTL alignment
  padding: "0.5rem 0.75rem",
  background: "none",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.875rem",
  color: "#374151",
  transition: "background 0.15s ease",
};

export default AddSectionMenu;
