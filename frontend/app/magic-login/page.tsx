"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { requestMagicLink, verifyMagicLink } from "@/lib/api";
import { clearSession, saveSession } from "@/lib/session";

export default function MagicLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<string | null>(
    token ? "Validating magic link…" : null,
  );
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function handleMagicLink() {
      if (!token) {
        return;
      }
      try {
        const session = await verifyMagicLink(token);
        saveSession(session);
        setStatus("Login successful. Redirecting to moderation console…");
        setTimeout(() => router.push("/admin"), 1500);
      } catch (err) {
        clearSession();
        setStatus("Magic link invalid or expired. Request a new link.");
      }
    }

    handleMagicLink();
  }, [router, token]);

  async function handleRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await requestMagicLink({ email });
      setMessage("Magic link sent. Check your inbox.");
    } catch (err) {
      setMessage("Unable to send magic link.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold text-brand-dark">
        Magic link sign-in
      </h1>
      {status && <p className="text-sm text-brand-slate/80">{status}</p>}
      {!token && (
        <form onSubmit={handleRequest} className="w-full space-y-4 text-left">
          <label className="block text-sm font-medium text-brand-dark">
            Work email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none"
              placeholder="you@organization.org"
            />
          </label>
          <p className="text-xs text-brand-slate/70">
            New accounts receive researcher access by default. Request elevated
            access from an existing administrator.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Email me a magic link"}
          </button>
          {message && <p className="text-sm text-brand-slate/70">{message}</p>}
        </form>
      )}
    </div>
  );
}
