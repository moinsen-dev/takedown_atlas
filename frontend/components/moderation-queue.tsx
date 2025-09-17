"use client";

import { useEffect, useState } from "react";
import type { ModerationQueueEntry } from "@/types";

export function ModerationQueue({
  initialQueue,
}: {
  initialQueue: ModerationQueueEntry[];
}) {
  const [queue, setQueue] = useState(initialQueue);

  useEffect(() => {
    setQueue(initialQueue);
  }, [initialQueue]);

  return (
    <div className="space-y-4">
      {queue.map((item) => (
        <article
          key={item.submission.id}
          className="rounded-2xl border border-brand-slate/10 bg-white/80 p-6 shadow-sm"
        >
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-brand-dark">
                Submission {item.submission.id.slice(0, 8)}
              </p>
              <p className="text-xs text-brand-slate/70">
                Received {new Date(item.queue_received_at).toLocaleString()}
              </p>
            </div>
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
              {item.submission.status}
            </span>
          </header>
          <p className="mt-4 text-sm text-brand-slate/80">
            {item.submission.ai_summary ??
              "Awaiting AI-assisted summary. Review headers and redact PII."}
          </p>
          <footer className="mt-4 flex flex-wrap items-center gap-4 text-xs text-brand-slate/60">
            <span>Channel: {item.submission.channel}</span>
            <span>Platform: {item.submission.platform}</span>
            <span>Evidence count: {item.submission.evidence_count}</span>
            <span>Authenticity score: {item.authenticity_score ?? "N/A"}</span>
          </footer>
        </article>
      ))}
      {queue.length === 0 && (
        <p className="rounded-2xl border border-dashed border-brand-slate/20 bg-white/60 px-4 py-6 text-center text-sm text-brand-slate/70">
          Moderation queue is clear. New submissions will appear here once
          processed.
        </p>
      )}
    </div>
  );
}
