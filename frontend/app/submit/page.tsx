"use client";

import { useState } from "react";
import { submitNotice } from "@/lib/api";

function encodeBase64(text: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export default function SubmitPage() {
  const [email, setEmail] = useState("");
  const [rawNotice, setRawNotice] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const payload = {
        reporter_email: email,
        raw_notice: encodeBase64(rawNotice),
        channel: "upload",
        consent_public_dataset: true,
        consent_contact: false,
      };
      const response = await submitNotice(payload);
      setStatus(`Submitted! Save your status token: ${response.status_token}`);
    } catch (error) {
      setStatus("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-brand-dark">
        Submit a removal notice
      </h1>
      <p className="mt-3 text-sm text-brand-slate/80">
        Forward the removal email by pasting the headers and body below.
        Moderators will verify authenticity before anything goes public.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm font-medium text-brand-dark">
          Contact email
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="mt-2 w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none"
            placeholder="you@example.com"
          />
        </label>
        <label className="block text-sm font-medium text-brand-dark">
          Paste the full removal email (.eml or plain text)
          <textarea
            required
            value={rawNotice}
            onChange={(event) => setRawNotice(event.target.value)}
            rows={12}
            className="mt-2 w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none"
            placeholder="Include headers if possible so we can verify authenticity."
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-brand hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit notice securely"}
        </button>
      </form>
      {status && (
        <p className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 text-sm text-brand-dark">
          {status}
        </p>
      )}
    </div>
  );
}
