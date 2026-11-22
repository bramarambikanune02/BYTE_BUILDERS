'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { getApplication, updateApplication } from '@/lib/data';
import { APPLICATION_STATUSES, type Application, type ApplicationStatus } from '@/lib/types';

const REF_RE = /^[A-Za-z0-9/-]{0,40}$/;

function ApplicationBody({ id }: { id: string }) {
  const [app, setApp] = useState<Application | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null | undefined>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    getApplication(id)
      .then(setApp)
      .catch((e: unknown) => setLoadError(e instanceof Error ? e.message : 'Could not load application.'));
  }, [id]);

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const status = String(f.get('status') ?? '') as ApplicationStatus;
    const referenceNumber = String(f.get('referenceNumber') ?? '').trim();
    const notes = String(f.get('notes') ?? '');
    const next = {
      status: (APPLICATION_STATUSES as readonly string[]).includes(status) ? null : 'Choose a valid status.',
      referenceNumber: REF_RE.test(referenceNumber) ? null : 'Use letters, numbers, / or - (max 40).',
      notes: notes.length > 500 ? 'Notes must be 500 characters or fewer.' : null,
    };
    setErrors(next);
    setMessage(null);
    if (Object.values(next).some(Boolean)) return;
    try {
      const saved = await updateApplication(id, { applicationStatus: status, referenceNumber, notes });
      setApp(saved);
      setMessage('Application updated.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save.');
    }
  }

  if (loadError) return <Notice tone="error">{loadError}</Notice>;
  if (!app) return <Notice>Loading application…</Notice>;

  const updates = Array.isArray(app.updates) ? app.updates : [];

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
      <form onSubmit={onSave} noValidate className="space-y-4" data-nexen-id="nx-44f77b42-0">
        {message && <Notice>{message}</Notice>}
        <FormField id="status" label="Application status" error={errors.status}>
          <select id="status" name="status" defaultValue={app.applicationStatus} className={inputClass} data-nexen-id="nx-44f77b42-1">
            {APPLICATION_STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </FormField>
        <FormField id="referenceNumber" label="Reference number (if given)" error={errors.referenceNumber}>
          <input id="referenceNumber" name="referenceNumber" defaultValue={app.referenceNumber} className={inputClass}  data-nexen-id="nx-44f77b42-2"/>
        </FormField>
        <FormField id="notes" label="Notes" error={errors.notes} hint="Only for your own reference.">
          <textarea id="notes" name="notes" rows={4} defaultValue={app.notes} className="w-full rounded-lg border border-input bg-background p-3 text-sm"  data-nexen-id="nx-44f77b42-3"/>
        </FormField>
        <button type="submit" className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-44f77b42-4">Save progress</button>
      </form>
      <section className="space-y-3" data-nexen-id="nx-44f77b42-5">
        <h2 className="text-lg font-bold" data-nexen-id="nx-44f77b42-6">Status history</h2>
        {updates.length === 0 ? (
          <p className="text-sm text-muted-foreground" data-nexen-id="nx-44f77b42-7">No status changes recorded yet.</p>
        ) : (
          <ol className="space-y-2 text-sm" data-nexen-id="nx-44f77b42-8">
            {updates.map((u) => (
              <li key={u.id} className="rounded-md border border-border p-3" data-nexen-id="nx-44f77b42-9">{u.status} — {u.at}</li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <main data-nexen-component="ApplicationDetailPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-44f77b42-10">
      <PageHeader eyebrow="Application" title="Track your application" description="Choose a status when your progress changes." />
      <SignInRequired>
        <ApplicationBody id={id} />
      </SignInRequired>
    </main>
  );
}
