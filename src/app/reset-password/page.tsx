'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/AuthShell';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { resetPassword } from '@/lib/data';
import { validateConfirm, validatePassword } from '@/lib/validation';

function ResetForm() {
  const token = useSearchParams().get('token') ?? '';
  const [errors, setErrors] = useState<{ password?: string | null; confirm?: string | null }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirm') ?? '');
    const next = { password: validatePassword(password), confirm: validateConfirm(password, confirm) };
    setErrors(next);
    setFormError(null);
    if (next.password || next.confirm) return;
    if (!token) {
      setFormError('This reset link is missing its token. Request a new link.');
      return;
    }
    try {
      await resetPassword({ token, password });
      setDone(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Reset failed. The link may have expired.');
    }
  }

  if (done) {
    return (
      <Notice>
        Your password has been updated. <Link href="/login" className="font-semibold text-primary" data-nexen-id="nx-5beb24c0-0">Sign in</Link>
      </Notice>
    );
  }

  return (
    <>
      {formError && <div className="mb-4"><Notice tone="error">{formError}</Notice></div>}
      <form onSubmit={onSubmit} noValidate className="space-y-4" data-nexen-id="nx-5beb24c0-1">
        <FormField id="password" label="New password" error={errors.password}>
          <input id="password" name="password" type="password" autoComplete="new-password" className={inputClass}  data-nexen-id="nx-5beb24c0-2"/>
        </FormField>
        <FormField id="confirm" label="Confirm new password" error={errors.confirm}>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" className={inputClass}  data-nexen-id="nx-5beb24c0-3"/>
        </FormField>
        <button type="submit" className="h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground" data-nexen-id="nx-5beb24c0-4">
          Save new password
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div data-nexen-component="ResetPasswordPage">
      <AuthShell title="Choose a new password" description="Enter and confirm your new password.">
        <Suspense fallback={<Notice>Loading…</Notice>}>
          <ResetForm />
        </Suspense>
      </AuthShell>
    </div>
  );
}
