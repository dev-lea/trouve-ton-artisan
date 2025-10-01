import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Header() {
  const [cats, setCats] = useState([]);
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);   // <-- burger
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { api.get("/categories").then(r => setCats(r.data || [])); }, []);

  function onSearch(e){
    e.preventDefault();
    const term = q.trim();
    setMenuOpen(false); // referme le panneau sur mobile
    if (!term) navigate("/artisans");
    else navigate(`/artisans?search=${encodeURIComponent(term)}`);
  }

  // lit ?category=... pour l'état actif
  const sp = new URLSearchParams(location.search);
  const activeCat = sp.get("category");

  return (
    <header className="site-header--spec">
      <div className="container header-layout">

        {/* Logo */}
        <div className="header-logo">
          <Link to="/" className="brand-logo" onClick={()=>setMenuOpen(false)}>
            <img src="/Logo.png" alt="Trouve ton artisan" />
          </Link>
        </div>

        {/* Bouton burger visible seulement en mobile (géré en CSS) */}
        <button
          className="burger"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={()=>setMenuOpen(v=>!v)}
        >
          <span></span><span></span><span></span>
        </button>

        {/* À droite : recherche + menu (panneau masqué en mobile) */}
        <div className={`header-right ${menuOpen ? "is-open" : ""}`}>
          {/* Recherche */}
          <form onSubmit={onSearch} className="header-search" role="search">
            <div className="search-pill">
              <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#0074C7" strokeWidth="2"/>
                <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="#0074C7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                className="search-input"
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Rechercher un artisan"
              />
            </div>
          </form>

          {/* Menu catégories */}
          <nav className="header-nav">
            <ul className="nav gap-5">
              {cats.map(c => {
                const isActive = activeCat === String(c.id);
                return (
                  <li key={c.id} className="nav-item">
                    <Link
                      to={`/artisans?category=${c.id}`}
                      className={`nav-link nav-link--ink${isActive ? " active" : ""}`}
                      onClick={()=>setMenuOpen(false)}  // ferme le panneau après clic
                    >
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

      </div>
    </header>
  );
}
