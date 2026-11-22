'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readSessionName } from '@/lib/session';

// Role gate for student-only screens. Renders children only when a session exists.
export function SignInRequired({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(readSessionName()));
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!signedIn) {
    return (
      <section
        data-nexen-component="SignInRequired"
        className="mx-auto max-w-md rounded-lg border border-border bg-card p-8 text-center"
       data-nexen-id="nx-aee35abc-0">
        <h2 className="text-xl font-bold" data-nexen-id="nx-aee35abc-1">Sign in to continue</h2>
        <p className="mt-2 text-sm text-muted-foreground" data-nexen-id="nx-aee35abc-2">
          This page keeps your saved schemes, profile and applications private to you.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground"
         data-nexen-id="nx-aee35abc-3">
          Sign in
        </Link>
      </section>
    );
  }
  return <>{children}</>;
}
