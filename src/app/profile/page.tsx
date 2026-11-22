'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { getMe, logout, updateMe } from '@/lib/data';
import { clearSession, setSession } from '@/lib/session';
import type { Me } from '@/lib/types';
import { validateConfirm, validateEmail, validateName, validatePassword } from '@/lib/validation';


function ProfileBody() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null | undefined>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    getMe().then(setMe).catch((e: unknown) => setLoadError(e instanceof Error ? e.message : 'Could not load profile.'));
  }, []);

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '');
    const email = String(f.get('email') ?? '');
    const password = String(f.get('password') ?? '');
    const confirm = String(f.get('confirm') ?? '');
    const next = {
      name: validateName(name),
      email: validateEmail(email),
      // Password is optional on profile; only validated when the user types one.
      password: password ? validatePassword(password) : null,
      confirm: password ? validateConfirm(password, confirm) : null,
    };
    setErrors(next);
    setMessage(null);
    if (Object.values(next).some(Boolean)) return;
    try {
      const saved = await updateMe({ name: name.trim(), email: email.trim(), ...(password ? { password } : {}) });
      setMe(saved);
      setSession(saved.name);
      setMessage('Profile saved.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save profile.');
    }
  }

  async function onSignOut() {
    await logout().catch(() => undefined);
    clearSession();
    router.push('/login');
  }

  if (loadError) return <Notice tone="error">{loadError}</Notice>;
  if (!me) return <Notice>Loading your profile…</Notice>;

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Account" title="Your profile" description="Update your name, email and password." />
      {message && <Notice>{message}</Notice>}
      <form onSubmit={onSave} noValidate className="grid max-w-lg gap-4" data-nexen-id="nx-99236b1e-0">
        <FormField id="name" label="Name" error={errors.name}>
          <input id="name" name="name" defaultValue={me.name} className={inputClass}  data-nexen-id="nx-99236b1e-1"/>
        </FormField>
        <FormField id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" defaultValue={me.email} className={inputClass}  data-nexen-id="nx-99236b1e-2"/>
        </FormField>
        <FormField id="password" label="New password (optional)" error={errors.password}>
          <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass}  data-nexen-id="nx-99236b1e-3"/>
        </FormField>
        <FormField id="confirm" label="Confirm new password" error={errors.confirm}>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass}  data-nexen-id="nx-99236b1e-4"/>
        </FormField>
        <button type="submit" className="h-11 rounded-lg bg-primary font-semibold text-primary-foreground" data-nexen-id="nx-99236b1e-5">Save profile</button>
      </form>
      <button type="button" onClick={onSignOut} className="h-11 rounded-lg border border-border px-5 font-semibold" data-nexen-id="nx-99236b1e-6">
        Sign out
      </button>
    </div>
  );
}


export default function ProfilePage() {
  return (
    <main data-nexen-component="ProfilePage" className="mx-auto max-w-[1120px] px-6 py-10" data-nexen-id="nx-99236b1e-7">
      <SignInRequired>
        <ProfileBody />
      </SignInRequired>
    </main>
  );
}
