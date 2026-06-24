// ErrorMessage component for displaying fatal errors (full page or large area)
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <p className={styles.message}>{message || "خطایی رخ داده است"}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          تلاش مجدد
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
