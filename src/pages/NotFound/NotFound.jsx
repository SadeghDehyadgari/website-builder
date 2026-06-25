// src/pages/NotFound/NotFound.jsx
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

// [NEW] Simple and clean 404 page for undefined routes
function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>۴۰۴</h1>
      <p className={styles.message}>صفحه مورد نظر یافت نشد!</p>

      {/* Using <Link> instead of <button> for semantic HTML correctness */}
      <Link to="/" className={styles.link}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFound;
