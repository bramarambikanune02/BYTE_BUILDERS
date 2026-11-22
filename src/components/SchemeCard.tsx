import Link from 'next/link';
import { EligibilityBadge } from '@/components/Badge';
import type { EligibilityStatus, Scheme } from '@/lib/types';

export function SchemeCard({ scheme, status }: { scheme: Scheme; status?: EligibilityStatus }) {
  return (
    <article
      data-nexen-component="SchemeCard"
      className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-sm"
     data-nexen-id="nx-5fe2bf07-0">
      <div className="flex items-center justify-between gap-2 text-xs">
        {status ? <EligibilityBadge status={status} /> : <span  data-nexen-id="nx-5fe2bf07-1"/>}
        <span className="text-muted-foreground" data-nexen-id="nx-5fe2bf07-2">{scheme.level}</span>
      </div>
      <h3 className="text-base font-bold leading-snug" data-nexen-id="nx-5fe2bf07-3">{scheme.name}</h3>
      <p className="text-sm text-muted-foreground" data-nexen-id="nx-5fe2bf07-4">{scheme.description}</p>
      <div className="grid gap-1 border-t border-border pt-3 text-xs text-muted-foreground">
        <span data-nexen-id="nx-5fe2bf07-5">{scheme.department}</span>
        <span data-nexen-id="nx-5fe2bf07-6">
          Verified{' '}
          <b className="text-foreground">{scheme.lastVerified ?? 'not yet'}</b> ·{' '}
          <code className="rounded bg-muted px-1" data-nexen-id="nx-5fe2bf07-7">{scheme.code}</code>
        </span>
        <span data-nexen-id="nx-5fe2bf07-8">Status: {scheme.verificationStatus}</span>
      </div>
      <Link
        href={`/schemes/${scheme.id}`}
        className="mt-auto inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-semibold"
       data-nexen-id="nx-5fe2bf07-9">
        View Details
      </Link>
    </article>
  );
}
