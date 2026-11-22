'use client';
import { useState, type FormEvent } from 'react';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { adminCreateScheme, adminUpdateScheme } from '@/lib/data';
import type { AdminSchemeInput, SchemeDetail, SchemeLevel, SchemeStatus, VerificationStatus } from '@/lib/types';

const VERIFICATION: VerificationStatus[] = [
  'Verified from official source',
  'Requires re-verification',
  'Deadline not confirmed',
  'Application currently closed',
  'Information incomplete',
];
const CODE_RE = /^[A-Z0-9-]{3,30}$/;

export function AdminSchemeForm({ initial, onSaved }: { initial?: SchemeDetail; onSaved: (id: string) => void }) {
  const [errors, setErrors] = useState<Record<string, string | null | undefined>>({});
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const code = get('code');
    const name = get('name');
    const verificationStatus = get('verificationStatus') as VerificationStatus;
    const lastVerified = get('lastVerified') || null;
    const next = {
      code: CODE_RE.test(code) ? null : 'Code: 3–30 capital letters, numbers or hyphens.',
      name: name ? null : 'Scheme name is required.',
      lastVerified:
        verificationStatus === 'Verified from official source' && !lastVerified
          ? 'A verified scheme needs a last verified date.'
          : null,
    };
    setErrors(next);
    setMessage(null);
    if (Object.values(next).some(Boolean)) return;

    const input: AdminSchemeInput = {
      code,
      name,
      department: get('department'),
      category: get('category'),
      level: get('level') as SchemeLevel,
      state: get('state') || 'All India',
      educationLevel: get('educationLevel'),
      description: get('description'),
      status: get('status') as SchemeStatus,
      verificationStatus,
      lastVerified,
      informationGaps: get('informationGaps').split('\n').map((s) => s.trim()).filter(Boolean),
      faqs: initial?.faqs ?? [],
    };
    try {
      const saved = initial
        ? await adminUpdateScheme(initial.id, input)
        : await adminCreateScheme(input);
      setMessage('Scheme saved.');
      onSaved(saved.id);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save the scheme.');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate data-nexen-component="AdminSchemeForm" className="grid gap-4 md:grid-cols-2" data-nexen-id="nx-b563544f-0">
      {message && <div className="md:col-span-2"><Notice>{message}</Notice></div>}
      <FormField id="code" label="Scheme code" error={errors.code}>
        <input id="code" name="code" defaultValue={initial?.code ?? ''} className={inputClass}  data-nexen-id="nx-b563544f-1"/>
      </FormField>
      <FormField id="name" label="Official name" error={errors.name}>
        <input id="name" name="name" defaultValue={initial?.name ?? ''} className={inputClass}  data-nexen-id="nx-b563544f-2"/>
      </FormField>
      <FormField id="department" label="Responsible department">
        <input id="department" name="department" defaultValue={initial?.department ?? ''} className={inputClass}  data-nexen-id="nx-b563544f-3"/>
      </FormField>
      <FormField id="category" label="Category">
        <input id="category" name="category" defaultValue={initial?.category ?? ''} className={inputClass}  data-nexen-id="nx-b563544f-4"/>
      </FormField>
      <FormField id="level" label="Classification">
        <select id="level" name="level" defaultValue={initial?.level ?? 'Central'} className={inputClass} data-nexen-id="nx-b563544f-5">
          <option value="Central">Central</option>
          <option value="State">State</option>
        </select>
      </FormField>
      <FormField id="status" label="Scheme status">
        <select id="status" name="status" defaultValue={initial?.status ?? 'active'} className={inputClass} data-nexen-id="nx-b563544f-6">
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="uncertain">Uncertain</option>
          <option value="outdated">Outdated</option>
        </select>
      </FormField>
      <FormField id="verificationStatus" label="Verification status">
        <select id="verificationStatus" name="verificationStatus" defaultValue={initial?.verificationStatus ?? VERIFICATION[0]} className={inputClass} data-nexen-id="nx-b563544f-7">
          {VERIFICATION.map((v) => (<option key={v} value={v}>{v}</option>))}
        </select>
      </FormField>
      <FormField id="lastVerified" label="Last verified date" error={errors.lastVerified}>
        <input id="lastVerified" name="lastVerified" type="date" defaultValue={initial?.lastVerified ?? ''} className={inputClass}  data-nexen-id="nx-b563544f-8"/>
      </FormField>
      <div className="md:col-span-2">
        <FormField id="description" label="Description">
          <textarea id="description" name="description" rows={3} defaultValue={initial?.description ?? ''} className="w-full rounded-lg border border-input bg-background p-3 text-sm"  data-nexen-id="nx-b563544f-9"/>
        </FormField>
      </div>
      <div className="md:col-span-2">
        <FormField id="informationGaps" label="Information gaps (one per line)">
          <textarea id="informationGaps" name="informationGaps" rows={3} defaultValue={initial?.informationGaps?.join('\n') ?? ''} className="w-full rounded-lg border border-input bg-background p-3 text-sm"  data-nexen-id="nx-b563544f-10"/>
        </FormField>
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-b563544f-11">
          {initial ? 'Save scheme' : 'Create scheme'}
        </button>
      </div>
    </form>
  );
}
