'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SchemeEligibilityPanel } from '@/components/SchemeEligibilityPanel';
import { getScheme, recordSchemeView, saveScheme } from '@/lib/data';
import { readSessionName } from '@/lib/session';
import type { SchemeDetail } from '@/lib/types';

export default function SchemeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<SchemeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(readSessionName()));
    getScheme(id)
      .then((s) => {
        setScheme(s);
        if (readSessionName()) void recordSchemeView(id).catch(() => undefined);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load this scheme.'));
  }, [id]);

  async function onSave() {
    try {
      await saveScheme(id);
      setSaveMsg('Saved. Track it under Saved Schemes.');
    } catch (e) {
      setSaveMsg(e instanceof Error ? e.message : 'Could not save this scheme.');
    }
  }

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!scheme) return <Notice>Loading scheme…</Notice>;

  const rules = Array.isArray(scheme.rules) ? scheme.rules : [];
  const documents = Array.isArray(scheme.documents) ? scheme.documents : [];
  const deadlines = Array.isArray(scheme.deadlines) ? scheme.deadlines : [];
  const faqs = Array.isArray(scheme.faqs) ? scheme.faqs : [];
  const gaps = Array.isArray(scheme.informationGaps) ? scheme.informationGaps : [];

  return (
    <main data-nexen-component="SchemeDetailPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-3f72c9ef-0">
      <PageHeader eyebrow={`${scheme.level} · ${scheme.code}`} title={scheme.name} description={scheme.description} />
      <div className="flex flex-wrap gap-2">
        <Badge tone="secondary" data-nexen-id="nx-3f72c9ef-1">{scheme.verificationStatus}</Badge>
        <Badge data-nexen-id="nx-3f72c9ef-2">Last verified {scheme.lastVerified ?? 'not yet'}</Badge>
        <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary" data-nexen-id="nx-3f72c9ef-3">Official source</a>
      </div>
      {saveMsg && <Notice>{saveMsg}</Notice>}
      <div className="flex flex-wrap gap-3">
        {signedIn ? (
          <button type="button" onClick={onSave} className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-3f72c9ef-4">Save scheme</button>
        ) : (
          <Link href="/login" className="inline-flex h-11 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-3f72c9ef-5">Sign in to save</Link>
        )}
        <Link href={`/schemes/${scheme.id}/apply`} className="inline-flex h-11 items-center rounded-lg border border-border px-5 font-semibold" data-nexen-id="nx-3f72c9ef-6">How to apply</Link>
        <Link href="/document-checklist" className="inline-flex h-11 items-center rounded-lg border border-border px-5 font-semibold" data-nexen-id="nx-3f72c9ef-7">Document checklist</Link>
      </div>

      <SchemeEligibilityPanel schemeId={scheme.id} />

      <section className="space-y-2" data-nexen-id="nx-3f72c9ef-8">
        <h2 className="text-lg font-bold" data-nexen-id="nx-3f72c9ef-9">Eligibility conditions</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm" data-nexen-id="nx-3f72c9ef-10">
          {rules.map((r) => (
            <li key={r.id} data-nexen-id="nx-3f72c9ef-11">
              {r.type === 'exclusion' ? 'Not eligible if: ' : ''}{r.label} <span className="text-muted-foreground" data-nexen-id="nx-3f72c9ef-12">({r.officialRuleRef})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2" data-nexen-id="nx-3f72c9ef-13">
        <h2 className="text-lg font-bold" data-nexen-id="nx-3f72c9ef-14">Required documents</h2>
        <ul className="space-y-2 text-sm" data-nexen-id="nx-3f72c9ef-15">
          {documents.map((d) => (
            <li key={d.id} className="rounded-md border border-border p-3" data-nexen-id="nx-3f72c9ef-16">
              <b>{d.name}</b> {d.mandatory ? '(mandatory)' : '(if applicable)'} — {d.explanation}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2" data-nexen-id="nx-3f72c9ef-17">
        <h2 className="text-lg font-bold" data-nexen-id="nx-3f72c9ef-18">Important dates</h2>
        <ul className="space-y-2 text-sm" data-nexen-id="nx-3f72c9ef-19">
          {deadlines.map((d) => (
            <li key={d.id} data-nexen-id="nx-3f72c9ef-20">
              {d.label}:{' '}
              {d.verified && d.date ? `${d.date} (verified ${d.verifiedDate})` : 'Deadline not confirmed. Check the official portal.'}
            </li>
          ))}
        </ul>
        {gaps.length > 0 && <Notice>Known information gaps: {gaps.join(' ')}</Notice>}
      </section>

      <section className="space-y-2" data-nexen-id="nx-3f72c9ef-21">
        <h2 className="text-lg font-bold" data-nexen-id="nx-3f72c9ef-22">Frequently asked questions</h2>
        {faqs.length === 0 ? (
          <p className="text-sm text-muted-foreground" data-nexen-id="nx-3f72c9ef-23">No FAQs published yet for this scheme.</p>
        ) : (
          <dl className="space-y-3" data-nexen-id="nx-3f72c9ef-24">
            {faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold" data-nexen-id="nx-3f72c9ef-25">{f.question}</dt>
                <dd className="text-sm text-muted-foreground" data-nexen-id="nx-3f72c9ef-26">{f.answer}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </main>
  );
}
