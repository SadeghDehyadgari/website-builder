// NEW FILE: PublicView placeholder for Stage 5
// Will be fully implemented in Stage 8 (render sections from API based on slug)

import { useParams, Link } from "react-router-dom";

function PublicView() {
  const { slug } = useParams();
  // If slug is undefined (root path "/"), default to "home"
  const currentSlug = slug || "home";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌐 نمای عمومی سایت</h1>
      <p>
        Slug فعلی: <strong>{currentSlug}</strong>
      </p>
      <p>این صفحه در مرحله ۸ تکمیل خواهد شد:</p>
      <ul>
        <li>فراخوانی داده‌های صفحه بر اساس slug از API</li>
        <li>
          رندر سکشن‌ها با <code>PageRenderer</code> در حالت{" "}
          <code>isPreview=true</code>
        </li>
        <li>بدون پنل ویرایش یا کلیک روی سکشن‌ها</li>
      </ul>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/admin">🔧 ورود به پنل ادمین</Link>
        <br />
        <Link to="/about">📄 نمونه صفحه about</Link>
        <br />
        <Link to="/contact">📞 نمونه صفحه contact</Link>
      </div>
    </div>
  );
}

export default PublicView;
