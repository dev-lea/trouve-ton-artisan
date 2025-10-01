import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { api } from "../api";
import ArtisanCard from "../components/ArtisanCard.jsx";

export default function Home() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    api.get("/artisans")
      .then(r => {
        // is_top peut être 1/0 (MySQL) ou true/false (Sequelize)
        const featured = r.data.filter(a => !!a.is_top).slice(0, 3);
        setTop(featured);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Helmet>
        <title>Trouve ton artisan — Accueil</title>
        <meta
          name="description"
          content="Trouvez un artisan de la région Auvergne-Rhône-Alpes et contactez-le facilement."
        />
      </Helmet>

      {/* ===== HERO Étapes ===== */}
      <section className="hero-steps">
        <div className="container">
          <div className="hero-inner">
            <h2 className="hero-title">
              Comment trouver<br />mon artisan ?
            </h2>

            <ol className="list-unstyled mb-0 d-flex flex-column gap-3">
              <li className="d-flex align-items-start">
                <span className="step-number me-2">1</span>
                Choisir la catégorie d’artisanat dans le menu.
              </li>
              <li className="d-flex align-items-start">
                <span className="step-number me-2">2</span>
                Choisir un artisan.
              </li>
              <li className="d-flex align-items-start">
                <span className="step-number me-2">3</span>
                Le contacter via le formulaire de contact.
              </li>
              <li className="d-flex align-items-start">
                <span className="step-number me-2">4</span>
                Obtention d’une réponse sous 48h.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ===== Section Artisans du mois ===== */}
      <section className="section-featured container">
        <h2 className="section-featured__title">Artisans du mois</h2>

        <div className="section-featured__grid">
          {top.map(a => (
            <ArtisanCard key={a.id} a={a} />
          ))}
          {top.length === 0 && (
            <p className="text-muted">Aucun artisan “du mois” trouvé.</p>
          )}
        </div>

        <div className="section-featured__cta">
          <Link to="/artisans" className="btn-pill-primary">
            Voir tous les artisans
          </Link>
        </div>
      </section>
    </>
  );
}
