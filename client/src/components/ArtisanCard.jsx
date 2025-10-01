import { Link } from "react-router-dom";

/* Petite fonction utilitaire : clamp entre 0 et 1 */
function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

/* Composant étoile (plein, demi, quart, vide, etc.) */
function Star({ value, size = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="star"
    >
      <defs>
        <linearGradient id={`grad-${value}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${value * 100}%`} stopColor="currentColor" />
          <stop offset={`${value * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 6.9L12 17l-6.2 3.8 1.6-6.9L2 9.2l7.1-.6L12 2z"
        fill={`url(#grad-${value})`}
        stroke="#384050"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function ArtisanCard({ a }) {
  const rating = Number(a.rating || 0);

  return (
    <article className="card artisan--featured">
      {/* Nom de l’artisan */}
      <h3 className="artisan-title">{a.name}</h3>

      {/* Note + étoiles */}
      <div className="rating">
        <span className="small">{rating.toFixed(1)}</span>
        <div
          className="d-flex"
          style={{ gap: 6 }}
          aria-label={`${rating.toFixed(1)} sur 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const value = clamp01(rating - i);
            return <Star key={i} value={value} size={22} />;
          })}
        </div>
      </div>

      {/* Description */}
      {a.about && <p className="mb-2">{a.about}</p>}

      {/* Spécialité */}
      {a.Speciality?.name && (
        <p className="mb-1" style={{ fontWeight: 500 }}>
          {a.Speciality.name}
        </p>
      )}

      {/* Ville — Département */}
      {(a.city || a.department) && (
        <p className="meta mb-0">
          {a.city || ""}
          {a.city && a.department ? " — " : ""}
          {a.department || ""}
        </p>
      )}

      {/* Flèche vers fiche artisan */}
      <Link
        to={`/artisans/${a.id}`}
        className="arrow-link"
        aria-label="Voir la fiche artisan"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12h12M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </article>
  );
}
