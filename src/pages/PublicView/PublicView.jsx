// src/pages/PublicView/PublicView.jsx
// NEW IMPLEMENTATION: Stage 8 - Public View
// Renders pages by slug using PageRenderer in preview mode.
// Uses usePage hook with slug parameter, LoadingSpinner, ErrorMessage.
import { useParams, Link } from "react-router-dom";
import { usePage } from "../../hooks/usePages";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageRenderer from "../../components/PageRenderer";
// [NEW] Import CSS Module for styling
import styles from "./PublicView.module.css";

function PublicView() {
  // Get slug from URL params (e.g., "about" from "/about")
  const { slug: slugParam } = useParams();

  // CHANGED: Resolve slug for root path:
  // - If on root path ("/"), slugParam is undefined → use "home"
  // - Otherwise, use the actual slugParam (without leading slash, matching db.json)
  // This keeps the URL unchanged while using a safe value for json-server filtering.
  const slug = slugParam || "home";

  // Fetch page data based on slug using React Query
  const { data: page, isLoading, error } = usePage({ slug });

  // Show loading spinner while fetching
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  // Show error message if request failed or page not found
  if (error || !page) {
    return (
      <ErrorMessage message={error?.message || "صفحه مورد نظر یافت نشد."} />
    );
  }

  // Render public view with sections in preview mode (no editing)
  return (
    <>
      {/* Public page content - sections rendered non-editable */}
      <PageRenderer sections={page.sections} isPreview={true} />

      {/* [UPDATED] Optional navigation links with shine effect */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/admin" className={styles.adminLink}>
          ورود به پنل ادمین
        </Link>
      </div>
    </>
  );
}

export default PublicView;
