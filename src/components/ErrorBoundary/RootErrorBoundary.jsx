// src/components/ErrorBoundary/RootErrorBoundary.jsx
// [NEW] Functional Error Boundary for Data Router (React Router v6.4+)
// This component is specifically designed to work with createBrowserRouter
// and uses the useRouteError() hook to access error details.
import {
  useRouteError,
  useNavigate,
  isRouteErrorResponse,
} from "react-router-dom";
import Button from "../Button/Button";
import styles from "./ErrorBoundary.module.css";

const RootErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // [NEW] Command: Navigate to home page (CQS - no return value)
  const handleGoHome = () => {
    navigate("/");
  };

  // [NEW] Command: Reload the current page to retry (CQS - no return value)
  const handleRetry = () => {
    window.location.reload();
  };

  // [NEW] Tell, Don't Ask: Component decides what to render based on error type
  const renderErrorContent = () => {
    if (isRouteErrorResponse(error)) {
      return {
        title: `${error.status} ${error.statusText || "خطا"}`,
        description:
          error.data?.message ||
          "صفحه مورد نظر یافت نشد یا در دسترسی به آن خطایی رخ داده است.",
      };
    }

    if (error instanceof Error) {
      return {
        title: "خطایی رخ داد!",
        description: error.message || "متأسفانه یک خطای غیرمنتظره رخ داد.",
      };
    }

    return {
      title: "خطای ناشناخته",
      description: "یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.",
    };
  };

  const { title, description } = renderErrorContent();

  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.icon}>💥</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleGoHome}>
          بازگشت به صفحه اصلی
        </Button>
        <Button variant="secondary" onClick={handleRetry}>
          تلاش مجدد
        </Button>
      </div>

      {/* [NEW] Show error details only in Development environment for debugging */}
      {import.meta.env.DEV && error && (
        <details className={styles.errorDetails}>
          <summary>جزئیات خطا (مخصوص توسعه‌دهنده)</summary>
          <pre>
            {error instanceof Error
              ? `${error.toString()}\n\n${error.stack}`
              : JSON.stringify(error, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

export default RootErrorBoundary;
