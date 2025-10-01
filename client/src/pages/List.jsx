import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import ArtisanCard from "../components/ArtisanCard.jsx";

export default function List(){
  const [params, setParams] = useSearchParams();
  const [specs, setSpecs] = useState([]);
  const [rows, setRows] = useState([]);

  const search = params.get("search") || "";
  const specialityId = params.get("specialityId") || "";
  const department = params.get("department") || "";
  const category = params.get("category") || "";

  useEffect(() => {
    api.get("/specialities").then(r => setSpecs(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    api.get("/artisans", { params: { search, specialityId, department, category } })
       .then(r => setRows(r.data))
       .catch(console.error);
  }, [search, specialityId, department, category]);

  function update(k, v){
    const p = new URLSearchParams(params);
    v ? p.set(k, v) : p.delete(k);
    setParams(p);
  }

  function onChangeSpeciality(e){
    const value = e.target.value;
    const p = new URLSearchParams(params);
    if (value) p.set("specialityId", value);
    else {
      p.delete("specialityId");
      p.delete("category");
    }
    setParams(p);
  }

  return (
    <>
          <Helmet>
         <title>Liste des artisans — Trouve ton artisan</title>
         <meta
         name="description"
         content="Parcourez les artisans par spécialité, département ou mots-clés et contactez le professionnel de votre choix."
        />
          </Helmet>

      <section className="section-list py-4">
        {/* Titre aligné comme les cartes */}
        <h2 className="page-title mb-4">Liste des artisans</h2>

        {/* Filtres alignés avec la grille */}
        <div className="filters-bar mb-4">
          <div className="filters-row">
            <div className="filter-item">
              <label className="form-label filters-label">Mots clés</label>
              <input
                className="pill-input search-field"
                value={search}
                onChange={e=>update("search", e.target.value)}
                placeholder="Rechercher ..."
              />
            </div>
            <div className="filter-item">
              <label className="form-label filters-label">Spécialité</label>
              <select
                className="pill-select spec-select"
                value={specialityId}
                onChange={onChangeSpeciality}
              >
                <option value="">Toutes les spécialités</option>
                {specs.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label className="form-label filters-label">Département</label>
              <select
                className="pill-select dep-select"
                value={department}
                onChange={e=>update("department", e.target.value)}
              >
                <option value="">Tous les départements</option>
                {["Ain","Ardèche","Drôme","Isère","Rhône","Savoie","Haute-Savoie","Haute-Loire"].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grille des cartes centrée */}
        <div className="row g-3 justify-content-center">
          {rows.map(a => (
            <div key={a.id} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <ArtisanCard a={a} />
            </div>
          ))}
          {!rows.length && <p className="text-muted text-center">Aucun artisan trouvé.</p>}
        </div>
      </section>
    </>
  );
}
