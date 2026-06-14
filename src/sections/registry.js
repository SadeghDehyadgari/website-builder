import HeroSection from "./Hero/HeroSection";
import HeroEditor from "./Hero/HeroEditor";
import FeaturesSection from "./Features/FeaturesSection";
import FeaturesEditor from "./Features/FeaturesEditor";

/**
 * Section Registry — the heart of extensibility.
 *
 * Each entry maps a section type (string) to:
 *   - label:        human-readable name shown in AddSectionMenu
 *   - Component:    renders the section on the public page / builder preview
 *   - Editor:       renders the settings form inside SectionSettingsPanel
 *   - defaultProps: used when a new section of this type is added
 *
 * Open-Closed Principle: to add a new section type, add ONE entry here.
 * PageRenderer, AddSectionMenu, and SectionSettingsPanel need zero changes.
 */
const sectionRegistry = {
  hero: {
    label: "Hero",
    Component: HeroSection,
    Editor: HeroEditor,
    defaultProps: {
      title: "Your Title Here",
      subtitle: "Subtitle",
      description: "A short description of your page.",
      image: "",
      ctaText: "Get Started",
      ctaLink: "#",
    },
  },
  features: {
    label: "Features",
    Component: FeaturesSection,
    Editor: FeaturesEditor,
    defaultProps: {
      title: "Our Features",
      items: [
        {
          id: "f1",
          icon: "⚡",
          title: "Fast",
          description: "Lightning fast performance.",
        },
        {
          id: "f2",
          icon: "🔒",
          title: "Secure",
          description: "Enterprise-grade security.",
        },
        {
          id: "f3",
          icon: "🎨",
          title: "Beautiful",
          description: "Stunning out-of-the-box design.",
        },
      ],
      ctaText: "Learn More",
      ctaLink: "#",
    },
  },
  // Future sections (ProjectsCarousel, Testimonials, Footer, Process)
  // are added here without touching any other file.
};

/**
 * Returns the registry entry for a given section type.
 * Returns null (not throws) so callers can render a graceful fallback.
 *
 * @param {string} type
 * @returns {{ label, Component, Editor, defaultProps } | null}
 */
export function getSection(type) {
  return sectionRegistry[type] ?? null;
}

/**
 * Returns all registered section types as an array of { type, label }.
 * Used by AddSectionMenu to build its list dynamically.
 *
 * @returns {Array<{ type: string, label: string }>}
 */
export function getAllSectionTypes() {
  return Object.entries(sectionRegistry).map(([type, { label }]) => ({
    type,
    label,
  }));
}
