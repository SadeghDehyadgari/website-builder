// NEW FILE: PageBuilder placeholder for Stage 5
// Will be fully implemented in Stage 7 (visual builder with section registry)

import { useParams, Link } from "react-router-dom";

function PageBuilder() {
  const { pageId } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>✏️ صفحه‌ساز (Visual Builder)</h1>
      <p>
        شناسه صفحه: <strong>{pageId}</strong>
      </p>
      <p>این صفحه در مرحله ۷ تکمیل خواهد شد:</p>
      <ul>
        <li>
          نمایش سکشن‌های صفحه با <code>PageRenderer</code>
        </li>
        <li>
          منوی افزودن سکشن (<code>AddSectionMenu</code>)
        </li>
        <li>
          پنل تنظیمات سکشن (<code>SectionSettingsPanel</code>)
        </li>
        <li>ذخیره تغییرات با React Query</li>
        <li>دکمه‌های تغییر ترتیب (Reorder)</li>
      </ul>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/admin">← بازگشت به داشبورد ادمین</Link>
        <br />
        <Link to="/">🏠 صفحه اصلی</Link>
      </div>
    </div>
  );
}

export default PageBuilder;
