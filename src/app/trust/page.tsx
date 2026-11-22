import { PageHeader } from '@/components/PageHeader';

const STATUSES = [
  ['Verified from official source', 'Information was checked against an official government source.'],
  ['Requires re-verification', 'The source may have changed. Check the official link before relying on it.'],
  ['Deadline not confirmed', 'No verified deadline. Check the official portal for the current window.'],
  ['Application currently closed', 'The application window is closed for the current cycle.'],
  ['Information incomplete', 'Some details are missing. The gaps are listed on each scheme.'],
];

export default function TrustPage() {
  return (
    <main data-nexen-component="TrustPage" className="mx-auto max-w-[760px] space-y-8 px-6 py-10" data-nexen-id="nx-dcbdc05f-0">
      <PageHeader
        eyebrow="Trust"
        title="How we show scheme information"
        description="Every scheme shows its official source, responsible department, last verified date and any known gaps."
      />
      <section className="space-y-3" data-nexen-id="nx-dcbdc05f-1">
        <h2 className="text-lg font-bold" data-nexen-id="nx-dcbdc05f-2">Verification statuses</h2>
        <dl className="space-y-3" data-nexen-id="nx-dcbdc05f-3">
          {STATUSES.map(([label, desc]) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4">
              <dt className="font-semibold" data-nexen-id="nx-dcbdc05f-4">{label}</dt>
              <dd className="mt-1 text-sm text-muted-foreground" data-nexen-id="nx-dcbdc05f-5">{desc}</dd>
            </div>
          ))}
        </dl>
      </section>
      <p className="text-sm text-muted-foreground" data-nexen-id="nx-dcbdc05f-6">
        AVASAR AI is an independent informational assistance service. It is not an official government website, does not submit
        applications and does not verify application status. Final eligibility and approval decisions belong to the relevant
        government authority.
      </p>
    </main>
  );
}
