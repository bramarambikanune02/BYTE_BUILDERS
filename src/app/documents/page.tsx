'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { ProgressMeter } from '@/components/ProgressMeter';
import { SignInRequired } from '@/components/SignInRequired';
import { getMyChecklists } from '@/lib/data';
import type { ChecklistProgress } from '@/lib/types';

function DocumentsBody() {
  const [rows, setRows] = useState<ChecklistProgress[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyChecklists()
      .then((r) => setRows(Array.isArray(r) ? r : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load documents.'));
  }, []);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!rows) return <Notice>Loading document progress…</Notice>;
  if (rows.length === 0) return <Notice tone="empty">No checklists yet. Save a scheme to create one.</Notice>;

  const totalPrepared = rows.reduce((n, r) => n + r.prepared, 0);
  const total = rows.reduce((n, r) => n + r.total, 0);

  return (
    <div className="space-y-8">
      <ProgressMeter value={total ? (totalPrepared / total) * 100 : 0} label="Overall progress" />
      <ul className="space-y-3" data-nexen-id="nx-46c70de1-0">
        {rows.map((r) => (
          <li key={r.schemeId} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4" data-nexen-id="nx-46c70de1-1">
            <span className="font-semibold" data-nexen-id="nx-46c70de1-2">{r.schemeName}</span>
            <span className="flex items-center gap-4 text-sm text-muted-foreground" data-nexen-id="nx-46c70de1-3">
              {r.prepared} of {r.total} prepared
              <Link href="/document-checklist" className="font-semibold text-primary" data-nexen-id="nx-46c70de1-4">Open checklist</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <main data-nexen-component="DocumentsPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-46c70de1-5">
      <PageHeader eyebrow="Documents" title="Your document progress" description="See how far you have come with each saved scheme." />
      <SignInRequired>
        <DocumentsBody />
      </SignInRequired>
    </main>
  );
}
