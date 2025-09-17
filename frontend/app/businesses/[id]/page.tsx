import Link from "next/link";
import { fetchBusinessProfile, fetchIncidents } from "@/lib/api";

export default async function BusinessPage({
  params,
}: {
  params: { id: string };
}) {
  const [profile, incidents] = await Promise.all([
    fetchBusinessProfile(params.id),
    fetchIncidents({ business_id: params.id }).catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <Link
        href="/incidents"
        className="text-sm text-brand-primary hover:underline"
      >
        ← Back to incidents
      </Link>
      <header className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-brand-dark">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-brand-slate/80">
            {profile.address ?? "Address not provided"}
          </p>
          <p className="text-sm text-brand-slate/70">
            {profile.country ?? "Unknown country"}
          </p>
        </div>
        <div className="rounded-2xl border border-brand-slate/10 bg-white/80 px-6 py-4 text-sm">
          <p className="font-semibold text-brand-dark">Incident summary</p>
          <p className="mt-2 text-brand-slate/80">
            Total incidents: {profile.incident_count}
          </p>
          <p className="text-brand-slate/80">
            Last reported:{" "}
            {profile.last_incident_at
              ? new Date(profile.last_incident_at).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </header>
      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-brand-dark">
          Published incidents
        </h2>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <article
              key={incident.id}
              className="rounded-2xl border border-brand-slate/10 bg-white/80 p-6 text-sm text-brand-slate/80 shadow-sm"
            >
              <header className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-brand-dark">
                  {new Date(incident.incident_date).toLocaleDateString()}
                </p>
                <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                  {incident.reason_code ?? "Unspecified reason"}
                </span>
              </header>
              <p className="mt-4 text-brand-slate/80">
                {incident.summary ?? "Summary pending moderation."}
              </p>
              <footer className="mt-4 flex flex-wrap items-center gap-4 text-xs text-brand-slate/60">
                <span>
                  Incident score: {incident.incident_score.toFixed(2)}
                </span>
                <span>Country: {incident.country ?? "—"}</span>
              </footer>
            </article>
          ))}
          {incidents.length === 0 && (
            <p className="rounded-2xl border border-dashed border-brand-slate/20 bg-white/70 px-4 py-6 text-center text-sm text-brand-slate/70">
              No incidents have been published for this business yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
