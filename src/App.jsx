import { BrowserRouter, Routes } from "react-router-dom";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import PageBuilder from "./pages/PageBuilder/PageBuilder";
// import PublicView from "./pages/PublicView/PublicView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/builder/:pageId" element={<PageBuilder />} />
        <Route path="/:slug" element={<PublicView />} />
        <Route path="/" element={<PublicView />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
