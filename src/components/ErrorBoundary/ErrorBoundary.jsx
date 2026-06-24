// src/components/ErrorBoundary/ErrorBoundary.jsx
// [UPDATED] NOTE: This Class-based ErrorBoundary is kept for backward compatibility
// and for use cases OUTSIDE of Data Router (e.g., wrapping specific components).
// For Data Router error handling, use RootErrorBoundary.jsx instead.
// See: https://reactrouter.com/en/main/route/error-element
import React from "react";
import Button from "../Button/Button";
import styles from "./ErrorBoundary.module.css";
// [EXISTING] Global Error Boundary component using Class Component (required for componentDidCatch)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // [EXISTING] State to track if an error occurred and store error details
    this.state = { hasError: false, error: null };
  }
  // [EXISTING] Static method to update state before re-rendering (triggers Fallback UI)
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  // [EXISTING] Lifecycle method to log error details (e.g., to Sentry or console)
  componentDidCatch(error, errorInfo) {
    console.error("🔥 ErrorBoundary caught an error:", error, errorInfo);
    // [EXISTING] In production: logErrorToService(error, errorInfo);
  }
  // [EXISTING] Command: Reset error state to retry rendering (no return value - CQS)
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };
  // [EXISTING] Command: Navigate user back to home page (no return value - CQS)
  handleGoHome = () => {
    window.location.href = "/";
  };
  render() {
    // [EXISTING] If an error occurred, render Fallback UI (Tell, Don't Ask - component decides what to render)
    if (this.state.hasError) {
      return (
        <div className={styles.fallbackContainer}>
          <div className={styles.icon}>💥</div>
          <h1 className={styles.title}>خطایی رخ داد!</h1>
          <p className={styles.description}>
            متأسفانه یک خطای غیرمنتظره در نمایش صفحه رخ داد. لطفاً صفحه را رفرش
            کنید یا به صفحه اصلی بازگردید.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" onClick={this.handleGoHome}>
              بازگشت به صفحه اصلی
            </Button>
            <Button variant="secondary" onClick={this.handleReset}>
              تلاش مجدد
            </Button>
          </div>
          {/* [EXISTING] Show error details only in Development environment for debugging */}
          {import.meta.env.DEV && this.state.error && (
            <details className={styles.errorDetails}>
              <summary>جزئیات خطا (مخصوص توسعه‌دهنده)</summary>
              <pre>{this.state.error.toString()}</pre>
            </details>
          )}
        </div>
      );
    }
    // [EXISTING] If no error, render children normally
    return this.props.children;
  }
}
export default ErrorBoundary;
