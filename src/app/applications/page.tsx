'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { getMyApplications } from '@/lib/data';
import type { SavedScheme } from '@/lib/types';

function ApplicationsBody() {
  const [rows, setRows] = useState<SavedScheme[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMyApplications()
      .then((r) => setRows(Array.isArray(r) ? r : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load applications.'));
  }, []);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!rows) return <Notice>Loading applications…</Notice>;
  if (rows.length === 0) return <Notice tone="empty">No applications in progress. Save a scheme to start tracking it.</Notice>;

  return (
    <ul className="space-y-3" data-nexen-id="nx-37531e7a-0">
      {rows.map((r) => (
        <li key={r.id} data-nexen-id="nx-37531e7a-1">
          <Link href={`/applications/${r.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary" data-nexen-id="nx-37531e7a-2">
            <span className="font-semibold" data-nexen-id="nx-37531e7a-3">{r.schemeName}</span>
            <span className="flex items-center gap-3 text-sm text-muted-foreground" data-nexen-id="nx-37531e7a-4">
              <Badge tone="primary" data-nexen-id="nx-37531e7a-5">{r.applicationStatus}</Badge>
              Updated {r.lastUpdated}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ApplicationsPage() {
  return (
    <main data-nexen-component="ApplicationsPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-37531e7a-6">
      <PageHeader eyebrow="Tracking" title="My applications" description="Update your status manually. AVASAR AI does not verify official application status." />
      <SignInRequired>
        <ApplicationsBody />
      </SignInRequired>
    </main>
  );
}
