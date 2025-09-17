import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Takedown Atlas — Transparency for Removed Reviews',
  description:
    'Open-source platform to collect, verify, and visualize Google review removal notices.',
  openGraph: {
    title: 'Takedown Atlas',
    description:
      'Crowd-sourced transparency for Google review removal notices.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--brand-bg)] text-[var(--brand-slate)]">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-[var(--brand-slate)]/10 bg-white/60 backdrop-blur">
            <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3 text-brand-primary">
                <Image
                  src="/takedown-atlas-logo-primary.svg"
                  alt="Takedown Atlas"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <div>
                  <p className="text-lg font-semibold">Takedown Atlas</p>
                  <p className="text-sm text-brand-slate/80">Transparency for removed reviews</p>
                </div>
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium">
                <Link href="/incidents" className="hover:text-brand-primary">Map</Link>
                <Link href="/submit" className="hover:text-brand-primary">Submit</Link>
                <Link href="/admin" className="hover:text-brand-primary">Moderation</Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 bg-[var(--brand-bg)]">
            {children}
          </main>
          <footer className="border-t border-[var(--brand-slate)]/10 bg-white/60 text-sm text-brand-slate/70">
            <div className="mx-auto flex max-w-content flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between">
              <p>&copy; {new Date().getFullYear()} Takedown Atlas Collective</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/usage/brand-guidelines" className="hover:text-brand-primary">Brand</Link>
                <Link href="/license" className="hover:text-brand-primary">Licensing</Link>
                <Link href="/admin" className="hover:text-brand-primary">Notice &amp; Action</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
