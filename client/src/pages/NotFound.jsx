import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound(){
  return (
    <div className="container py-5 text-center">
      {/* Balises SEO pour la 404 */}
      <Helmet>
        <title>Page non trouvée — Trouve ton artisan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ fontSize: 90, color: "#cd2c2e", lineHeight: 1 }}>😢</div>
      <h1>Erreur 404</h1>
      <p>Page non trouvée…</p>
      
      {/* Bouton pilule personnalisé */}
      <Link to="/" className="btn-pill-return">
        Retour à l’accueil
      </Link>
    </div>
  );
}
