import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "../api";

/* utils */
function clamp01(x){ return Math.max(0, Math.min(1, x)); }

/* étoile à remplissage fractionnel */
function Star({ value, size = 22 }) {
  const d = "M12 2.8l3.02 6.12 6.76.98-4.89 4.76 1.16 6.86L12 17.9l-6.05 3.2 1.16-6.86-4.89-4.76 6.76-.98L12 2.8z";
  const pct = clamp01(value) * 100;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="grad">
          <stop offset={`${pct}%`} stopColor="#0074C7" />
          <stop offset={`${pct}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={d} fill="url(#grad)" stroke="#384050" strokeWidth="1" />
    </svg>
  );
}

function Rating({ note = 0 }) {
  const stars = [];
  for (let i = 0; i < 5; i++) stars.push(<Star key={i} value={note - i} />);
  return (
    <div className="rating">
      <span className="note">{Number(note).toFixed(1)}</span>
      {stars}
    </div>
  );
}

export default function Detail(){
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);

  const [form, setForm] = useState({ name:"", subject:"", message:"" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api.get(`/artisans/${id}`).then(r => setArtisan(r.data)).catch(console.error);
  }, [id]);

  async function onSubmit(e){
    e.preventDefault();
    setSending(true);
    try{
      await api.post(`/artisans/${id}/contact`, {
        name: form.name,
        email: "demo@example.com",
        subject: form.subject,
        message: form.message
      });
      setSent(true);
    }catch(err){ console.error(err); }
    finally{ setSending(false); }
  }

  if(!artisan) return <section className="container artisan-show"><p>Chargement…</p></section>;

  return (
    <section className="container artisan-show">
      <Helmet>
        <title>{artisan.name} — Trouve ton artisan</title>
        <meta
          name="description"
          content={`Artisan ${artisan.Speciality?.name ?? ""} à ${artisan.city} (${artisan.department}). Contactez-le via le formulaire.`}
        />
        <meta property="og:title" content={`${artisan.name} — Trouve ton artisan`} />
        <meta property="og:description" content={`Spécialité : ${artisan.Speciality?.name ?? "-"} — ${artisan.city} (${artisan.department}).`} />
      </Helmet>

      {/* En-tête centré */}
      <div className="artisan-header text-center">
        {/* Photo réduite */}
        {artisan.photo && (
          <img
            src={`/${artisan.photo}`}
            alt={`Photo de ${artisan.name}`}
            className="artisan-img"
            style={{ maxWidth: "180px", height: "auto", borderRadius: 8, margin: "0 auto 12px" }}
          />
        )}

        <h2 className="artisan-name">{artisan.name}</h2>
        <Rating note={artisan.rating || 0} />
        <p className="artisan-meta">Spécialité : {artisan.Speciality?.name || "-"}</p>
        <p className="artisan-meta">Localisation : {artisan.city} ({artisan.department})</p>

        {/* ====== À PROPOS (DESCRIPTION) ====== */}
        {artisan.about && (
          <div style={{ margin: "16px 0 20px" }}>
            <h3 className="page-title" style={{ fontSize: 20, marginBottom: 6 }}>
              À propos
            </h3>
            <p className="artisan-about">{artisan.about}</p>
          </div>
        )}

        {/* Bouton toujours visible */}
        {artisan.website ? (
          <a
            className="btn-pill-primary mt-2"
            href={artisan.website}
            target="_blank"
            rel="noreferrer"
          >
            Visiter son site internet
          </a>
        ) : (
          <Link className="btn-pill-primary mt-2" to="/site-non-trouve">
            Visiter son site internet
          </Link>
        )}
      </div>

      {/* Bloc formulaire */}
      <div className="artisan-contact">
        <h2 className="contact-title text-center">Envoyer un mail à cet artisan</h2>
        <p className="small text-muted text-center">
          Les Champs marqués d’un astérisque <span className="required-legend">*</span> sont requis
        </p>

        {sent ? (
          <p className="text-success text-center">Votre message a bien été envoyé.</p>
        ) : (
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label required">Nom</label>
              <input
                className="form-control pill"
                placeholder="Entrer votre nom"
                value={form.name}
                onChange={e=>setForm({...form, name:e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label required">Objet</label>
              <input
                className="form-control pill"
                placeholder="Objet"
                value={form.subject}
                onChange={e=>setForm({...form, subject:e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label required">Votre Message</label>
              <textarea
                rows="5"
                className="form-control textarea-less-round"
                placeholder="Taper votre message ici"
                value={form.message}
                onChange={e=>setForm({...form, message:e.target.value})}
                required
              />
            </div>

            <p className="small text-muted text-center">
              Les informations recueillies à partir de ce formulaire sont nécessaires aux services
              de la Région Auvergne-Rhône-Alpes pour la gestion de votre demande.
            </p>
            <p className="small text-center">
              <a href="#">Pour en savoir plus sur la gestion de vos données et vos droits.</a>
            </p>

            <div className="text-center">
              <button type="submit" className="btn-pill-primary" disabled={sending}>
                {sending ? "Envoi…" : "Envoyer"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
