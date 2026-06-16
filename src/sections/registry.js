// registry.js - updated footer defaultProps with correct copyright text
import React from "react";
import HeroSection from "./Hero/HeroSection";
import HeroEditor from "./Hero/HeroEditor";
import FeaturesSection from "./Features/FeaturesSection";
import FeaturesEditor from "./Features/FeaturesEditor";
import FooterSection from "./Footer/FooterSection";
import FooterEditor from "./Footer/FooterEditor";

// Placeholders (same as before)
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
  testimonials: {
    label: "نظرات مشتریان (Testimonials)",
    Component: () =>
      React.createElement(PlaceholderSection, { type: "نظرات مشتریان" }),
    Editor: PlaceholderEditor,
    defaultProps: { items: [] },
  },
  footer: {
    label: "فوتر (Footer)",
    Component: FooterSection,
    Editor: FooterEditor,
    defaultProps: {
      logo: "/logos/karyar-studio-logo.svg",
      socialLinks: [
        { icon: "/icons/Instagram-icon.svg", url: "https://instagram.com" },
        { icon: "/icons/LinkedIn-icon.svg", url: "https://linkedin.com" },
        { icon: "/icons/WhatsApp-icon.svg", url: "https://wa.me/1234567890" },
      ],
      copyrightText:
        "تمام حقوق محتوای این سایت متعلق به شرکت کاریار استودیو است.",
    },
  },
};

export function getSection(type) {
  if (!type) return null;
  const normalizedType = type.toLowerCase();
  return sectionRegistry[normalizedType] ?? null;
}

export function getAllSectionTypes() {
  return Object.entries(sectionRegistry).map(([type, { label }]) => ({
    type,
    label,
  }));
}
