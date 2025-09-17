"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ModerationQueue } from "@/components/moderation-queue";
import { fetchModerationQueue } from "@/lib/api";
import { clearSession, getSessionRole, getSessionToken } from "@/lib/session";
import type { ModerationQueueEntry } from "@/types";

export default function AdminPage() {
  const [queue, setQueue] = useState<ModerationQueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  async function loadQueue() {
    const token = getSessionToken();
    if (!token) {
      setNeedsAuth(true);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchModerationQueue(token);
      setQueue(data);
      setNeedsAuth(false);
      setError(null);
    } catch (err) {
      setError("Unable to load moderation queue.");
      if (err instanceof Error && err.message.includes("401")) {
        clearSession();
        setNeedsAuth(true);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRole(getSessionRole());
    loadQueue();
  }, []);

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-brand-dark">
          Moderation console
        </h1>
        <p className="text-sm text-brand-slate/80">
          Review submissions, confirm authenticity, and publish anonymized
          incidents. All actions are logged for transparency and auditing.
        </p>
      </header>
      <section className="mt-10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-brand-dark">In review</h2>
          <button
            type="button"
            onClick={loadQueue}
            className="rounded-full border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary hover:bg-brand-primary/10"
          >
            Refresh
          </button>
        </div>
        {needsAuth && (
          <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-6 py-5 text-sm text-brand-slate/80">
            <p className="font-semibold text-brand-dark">Access restricted</p>
            <p className="mt-2">
              Request a magic link to the email associated with your verifier or
              admin account.
            </p>
            <Link
              href="/magic-login"
              className="mt-4 inline-flex text-brand-primary underline"
            >
              Go to magic login
            </Link>
          </div>
        )}
        {error && !needsAuth && (
          <p className="rounded-2xl border border-red-400/40 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {!needsAuth && !loading && !error && (
          <ModerationQueue initialQueue={queue} />
        )}
        {loading && (
          <p className="text-sm text-brand-slate/70">
            Loading moderation queue…
          </p>
        )}
        {role && !needsAuth && (
          <p className="text-xs text-brand-slate/60">Signed in as: {role}</p>
        )}
      </section>
    </div>
  );
}
