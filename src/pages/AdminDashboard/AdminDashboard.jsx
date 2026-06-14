// NEW FILE: AdminDashboard placeholder for Stage 5
// Will be fully implemented in Stage 6 (CRUD operations)

import { Link } from "react-router-dom";
// import styles from "./AdminDashboard.module.css"; // Optional, will be created later

function AdminDashboard() {
  // Temporary placeholder content
  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 داشبورد ادمین</h1>
      <p>این صفحه در مرحله ۶ تکمیل خواهد شد (مدیریت صفحات: لیست، ایجاد، حذف)</p>

      {/* TEMPORARY navigation link for testing routing */}
      <div style={{ marginTop: "2rem" }}>
        <Link to="/admin/builder/1">🔧 رفتن به صفحه‌ساز (موقت - pageId=1)</Link>
        <br />
        <Link to="/" style={{ marginTop: "1rem", display: "inline-block" }}>
          🏠 بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
