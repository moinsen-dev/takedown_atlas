import type { IncidentLeaderboardEntry } from "@/types";

export function LeaderboardTable({
  rows,
}: {
  rows: IncidentLeaderboardEntry[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-slate/10 bg-white/80">
      <table className="min-w-full divide-y divide-brand-slate/10 text-sm">
        <thead className="bg-brand-bg/70 text-left text-xs font-semibold uppercase tracking-wide text-brand-slate/70">
          <tr>
            <th className="px-6 py-4">Business</th>
            <th className="px-6 py-4">Country</th>
            <th className="px-6 py-4">Incidents</th>
            <th className="px-6 py-4">Avg score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-slate/10">
          {rows.map((row) => (
            <tr key={row.business_id} className="hover:bg-brand-bg/80">
              <td className="px-6 py-4 font-medium text-brand-dark">
                {row.business_name}
              </td>
              <td className="px-6 py-4 text-brand-slate/70">
                {row.country ?? "—"}
              </td>
              <td className="px-6 py-4 text-brand-slate/80">
                {row.incident_count}
              </td>
              <td className="px-6 py-4 text-brand-slate/80">
                {row.incident_score_avg.toFixed(2)}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-6 text-center text-brand-slate/70"
              >
                No incidents published yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
