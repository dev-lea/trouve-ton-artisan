import { Link } from "react-router-dom";
import logo from "/Logo.png"; // adapte le chemin si besoin

export default function Footer() {
  return (
    <footer className="site-footer site-footer--spec">
      <div className="container">

        {/* Ligne 1 : logo à gauche / adresse à droite */}
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img src={logo} alt="Trouve ton artisan !" />
          </div>

          <div className="site-footer__address">
            <h3 className="site-footer__city">Lyon</h3>
            <p className="site-footer__lines">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              +33 (0)4 26 73 40 00
            </p>
          </div>
        </div>

        {/* Ligne de séparation */}
        <hr className="site-footer__hr" />

        {/* Ligne 3 : liens */}
        <nav className="site-footer__links" aria-label="Liens légaux">
          <Link to="/donnees-personnelles">Données personnelles</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/accessibilite">Accessibilité</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/contact">Contact</Link>
        </nav>

      </div>
    </footer>
  );
}
