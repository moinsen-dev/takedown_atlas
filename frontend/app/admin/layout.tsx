export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white/90">
      <div className="border-b border-brand-slate/10 bg-brand-primary/10 px-6 py-4 text-sm text-brand-primary">
        Access requires a signed magic link. Actions are logged for DSA-style
        transparency.
      </div>
      {children}
    </section>
  );
}
