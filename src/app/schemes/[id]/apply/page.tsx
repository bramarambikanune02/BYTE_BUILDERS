'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { getScheme } from '@/lib/data';
import type { SchemeDetail } from '@/lib/types';

const STEPS = [
  'Review the eligibility requirements.',
  'Check the required documents.',
  'Visit the official application portal.',
  'Register or log in through the official website.',
  'Complete the required application information.',
  'Upload the requested documents.',
  'Review the application.',
  'Submit it through the official portal.',
  'Keep the application reference, if available.',
  'Track the progress using official information or your own updates.',
];

export default function ApplyGuidePage() {
  const { id } = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<SchemeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getScheme(id)
      .then(setScheme)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load this scheme.'));
  }, [id]);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!scheme) return <Notice>Loading application guide…</Notice>;

  return (
    <main data-nexen-component="ApplyGuidePage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-671ae09e-0">
      <PageHeader eyebrow="Application guide" title={`Applying for ${scheme.name}`} description="AVASAR AI does not submit applications. Follow these steps on the official portal." />
      <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-671ae09e-1">
        Open official portal
      </a>
      <ol className="space-y-3" data-nexen-id="nx-671ae09e-2">
        {STEPS.map((s, i) => (
          <li key={s} className="flex gap-4 rounded-lg border border-border bg-card p-4" data-nexen-id="nx-671ae09e-3">
            <span className="font-bold text-primary" data-nexen-id="nx-671ae09e-4">{i + 1}</span>
            <span className="text-sm" data-nexen-id="nx-671ae09e-5">{s}</span>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted-foreground" data-nexen-id="nx-671ae09e-6">
        Last verified {scheme.lastVerified ?? 'not yet'}. <Link href={`/schemes/${scheme.id}`} className="font-semibold text-primary" data-nexen-id="nx-671ae09e-7">Back to scheme details</Link>
      </p>
    </main>
  );
}
