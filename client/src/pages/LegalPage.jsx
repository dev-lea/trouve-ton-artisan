import { Helmet } from "react-helmet-async";

export default function LegalPage({ title }) {
  return (
    <main className="container py-5">
      <Helmet>
        <title>{title} — Trouve ton artisan</title>
        <meta name="description" content={`${title} — page en construction`} />
      </Helmet>

      <h1 className="page-title" style={{ marginBottom: 12 }}>{title}</h1>
      <p>Page en construction.</p>
    </main>
  );
}
