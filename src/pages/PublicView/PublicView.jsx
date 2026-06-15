// NEW IMPLEMENTATION: Stage 8 - Public View
// Renders pages by slug using PageRenderer in preview mode.
// Uses usePage hook with slug parameter, LoadingSpinner, ErrorMessage.

import { useParams, Link } from "react-router-dom";
import { usePage } from "../../hooks/usePages";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageRenderer from "../../components/PageRenderer";

function PublicView() {
  // Get slug from URL params (e.g., "about" from "/about")
  const { slug: slugParam } = useParams();

  // Normalize slug to match db.json format:
  // - Root path → "/"
  // - Any other slug → prepend "/" (e.g., "about" → "/about")
  const slug = slugParam ? `/${slugParam}` : "/";

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
    <div style={{ padding: "1rem" }}>
      {/* Public page content - sections rendered non-editable */}
      <PageRenderer sections={page.sections} isPreview={true} />

      {/* Optional navigation links (kept from placeholder for convenience) */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/admin">🔧 ورود به پنل ادمین</Link>
      </div>
    </div>
  );
}

export default PublicView;
