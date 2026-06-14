import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PageRenderer from "./components/PageRenderer";
import AddSectionMenu from "./components/AddSectionMenu";
import SectionSettingsPanel from "./components/SectionSettingsPanel";
import useBuilderStore from "./store/builderStore";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import PageBuilder from "./pages/PageBuilder/PageBuilder";
// import PublicView from "./pages/PublicView/PublicView";

// Temporary test component for Stage 4 verification with Persian content
function Stage4Test() {
  const [sections, setSections] = useState([
    {
      id: "test-hero-1",
      type: "hero",
      props: {
        title: "به استودیو کاریار خوش آمدید",
        subtitle: "ساخت‌ساز وب‌سایت",
        description: "وب‌سایت‌های زیبا را به صورت بصری بسازید.",
        image: "https://placehold.co/600x400",
        ctaText: "شروع کنید",
        ctaLink: "#",
      },
    },
    {
      id: "test-features-1",
      type: "features",
      props: {
        title: "چرا ما را انتخاب کنید؟",
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
            title: "ایمن",
            description: "امنیت در سطح سازمانی",
          },
          {
            id: "f3",
            icon: "🎨",
            title: "زیبا",
            description: "طراحی زیبا به صورت پیش‌فرض",
          },
        ],
        ctaText: "بیشتر بدانید",
        ctaLink: "#",
      },
    },
  ]);

  const selectSection = useBuilderStore((state) => state.selectSection);

  const handleAddSection = (newSection) => {
    setSections((prev) => [...prev, newSection]);
  };

  const handleUpdateSections = (updatedSections) => {
    setSections(updatedSections);
  };

  const handleSectionClick = (section) => {
    selectSection(section.id);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left sidebar: AddSectionMenu */}
      <aside
        style={{
          width: "240px",
          borderLeft: "1px solid #e5e7eb", // RTL: border on left instead of right
          background: "#f9fafb",
        }}
      >
        <AddSectionMenu onAdd={handleAddSection} />
      </aside>

      {/* Main content: PageRenderer */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>
          تست مرحله ۴ — برای ویرایش روی هر سکشن کلیک کنید
        </h2>
        <PageRenderer
          sections={sections}
          isPreview={false}
          onSectionClick={handleSectionClick}
        />
      </main>

      {/* Right panel: SectionSettingsPanel */}
      <SectionSettingsPanel
        sections={sections}
        onSectionsChange={handleUpdateSections}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Temporary test route for Stage 4 */}
        <Route path="/test-stage4" element={<Stage4Test />} />

        {/* Original routes (commented out until later stages) */}
        {/* <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/builder/:pageId" element={<PageBuilder />} />
        <Route path="/:slug" element={<PublicView />} />
        <Route path="/" element={<PublicView />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
