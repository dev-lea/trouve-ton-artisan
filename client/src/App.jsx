import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Detail from "./pages/Detail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LegalPage from "./pages/LegalPage.jsx";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artisans" element={<List />} />
          <Route path="/artisans/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
          <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
          <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
          <Route path="/cookies" element={<LegalPage title="Cookies" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
