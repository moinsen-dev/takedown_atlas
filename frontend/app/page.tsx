import Link from "next/link";
import { fetchLeaderboard } from "@/lib/api";

export default async function LandingPage() {
  const leaderboard = await fetchLeaderboard().catch(() => []);

  return (
    <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-16">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1 text-sm font-medium text-brand-primary">
            Neutral transparency reporting
          </span>
          <h1 className="text-4xl font-semibold text-brand-dark sm:text-5xl">
            Map and analyze Google review removal notices.
          </h1>
          <p className="text-lg leading-relaxed text-brand-slate/80">
            Takedown Atlas is an open-source observatory that crowdsources
            removal emails, verifies their authenticity, and visualizes patterns
            so communities can hold platforms and businesses accountable.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/submit"
              className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:bg-brand-primary/90"
            >
              Forward a notice
            </Link>
            <Link
              href="/incidents"
              className="rounded-full border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary/10"
            >
              Explore the map
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-brand-slate/10 bg-white/80 p-6 shadow-brand">
          <h2 className="text-lg font-semibold text-brand-dark">
            Why it matters
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-brand-slate/80">
            <li>
              <strong className="text-brand-dark">Investigate patterns:</strong>{" "}
              spot businesses or regions with repeated takedown activity.
            </li>
            <li>
              <strong className="text-brand-dark">Check authenticity:</strong>{" "}
              DKIM/DMARC verification is recorded for every published incident.
            </li>
            <li>
              <strong className="text-brand-dark">Protect privacy:</strong> PII
              is redacted before incidents go live and reporters stay
              pseudonymous.
            </li>
          </ul>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        {leaderboard.slice(0, 3).map((entry) => (
          <div
            key={entry.business_id}
            className="rounded-2xl border border-brand-slate/10 bg-white/80 p-6 shadow-sm"
          >
            <p className="text-sm uppercase tracking-wide text-brand-primary/80">
              High-velocity business
            </p>
            <p className="mt-3 text-xl font-semibold text-brand-dark">
              {entry.business_name}
            </p>
            <p className="mt-2 text-sm text-brand-slate/70">
              {entry.country ?? "Unknown location"}
            </p>
            <p className="mt-4 text-sm text-brand-slate/80">
              {entry.incident_count} incidents • Avg score{" "}
              {entry.incident_score_avg.toFixed(2)}
            </p>
            <Link
              href={`/businesses/${entry.business_id}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary"
            >
              View profile
            </Link>
          </div>
        ))}
        {leaderboard.length === 0 && (
          <div className="rounded-2xl border border-dashed border-brand-slate/20 bg-white/60 p-6 text-sm text-brand-slate/70">
            Leaderboard data will appear once incidents are verified.
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-brand-slate/10 bg-white/90 p-10 shadow-brand">
        <h2 className="text-2xl font-semibold text-brand-dark">
          How the pipeline works
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            "Forward notice",
            "Verify & redact",
            "Publish incident",
            "Report quarterly",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-brand-slate/10 bg-brand-bg/80 p-5 text-sm text-brand-slate/80"
            >
              <p className="text-3xl font-semibold text-brand-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 font-semibold text-brand-dark">{step}</p>
              <p className="mt-2 text-sm">
                {index === 0 &&
                  "Forward the Google removal email or upload the notice securely."}
                {index === 1 &&
                  "Moderators confirm headers and redact personal information."}
                {index === 2 &&
                  "Incidents appear on the public map with neutral summaries."}
                {index === 3 &&
                  "Aggregated insights feed transparency reports and datasets."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-10 text-brand-slate">
        <h2 className="text-2xl font-semibold text-brand-dark">
          Built for journalists, NGOs, and affected reviewers.
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-brand-dark">
              Researchers
            </h3>
            <p className="mt-2 text-sm text-brand-slate/80">
              Filter incidents, export anonymized CSV/JSON, and compare policy
              changes over time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-dark">Reporters</h3>
            <p className="mt-2 text-sm text-brand-slate/80">
              Track the status of your submission through a private link and
              retain ownership of your data.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-dark">
              Businesses
            </h3>
            <p className="mt-2 text-sm text-brand-slate/80">
              Claim your profile to provide context, post statements, and
              resolve disputes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
