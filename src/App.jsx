// src/App.jsx
// [UPDATED] Migrated from legacy BrowserRouter to Data Router (createBrowserRouter)
// This is required to support the `useBlocker` hook in PageBuilder.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PageBuilder from "./pages/PageBuilder/PageBuilder";
import PublicView from "./pages/PublicView/PublicView";
import NotFound from "./pages/NotFound/NotFound";
// Import Functional Error Boundary for Data Router
import RootErrorBoundary from "./components/ErrorBoundary/RootErrorBoundary";

// [NEW] Define routes using the Data Router API with root-level error boundary
const router = createBrowserRouter([
  {
    // [NEW] Root-level error boundary catches all errors from child routes
    // This includes render errors, loader errors, and action errors
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/",
        element: <PublicView />,
      },
      {
        path: "/:slug",
        element: <PublicView />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/builder/:pageId",
        element: <PageBuilder />,
      },
      // Catch-all route for handling undefined paths (404 Not Found)
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* Toaster can be rendered outside the RouterProvider */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            direction: "rtl",
            fontFamily: "inherit",
          },
        }}
      />
      {/* [UPDATED] Replaced BrowserRouter and Routes with RouterProvider */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
