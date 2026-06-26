import { getSection } from "../sections/registry";

/**
 * PageRenderer — renders an ordered list of sections for a page.
 *
 * Dependency Inversion Principle:
 *   This component depends on the registry abstraction, not on
 *   concrete section components. Adding a new section type requires
 *   zero changes here.
 *
 * @param {Array}    props.sections       - [{ id, type, props }]
 * @param {boolean}  [props.isPreview]    - when true, sections are not interactive
 * @param {Function} [props.onSectionClick] - called with section object when clicked (builder mode)
 */
function PageRenderer({ sections = [], isPreview = false, onSectionClick }) {
  if (sections.length === 0) {
    return <EmptySectionsPlaceholder isPreview={isPreview} />;
  }

  return (
    <main>
      {sections.map((section) => (
        <SectionWrapper
          key={section.id}
          section={section}
          isPreview={isPreview}
          onSectionClick={onSectionClick}
        />
      ))}
    </main>
  );
}

// ---------------------------------------------------------------------------
// Private sub-components
// ---------------------------------------------------------------------------

function SectionWrapper({ section, isPreview, onSectionClick }) {
  const entry = getSection(section.type);

  if (!entry) {
    return <UnknownSectionFallback type={section.type} isPreview={isPreview} />;
  }

  const { Component } = entry;

  const handleClick = () => {
    if (onSectionClick && !isPreview) {
      onSectionClick(section);
    }
  };

  return (
    <div
      data-section-id={section.id}
      data-section-type={section.type}
      onClick={handleClick}
      style={onSectionClick && !isPreview ? { cursor: "pointer" } : {}}
    >
      <Component {...section.props} />
    </div>
  );
}

function UnknownSectionFallback({ type, isPreview }) {
  return (
    <div
      style={{
        padding: "2rem",
        margin: "1rem",
        border: "2px dashed #f87171",
        borderRadius: "8px",
        color: "#ef4444",
        fontSize: "0.875rem",
        textAlign: "center",
        background: isPreview ? "transparent" : "#fef2f2", // در بیلدر پس‌زمینه قرمز کمرنگ داشته باشد
      }}
    >
      ⚠️ نوع سکشن ناشناخته: <strong>{type}</strong>
      {!isPreview && (
        <p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
          لطفاً این سکشن را حذف کنید.
        </p>
      )}
    </div>
  );
}

function EmptySectionsPlaceholder({ isPreview }) {
  if (!isPreview) return null;

  return (
    <div
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
        color: "#9ca3af",
        fontSize: "0.9rem",
      }}
    >
      {/* CHANGED: Persian text */}
      هنوز سکشنی اضافه نشده است. از منوی افزودن سکشن شروع کنید.
    </div>
  );
}

export default PageRenderer;
