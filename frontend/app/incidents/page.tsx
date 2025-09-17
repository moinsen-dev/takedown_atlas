import { fetchIncidents, fetchLeaderboard } from '@/lib/api';
import { IncidentsMap } from '@/components/incidents-map';
import { LeaderboardTable } from '@/components/leaderboard-table';

export default async function IncidentsPage() {
  const [incidents, leaderboard] = await Promise.all([
    fetchIncidents().catch(() => []),
    fetchLeaderboard().catch(() => [])
  ]);

  return (
    <div className="mx-auto flex max-w-content flex-col gap-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-brand-dark">Incident map</h1>
        <p className="text-sm text-brand-slate/80">
          Filter and inspect removal notices. Location precision depends on the data supplied by reporters and public business information.
        </p>
      </header>

      <IncidentsMap incidents={incidents} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-brand-dark">Leaderboard</h2>
          <p className="text-xs uppercase tracking-wide text-brand-slate/70">Incidents (last 6 months)</p>
        </div>
        <LeaderboardTable rows={leaderboard} />
      </section>
    </div>
  );
}
