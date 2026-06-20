// src/sections/registry.js
// FULL REWRITE: Removed subtitle from Hero, added Banner without description

import HeroSection from "./Hero/HeroSection";
import HeroEditor from "./Hero/HeroEditor";
import FeaturesSection from "./Features/FeaturesSection";
import FeaturesEditor from "./Features/FeaturesEditor";
import FooterSection from "./Footer/FooterSection";
import FooterEditor from "./Footer/FooterEditor";
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import TestimonialsEditor from "./Testimonials/TestimonialsEditor";
import ProjectsCarouselSection from "./ProjectsCarousel/ProjectsCarouselSection";
import ProjectsCarouselEditor from "./ProjectsCarousel/ProjectsCarouselEditor";
import LogosStripSection from "./LogosStrip/LogosStripSection";
import LogosStripEditor from "./LogosStrip/LogosStripEditor";
import TeamCarouselSection from "./TeamCarousel/TeamCarouselSection";
import TeamCarouselEditor from "./TeamCarousel/TeamCarouselEditor";
import ProcessSection from "./Process/ProcessSection";
import ProcessEditor from "./Process/ProcessEditor";
// NEW: Banner imports
import BannerSection from "./Banner/BannerSection";
import BannerEditor from "./Banner/BannerEditor";

const sectionRegistry = {
  // UPDATED: Removed subtitle from Hero
  hero: {
    label: "بخش قهرمان (Hero)",
    Component: HeroSection,
    Editor: HeroEditor,
    defaultProps: {
      title: "عنوان شما اینجا قرار می‌گیرد",
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
      title: "کاریار استودیو، جایی که ایده‌ها به تجربه تبدیل می‌شوند.",
      items: [
        {
          id: "f1",
          icon: "/icons/card1.svg",
          title: "طراحی وب‌سایت حرفه‌ای",
          description:
            "طراحی اختصاصی با React، فریمورک‌های مدرن و تجربه کاربری عالی",
        },
        {
          id: "f2",
          icon: "/icons/card2.svg",
          title: "طراحی محصول",
          description:
            "از ایده تا نمونه اولیه تعاملی، با متدولوژی Design Thinking",
        },
      ],
      ctaText: "مشاهده خدمات",
      ctaLink: "/services",
    },
  },

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

  projectscarousel: {
    label: "پروژه‌ها (ProjectsCarousel)",
    Component: ProjectsCarouselSection,
    Editor: ProjectsCarouselEditor,
    defaultProps: {
      title: "پروژه‌هایی که برای ایجاد تجربه بهتر ساخته شده‌اند",
      autoplayInterval: 5000,
      slides: [
        {
          id: "p1",
          logo: "/logos/digikala.svg",
          title: "اپلیکیشن ماکاپ‌های پولی",
          description:
            "طراحی یک اپلیکیشن حرفه‌ای برای دریافت ماکاپ‌های پرمیوم.\nتمرکز بر تجربه کاربری روان، دسته‌بندی هوشمند و ارائه محتوای اختصاصی با کیفیت بالا.\nاشاره به دسترسی راحت و مطمئن طراحان به منابع پولی و حرفه‌ای.",
          image: "/mockups/digikala-mock.jpg",
        },
        {
          id: "p2",
          logo: "/logos/karyar.svg",
          title: "سایت رسمی کاریار",
          description:
            "سایت رسمی کاریار با رویکرد ماژولار و قابلیت شخصی‌سازی بالا.\nپیاده‌سازی سیستم builder اختصاصی برای مدیریت محتوا.",
          image: "/mockups/karyar-mock.jpg",
        },
        {
          id: "p3",
          logo: "/logos/akeep.svg",
          title: "مدیریت رمزهای عبور aKeep",
          description:
            "اپلیکیشن مدیریت رمزهای عبور با طراحی مینیمال و امنیت بالا.\nدریافت جایزه بهترین تجربه کاربری سال در جشنواره وب ایران.",
          image: "/mockups/akeep-mock.jpg",
        },
      ],
    },
  },

  logosstrip: {
    label: "نوار لوگوها (Logos Strip)",
    Component: LogosStripSection,
    Editor: LogosStripEditor,
    defaultProps: {
      logos: [
        { id: "logo-1", imageUrl: "/logos/digikala-logo.svg", alt: "دیجیکالا" },
        { id: "logo-2", imageUrl: "/logos/karyar-logo.svg", alt: "کاریار" },
        { id: "logo-3", imageUrl: "/logos/divar-logo.svg", alt: "دیوار" },
        { id: "logo-4", imageUrl: "/logos/sam-pars-logo.svg", alt: "سام پارس" },
        { id: "logo-5", imageUrl: "/logos/akeep.svg", alt: "aKeep" },
      ],
    },
  },

  teamcarousel: {
    label: "تیم ما (Team Carousel)",
    Component: TeamCarouselSection,
    Editor: TeamCarouselEditor,
    defaultProps: {
      title: "افرادی که به کاریار معنی می‌دهند",
      description: "تیم متخصص و خلاق ما در کنار شماست",
      members: [
        {
          id: "tm1",
          avatar: "/avatars/aida.png",
          name: "آیدا کریمی",
          role: "طراح ارشد UI/UX",
        },
        {
          id: "tm2",
          avatar: "/avatars/farnoosh.png",
          name: "فرنوش عباسی",
          role: "توسعه‌دهنده فرانت‌اند",
        },
        {
          id: "tm3",
          avatar: "/avatars/kian.png",
          name: "کیان رضایی",
          role: "مدیر پروژه",
        },
        {
          id: "tm4",
          avatar: "/avatars/mahtab.png",
          name: "مهتاب احمدی",
          role: "توسعه‌دهنده بک‌اند",
        },
        {
          id: "tm5",
          avatar: "/avatars/saman.png",
          name: "سامان نصیری",
          role: "متخصص DevOps",
        },
      ],
    },
  },

  process: {
    label: "روند تبدیل ایده به محصول (Process)",
    Component: ProcessSection,
    Editor: ProcessEditor,
    defaultProps: {
      title: "روند تبدیل ایده به محصول",
      description:
        "از ایده‌پردازی تا پیاده‌سازی نهایی، ما در هر قدم همراه شما هستیم.",
      ctaText: "شروع کنید",
      ctaLink: "#",
      desktopImage: "/images/process.svg",
      mobileImage: "/images/process-mobile.svg",
      alt: "روند تبدیل ایده به محصول",
    },
  },

  // NEW: Banner without description and textColor, uses secondary (orange) button
  banner: {
    label: "بنر تبلیغاتی (Banner)",
    Component: BannerSection,
    Editor: BannerEditor,
    defaultProps: {
      title: "با کاریار، ایده‌ها به واقعیت تبدیل می‌شوند",
      ctaText: "شروع کنید",
      ctaLink: "#",
      backgroundImage: "/images/banner.png",
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
