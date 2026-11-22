'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { getSavedSchemes, removeSavedScheme } from '@/lib/data';
import type { SavedScheme } from '@/lib/types';

function SavedBody() {
  const [items, setItems] = useState<SavedScheme[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSavedSchemes()
      .then((rows) => setItems(Array.isArray(rows) ? rows : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load saved schemes.'));
  }, []);

  async function remove(id: string) {
    await removeSavedScheme(id);
    setItems((rows) => (rows ?? []).filter((r) => r.id !== id));
  }

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!items) return <Notice>Loading saved schemes…</Notice>;
  if (items.length === 0) return <Notice tone="empty">Nothing saved yet. Save a scheme from its details page.</Notice>;

  return (
    <ul className="space-y-3" data-nexen-id="nx-72e99782-0">
      {items.map((s) => (
        <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4" data-nexen-id="nx-72e99782-1">
          <div>
            <Link href={`/schemes/${s.schemeId}`} className="font-semibold hover:text-primary" data-nexen-id="nx-72e99782-2">{s.schemeName}</Link>
            <div className="mt-1"><Badge tone="secondary" data-nexen-id="nx-72e99782-3">{s.applicationStatus}</Badge></div>
          </div>
          <button type="button" onClick={() => remove(s.id)} className="h-9 rounded-lg border border-border px-3 text-sm font-semibold" data-nexen-id="nx-72e99782-4">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function SavedSchemesPage() {
  return (
    <main data-nexen-component="SavedSchemesPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-72e99782-5">
      <PageHeader eyebrow="Saved" title="Saved schemes" description="Track each scheme and its application status." />
      <SignInRequired>
        <SavedBody />
      </SignInRequired>
    </main>
  );
}
