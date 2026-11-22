'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EligibilityBadge } from '@/components/Badge';
import { Notice } from '@/components/Notice';
import { getEligibility } from '@/lib/data';
import type { EligibilityResult } from '@/lib/types';

// Explains the rule-based result. Official rule references are shown beside each item.
export function SchemeEligibilityPanel({ schemeId }: { schemeId: string }) {
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEligibility(schemeId)
      .then(setResult)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not check eligibility.'));
  }, [schemeId]);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!result) return <Notice>Checking your eligibility…</Notice>;

  const satisfied = Array.isArray(result.satisfied) ? result.satisfied : [];
  const unmet = Array.isArray(result.unmet) ? result.unmet : [];
  const missing = Array.isArray(result.missing) ? result.missing : [];

  return (
    <section data-nexen-component="SchemeEligibilityPanel" className="space-y-4 rounded-lg border border-border bg-card p-6" data-nexen-id="nx-b9f2de51-0">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold" data-nexen-id="nx-b9f2de51-1">Why you match</h2>
        <EligibilityBadge status={result.status} />
      </div>
      <p className="text-xs text-muted-foreground" data-nexen-id="nx-b9f2de51-2">
        Final decisions belong to the relevant government authority. Official rule: {result.officialRuleRef}
      </p>
      <ul className="space-y-1 text-sm" data-nexen-id="nx-b9f2de51-3">
        {satisfied.map((s) => (<li key={`s-${s}`} data-nexen-id="nx-b9f2de51-4">✓ {s}</li>))}
        {unmet.map((s) => (<li key={`u-${s}`} className="text-destructive" data-nexen-id="nx-b9f2de51-5">✗ {s}</li>))}
      </ul>
      {missing.length > 0 && (
        <div>
          <h3 className="font-semibold" data-nexen-id="nx-b9f2de51-6">Missing requirements</h3>
          <ul className="list-disc pl-5 text-sm" data-nexen-id="nx-b9f2de51-7">{missing.map((m) => (<li key={`m-${m}`} data-nexen-id="nx-b9f2de51-8">{m}</li>))}</ul>
        </div>
      )}
      <p className="rounded-md bg-muted/50 p-3 text-sm" data-nexen-id="nx-b9f2de51-9">
        <b>Next step:</b> {result.nextStep}{' '}
        <Link href={`/schemes/${schemeId}/apply`} className="font-semibold text-primary" data-nexen-id="nx-b9f2de51-10">See how to apply</Link>
      </p>
    </section>
  );
}
