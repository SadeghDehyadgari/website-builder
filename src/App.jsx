// src/App.jsx
// [UPDATED] Migrated from legacy BrowserRouter to Data Router (createBrowserRouter)
// This is required to support the `useBlocker` hook in PageBuilder.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import page components for main routes
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PageBuilder from "./pages/PageBuilder/PageBuilder";
import PublicView from "./pages/PublicView/PublicView";

// [NEW] Define routes using the Data Router API
const router = createBrowserRouter([
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
