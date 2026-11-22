'use client';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { ProgressMeter } from '@/components/ProgressMeter';
import { getSavedSchemes, getSchemeChecklist, updateChecklistItem } from '@/lib/data';
import type { ChecklistItem, SavedScheme } from '@/lib/types';

function ChecklistBody() {
  const [schemes, setSchemes] = useState<SavedScheme[]>([]);
  const [schemeId, setSchemeId] = useState<string>('');
  const [items, setItems] = useState<ChecklistItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSavedSchemes()
      .then((rows) => {
        const list = Array.isArray(rows) ? rows : [];
        setSchemes(list);
        if (list[0]) setSchemeId(list[0].schemeId);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load schemes.'));
  }, []);

  useEffect(() => {
    if (!schemeId) return;
    setItems(null);
    getSchemeChecklist(schemeId)
      .then((rows) => setItems(Array.isArray(rows) ? rows : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load checklist.'));
  }, [schemeId]);

  async function toggle(item: ChecklistItem) {
    const next = item.status === 'prepared' ? 'pending' : 'prepared';
    const saved = await updateChecklistItem(item.id, next);
    setItems((rows) => (rows ?? []).map((r) => (r.id === saved.id ? saved : r)));
  }

  if (error) return <Notice tone="error">{error}</Notice>;
  if (schemes.length === 0) return <Notice tone="empty">Save a scheme to build its document checklist.</Notice>;

  const list = items ?? [];
  const prepared = list.filter((i) => i.status === 'prepared').length;

  return (
    <div className="space-y-6">
      <label htmlFor="scheme" className="text-sm font-semibold" data-nexen-id="nx-4f6c55be-0">Scheme</label>
      <select id="scheme" value={schemeId} onChange={(e) => setSchemeId(e.target.value)} className="h-11 w-full max-w-md rounded-lg border border-input bg-background px-3" data-nexen-id="nx-4f6c55be-1">
        {schemes.map((s) => (<option key={s.id} value={s.schemeId}>{s.schemeName}</option>))}
      </select>
      {items === null ? (
        <Notice>Loading checklist…</Notice>
      ) : (
        <>
          <ProgressMeter value={list.length ? (prepared / list.length) * 100 : 0} label={`${prepared} of ${list.length} prepared`} />
          <ul className="space-y-3" data-nexen-id="nx-4f6c55be-2">
            {list.map((item) => (
              <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-card p-4" data-nexen-id="nx-4f6c55be-3">
                <div className="space-y-1">
                  <p className="font-semibold" data-nexen-id="nx-4f6c55be-4">{item.documentName}</p>
                  <p className="text-sm text-muted-foreground" data-nexen-id="nx-4f6c55be-5">{item.explanation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={item.status === 'prepared' ? 'primary' : 'warn'} data-nexen-id="nx-4f6c55be-6">{item.status}</Badge>
                  <button type="button" onClick={() => toggle(item)} className="h-9 rounded-lg border border-border px-3 text-sm font-semibold" data-nexen-id="nx-4f6c55be-7">
                    Mark {item.status === 'prepared' ? 'pending' : 'prepared'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function DocumentChecklistPage() {
  return (
    <main data-nexen-component="DocumentChecklistPage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-4f6c55be-8">
      <PageHeader eyebrow="Documents" title="Document checklist" description="Documents are based on each scheme's official requirements." />
      <SignInRequired>
        <ChecklistBody />
      </SignInRequired>
    </main>
  );
}
