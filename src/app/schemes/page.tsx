'use client';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SchemeCard } from '@/components/SchemeCard';
import { getSchemes } from '@/lib/data';
import type { Scheme, SchemeLevel, SchemeStatus } from '@/lib/types';

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[] | null>(null);
  const [q, setQ] = useState('');
  const [level, setLevel] = useState<SchemeLevel | ''>('');
  const [status, setStatus] = useState<SchemeStatus | ''>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getSchemes({
      q: q || undefined,
      level: level || undefined,
      status: status || undefined,
    })
      .then((rows) => {
        if (!cancelled) setSchemes(Array.isArray(rows) ? rows : []);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Could not load schemes.');
      });
    return () => {
      cancelled = true;
    };
  }, [q, level, status]);

  return (
    <main data-nexen-component="SchemesPage" className="mx-auto max-w-[1120px] px-6 py-10" data-nexen-id="nx-9fe7648a-0">
      <PageHeader
        eyebrow="Discover"
        title="Government schemes"
        description="Search schemes by name or code. You can explore without completing your profile."
      />
      <form className="mb-8 grid gap-3 md:grid-cols-[2fr_1fr_1fr]" onSubmit={(e) => e.preventDefault()} data-nexen-id="nx-9fe7648a-1">
        <label className="sr-only" htmlFor="scheme-search" data-nexen-id="nx-9fe7648a-2">Search schemes</label>
        <input id="scheme-search" type="search" placeholder="Search by name or code" value={q} onChange={(e) => setQ(e.target.value)} className="h-11 rounded-lg border border-input bg-background px-3"  data-nexen-id="nx-9fe7648a-3"/>
        <label className="sr-only" htmlFor="level" data-nexen-id="nx-9fe7648a-4">Classification</label>
        <select id="level" value={level} onChange={(e) => setLevel(e.target.value as SchemeLevel | '')} className="h-11 rounded-lg border border-input bg-background px-3" data-nexen-id="nx-9fe7648a-5">
          <option value="">All levels</option>
          <option value="Central">Central</option>
          <option value="State">State</option>
        </select>
        <label className="sr-only" htmlFor="status" data-nexen-id="nx-9fe7648a-6">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as SchemeStatus | '')} className="h-11 rounded-lg border border-input bg-background px-3" data-nexen-id="nx-9fe7648a-7">
          <option value="">Any status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="uncertain">Uncertain</option>
          <option value="outdated">Outdated</option>
        </select>
      </form>

      {error && <Notice tone="error">{error}</Notice>}
      {!error && !schemes && <Notice>Loading schemes…</Notice>}
      {schemes && schemes.length === 0 && <Notice tone="empty">No schemes match these filters. Try a broader search.</Notice>}
      {schemes && schemes.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((s) => (
            <SchemeCard key={s.id} scheme={s} />
          ))}
        </div>
      )}
    </main>
  );
}
