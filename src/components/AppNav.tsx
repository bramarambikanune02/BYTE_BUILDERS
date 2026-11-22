'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '@/lib/data';
import { clearSession, readSessionName } from '@/lib/session';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/schemes', label: 'Discover Schemes' },
  { href: '/dashboard', label: 'My Dashboard' },
  { href: '/saved-schemes', label: 'Saved Schemes' },
  { href: '/applications', label: 'My Applications' },
  { href: '/documents', label: 'Documents' },
  { href: '/assistant', label: 'AI Assistant' },
];

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(readSessionName());
  }, [pathname]);

  async function handleSignOut() {
    try {
      await logout();
    } finally {
      clearSession();
      setName(null);
      router.push('/login');
    }
  }

  return (
    <header
      data-nexen-component="AppNav"
      className="sticky top-0 z-10 border-b border-border bg-card"
     data-nexen-id="nx-118d7771-0">
      <div className="mx-auto flex h-[4.25rem] max-w-[1120px] items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[1.1rem] font-bold tracking-wide text-primary" data-nexen-id="nx-118d7771-1">
          <img src="/nexen-logo.svg" alt="" width={26} height={26}  data-nexen-id="nx-118d7771-2"/>
          AVASAR AI
        </Link>
        <nav aria-label="Main" className="ml-auto hidden gap-5 text-sm text-muted-foreground md:flex" data-nexen-id="nx-118d7771-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? 'font-semibold text-foreground' : 'hover:text-foreground'}
             data-nexen-id="nx-118d7771-4">
              {l.label}
            </Link>
          ))}
        </nav>
        {name ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="ml-auto h-9 rounded-lg border border-border px-3.5 text-sm font-semibold md:ml-0"
           data-nexen-id="nx-118d7771-5">
            Sign out
          </button>
        ) : (
          <Link
            href="/login"
            className="ml-auto h-9 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground md:ml-0"
           data-nexen-id="nx-118d7771-6">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
