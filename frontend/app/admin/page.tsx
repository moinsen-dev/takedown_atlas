import { fetchModerationQueue } from '@/lib/api';
import { ModerationQueue } from '@/components/moderation-queue';

export default async function AdminPage() {
  const queue = await fetchModerationQueue().catch(() => []);

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-brand-dark">Moderation console</h1>
        <p className="text-sm text-brand-slate/80">
          Review submissions, confirm authenticity, and publish anonymized incidents. All actions are logged for transparency and auditing.
        </p>
      </header>
      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-semibold text-brand-dark">In review</h2>
        <ModerationQueue initialQueue={queue} />
      </section>
    </div>
  );
}
