// src/pages/AdminDashboard/PageForm.jsx
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./AdminDashboard.module.css";

// [NEW] Extracted shared form component to adhere to DRY principle.
// Co-located inside AdminDashboard folder since it's only used here.
// It manages its own internal input states (Single Responsibility)
// and delegates the submission logic to the parent (Tell, Don't Ask).
const PageForm = ({
  initialName,
  initialSlug,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}) => {
  // [NEW] Internal state for form inputs.
  // Initial values are passed via props.
  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);

  // [NEW] Command pattern: Prepares clean data and passes it to parent.
  // Parent decides what to do with it (Create or Update).
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: name.trim(), slug: slug.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="page-name">نام صفحه</label>
        <input
          id="page-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثال: درباره ما"
          disabled={isPending}
          autoFocus
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="page-slug">Slug (آدرس یکتا)</label>
        <input
          id="page-slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase())}
          placeholder="مثال: about-us"
          disabled={isPending}
          dir="ltr"
        />
        <small>فقط حروف انگلیسی، اعداد و خط تیره - بدون فاصله</small>
      </div>
      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          disabled={isPending}
        >
          انصراف
        </button>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? <LoadingSpinner /> : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PageForm;
