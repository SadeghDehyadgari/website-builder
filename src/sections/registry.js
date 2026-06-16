// src/sections/registry.js
// UPDATED: Replaced placeholder with real Testimonials component

import HeroSection from "./Hero/HeroSection";
import HeroEditor from "./Hero/HeroEditor";
import FeaturesSection from "./Features/FeaturesSection";
import FeaturesEditor from "./Features/FeaturesEditor";
import FooterSection from "./Footer/FooterSection";
import FooterEditor from "./Footer/FooterEditor";
// NEW import for Testimonials
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import TestimonialsEditor from "./Testimonials/TestimonialsEditor";

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
  // REPLACED: Real Testimonials component
  testimonials: {
    label: "نظرات مشتریان (Testimonials)",
    Component: TestimonialsSection,
    Editor: TestimonialsEditor,
    defaultProps: {
      title: "تجربه همکاری از نگاه مشتریان",
      description:
        "بخشی از تجربه کسانی که مسیر ساخت محصولاتشان را با ما شروع کردند.",
      items: [
        {
          id: "t1",
          avatar: "/avatars/avatar-1.png",
          name: "علی محمدی",
          role: "مدیر محصول در شرکت فناوری",
          quote:
            "کار با استودیو تیمی دقیق و قابل اعتماد. توی هر مرحله از پروژه، مسئله رو درست فهمیدن و برای ما یه مسیر واضح و قابل اجرا ساختن...",
        },
        {
          id: "t2",
          avatar: "/avatars/avatar-2.png",
          name: "سارا حسینی",
          role: "طراح ارشد",
          quote:
            "طراحی‌های فوق‌العاده و تیم بسیار حرفه‌ای. همکاری با کاریار استودیو یکی از بهترین تجربه‌های کاری من بود.",
        },
      ],
    },
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
