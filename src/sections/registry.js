import React from "react";
import HeroSection from "./Hero/HeroSection";
import HeroEditor from "./Hero/HeroEditor";
import FeaturesSection from "./Features/FeaturesSection";
import FeaturesEditor from "./Features/FeaturesEditor";

// Temporary placeholder components for missing sections (Stage 9 will replace)
const PlaceholderSection = ({ type }) => {
  return React.createElement(
    "div",
    {
      style: {
        padding: "2rem",
        textAlign: "center",
        border: "1px dashed #ccc",
      },
    },
    "⚠️ سکشن ",
    type,
    " در حال توسعه است",
  );
};

const PlaceholderEditor = () =>
  React.createElement("div", null, "ویرایشگر این سکشن به زودی اضافه می‌شود");

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
    label: "بخش قهرمان (Hero)",
    Component: HeroSection,
    Editor: HeroEditor,
    defaultProps: {
      title: "عنوان شما اینجا قرار می‌گیرد",
      subtitle: "زیرعنوان",
      description: "توضیح کوتاهی درباره صفحه شما.",
      image: "",
      ctaText: "شروع کنید",
      ctaLink: "#",
    },
  },
  features: {
    label: "ویژگی‌ها (Features)",
    Component: FeaturesSection,
    Editor: FeaturesEditor,
    defaultProps: {
      title: "ویژگی‌های ما",
      items: [
        {
          id: "f1",
          icon: "⚡",
          title: "سریع",
          description: "عملکرد فوق‌العاده سریع",
        },
        {
          id: "f2",
          icon: "🔒",
          title: "امن",
          description: "امنیت در سطح سازمانی",
        },
        {
          id: "f3",
          icon: "🎨",
          title: "زیبا",
          description: "طراحی شگفت‌انگیز آماده استفاده",
        },
      ],
      ctaText: "بیشتر بدانید",
      ctaLink: "#",
    },
  },
  // Temporary placeholders for missing sections (Stage 9 will replace)
  testimonials: {
    label: "نظرات مشتریان (Testimonials)",
    Component: () =>
      React.createElement(PlaceholderSection, { type: "نظرات مشتریان" }),
    Editor: PlaceholderEditor,
    defaultProps: { items: [] },
  },
  footer: {
    label: "فوتر (Footer)",
    Component: () => React.createElement(PlaceholderSection, { type: "فوتر" }),
    Editor: PlaceholderEditor,
    defaultProps: { copyright: "© ۱۴۰۴ - تمامی حقوق محفوظ است", links: [] },
  },
};

/**
 * Returns the registry entry for a given section type.
 * Case-insensitive: converts input type to lowercase.
 *
 * @param {string} type
 * @returns {{ label, Component, Editor, defaultProps } | null}
 */
export function getSection(type) {
  if (!type) return null;
  const normalizedType = type.toLowerCase();
  return sectionRegistry[normalizedType] ?? null;
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
