import { BrowserRouter, Routes, Route } from "react-router-dom";
// NEW: Import page components for main routes (Stage 5)
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PageBuilder from "./pages/PageBuilder/PageBuilder";
import PublicView from "./pages/PublicView/PublicView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NEW: Main routes for the Website Builder application (Stage 5) */}
        {/* Public view with default slug (home) - exact path "/" */}
        <Route path="/" element={<PublicView />} />

        {/* Public view for any custom slug (e.g., /about, /contact) */}
        <Route path="/:slug" element={<PublicView />} />

        {/* Admin dashboard - list of pages with CRUD operations */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Visual builder for a specific page by its ID */}
        <Route path="/admin/builder/:pageId" element={<PageBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
