'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { deleteMyData, getMe, updateMe } from '@/lib/data';
import { clearSession } from '@/lib/session';
import type { Me } from '@/lib/types';

const LANGUAGES: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'te', label: 'Telugu' },
  { code: 'ta', label: 'Tamil' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'mr', label: 'Marathi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'pa', label: 'Punjabi' },
];

function SettingsBody() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [language, setLanguage] = useState('en');
  const [confirmText, setConfirmText] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getMe().then((m) => {
      setMe(m);
      setLanguage(m.preferredLanguage);
    });
  }, []);

  async function saveLanguage() {
    const saved = await updateMe({ preferredLanguage: language });
    setMe(saved);
    setMessage('Language saved. Interface labels update on your next visit.');
  }

  async function deleteData() {
    // Guard: the destructive action stays disabled until the user types DELETE.
    if (confirmText !== 'DELETE') return;
    await deleteMyData();
    clearSession();
    router.push('/');
  }

  if (!me) return <Notice>Loading settings…</Notice>;

  return (
    <div className="max-w-xl space-y-10">
      <PageHeader eyebrow="Settings" title="Language and privacy" description="Choose your language and control your saved information." />
      {message && <Notice>{message}</Notice>}

      <section className="space-y-3 rounded-lg border border-border bg-card p-6" data-nexen-id="nx-31a1988f-0">
        <h2 className="font-bold" data-nexen-id="nx-31a1988f-1">Preferred language</h2>
        <label htmlFor="language" className="sr-only" data-nexen-id="nx-31a1988f-2">Preferred language</label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3" data-nexen-id="nx-31a1988f-3">
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
        <button type="button" onClick={saveLanguage} className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground" data-nexen-id="nx-31a1988f-4">
          Save language
        </button>
      </section>

      <section className="space-y-3 rounded-lg border border-destructive/40 bg-card p-6" data-nexen-id="nx-31a1988f-5">
        <h2 className="font-bold text-destructive" data-nexen-id="nx-31a1988f-6">Delete my data</h2>
        <p className="text-sm text-muted-foreground" data-nexen-id="nx-31a1988f-7">
          This removes your profile, assistant conversations, saved schemes, checklist items, applications, views and action items. It cannot be undone.
        </p>
        <label htmlFor="confirm-delete" className="text-sm font-semibold" data-nexen-id="nx-31a1988f-8">Type DELETE to confirm</label>
        <input id="confirm-delete" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3"  data-nexen-id="nx-31a1988f-9"/>
        <button type="button" onClick={deleteData} disabled={confirmText !== 'DELETE'} className="h-11 rounded-lg bg-destructive px-5 font-semibold text-destructive-foreground disabled:opacity-50" data-nexen-id="nx-31a1988f-10">
          Delete my data
        </button>
      </section>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <main data-nexen-component="SettingsPage" className="mx-auto max-w-[1120px] px-6 py-10" data-nexen-id="nx-31a1988f-11">
      <SignInRequired>
        <SettingsBody />
      </SignInRequired>
    </main>
  );
}
