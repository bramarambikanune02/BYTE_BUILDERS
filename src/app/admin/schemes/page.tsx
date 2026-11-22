'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { adminListSchemes } from '@/lib/data';
import type { Scheme } from '@/lib/types';

export default function AdminSchemesPage() {
  const [rows, setRows] = useState<Scheme[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminListSchemes()
      .then((r) => setRows(Array.isArray(r) ? r : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load schemes.'));
  }, []);

  return (
    <main data-nexen-component="AdminSchemesPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-09efb0b8-0">
      <PageHeader eyebrow="Admin" title="Scheme database" description="Review status and verification for every scheme." />
      <div className="flex justify-end">
        <Link href="/admin/schemes/new" className="inline-flex h-11 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-09efb0b8-1">New scheme</Link>
      </div>
      {error && <Notice tone="error">{error}</Notice>}
      {!error && !rows && <Notice>Loading schemes…</Notice>}
      {rows && rows.length === 0 && <Notice tone="empty">No schemes yet. Create the first one.</Notice>}
      {rows && rows.length > 0 && (
        <table className="w-full border-collapse text-sm" data-nexen-id="nx-09efb0b8-2">
          <thead data-nexen-id="nx-09efb0b8-3">
            <tr className="text-left text-muted-foreground" data-nexen-id="nx-09efb0b8-4">
              <th className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-5">Code</th>
              <th className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-6">Name</th>
              <th className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-7">Status</th>
              <th className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-8">Verification</th>
              <th className="border-b border-border p-3"  data-nexen-id="nx-09efb0b8-9"/>
            </tr>
          </thead>
          <tbody data-nexen-id="nx-09efb0b8-10">
            {rows.map((s) => (
              <tr key={s.id} data-nexen-id="nx-09efb0b8-11">
                <td className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-12"><code data-nexen-id="nx-09efb0b8-13">{s.code}</code></td>
                <td className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-14">{s.name}</td>
                <td className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-15"><Badge data-nexen-id="nx-09efb0b8-16">{s.status}</Badge></td>
                <td className="border-b border-border p-3" data-nexen-id="nx-09efb0b8-17">{s.verificationStatus}</td>
                <td className="border-b border-border p-3 text-right" data-nexen-id="nx-09efb0b8-18">
                  <Link href={`/admin/schemes/${s.id}`} className="font-semibold text-primary" data-nexen-id="nx-09efb0b8-19">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
