'use client';
import { useState } from 'react';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { adminSaveDeadlines } from '@/lib/data';
import type { SchemeDeadline } from '@/lib/types';
import { validateDeadlineVerified } from '@/lib/validation';

export function AdminDeadlinesEditor({ schemeId, initial }: { schemeId: string; initial: SchemeDeadline[] }) {
  const [rows, setRows] = useState<SchemeDeadline[]>(initial);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [message, setMessage] = useState<string | null>(null);

  function patch(id: string, change: Partial<SchemeDeadline>) {
    setRows((r) => r.map((d) => (d.id === id ? { ...d, ...change } : d)));
  }

  async function save() {
    const nextErrors: Record<string, string | null> = {};
    rows.forEach((d) => {
      nextErrors[d.id] = validateDeadlineVerified(d.verified, d.verifiedDate ?? '');
    });
    setErrors(nextErrors);
    setMessage(null);
    if (Object.values(nextErrors).some(Boolean)) return;
    try {
      const saved = await adminSaveDeadlines(schemeId, rows);
      setRows(saved);
      setMessage('Deadlines saved.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not save deadlines.');
    }
  }

  return (
    <section data-nexen-component="AdminDeadlinesEditor" className="space-y-4" data-nexen-id="nx-47deb820-0">
      <h2 className="text-lg font-bold" data-nexen-id="nx-47deb820-1">Deadlines</h2>
      {message && <Notice>{message}</Notice>}
      {rows.length === 0 && <Notice tone="empty">No deadlines recorded.</Notice>}
      {rows.map((d) => (
        <div key={d.id} className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-4">
          <FormField id={`label-${d.id}`} label="Label">
            <input id={`label-${d.id}`} value={d.label} onChange={(e) => patch(d.id, { label: e.target.value })} className={inputClass}  data-nexen-id="nx-47deb820-2"/>
          </FormField>
          <FormField id={`date-${d.id}`} label="Deadline date">
            <input id={`date-${d.id}`} type="date" value={d.date ?? ''} onChange={(e) => patch(d.id, { date: e.target.value || null })} className={inputClass}  data-nexen-id="nx-47deb820-3"/>
          </FormField>
          <FormField id={`vd-${d.id}`} label="Verified date" error={errors[d.id]}>
            <input id={`vd-${d.id}`} type="date" value={d.verifiedDate ?? ''} onChange={(e) => patch(d.id, { verifiedDate: e.target.value || null })} className={inputClass}  data-nexen-id="nx-47deb820-4"/>
          </FormField>
          <label className="flex items-end gap-2 pb-2 text-sm font-semibold" data-nexen-id="nx-47deb820-5">
            <input type="checkbox" checked={d.verified} onChange={(e) => patch(d.id, { verified: e.target.checked })}  data-nexen-id="nx-47deb820-6"/>
            Verified
          </label>
        </div>
      ))}
      <button type="button" onClick={save} className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-47deb820-7">Save deadlines</button>
    </section>
  );
}
