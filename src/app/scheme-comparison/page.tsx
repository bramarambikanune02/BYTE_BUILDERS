'use client';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { getSchemes } from '@/lib/data';
import type { Scheme } from '@/lib/types';

const ROWS: { label: string; pick: (s: Scheme) => string }[] = [
  { label: 'Department', pick: (s) => s.department },
  { label: 'Classification', pick: (s) => s.level },
  { label: 'Education level', pick: (s) => s.educationLevel },
  { label: 'Verification', pick: (s) => s.verificationStatus },
  { label: 'Last verified', pick: (s) => s.lastVerified ?? 'Not yet' },
  { label: 'Official source', pick: (s) => s.officialUrl },
];

export default function SchemeComparisonPage() {
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSchemes()
      .then((rows) => setSchemes(Array.isArray(rows) ? rows : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load schemes.'));
  }, []);

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 3 ? [...p, id] : p));
  }

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!schemes) return <Notice>Loading schemes…</Notice>;

  const chosen = schemes.filter((s) => picked.includes(s.id));

  return (
    <main data-nexen-component="SchemeComparisonPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-99aa52a6-0">
      <PageHeader eyebrow="Compare" title="Compare schemes" description="Select up to three schemes to see them side by side." />
      <fieldset className="flex flex-wrap gap-3" data-nexen-id="nx-99aa52a6-1">
        <legend className="sr-only" data-nexen-id="nx-99aa52a6-2">Schemes to compare</legend>
        {schemes.map((s) => (
          <label key={s.id} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm" data-nexen-id="nx-99aa52a6-3">
            <input type="checkbox" checked={picked.includes(s.id)} onChange={() => toggle(s.id)}  data-nexen-id="nx-99aa52a6-4"/>
            {s.name}
          </label>
        ))}
      </fieldset>
      {chosen.length === 0 ? (
        <Notice tone="empty">Pick at least one scheme to start comparing.</Notice>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm" data-nexen-id="nx-99aa52a6-5">
            <thead data-nexen-id="nx-99aa52a6-6">
              <tr data-nexen-id="nx-99aa52a6-7">
                <th className="border border-border bg-muted/40 p-3 text-left" data-nexen-id="nx-99aa52a6-8">Field</th>
                {chosen.map((s) => (
                  <th key={s.id} className="border border-border bg-muted/40 p-3 text-left" data-nexen-id="nx-99aa52a6-9">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody data-nexen-id="nx-99aa52a6-10">
              {ROWS.map((row) => (
                <tr key={row.label} data-nexen-id="nx-99aa52a6-11">
                  <th scope="row" className="border border-border p-3 text-left font-semibold" data-nexen-id="nx-99aa52a6-12">{row.label}</th>
                  {chosen.map((s) => (
                    <td key={s.id} className="border border-border p-3" data-nexen-id="nx-99aa52a6-13">{row.pick(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
