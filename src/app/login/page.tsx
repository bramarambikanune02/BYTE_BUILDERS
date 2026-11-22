'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/AuthShell';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { login } from '@/lib/data';
import { DEMO_CREDS } from '@/lib/data/demo-creds';
import { setSession } from '@/lib/session';
import { validateEmail } from '@/lib/validation';

const isMock = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const next = {
      email: validateEmail(email),
      password: password ? null : 'Password is required.',
    };
    setErrors(next);
    setFormError(null);
    if (next.email || next.password) return;

    setSubmitting(true);
    try {
      const me = await login({ email, password });
      setSession(me.name);
      router.push('/dashboard');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Sign in failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div data-nexen-component="LoginPage">
      <AuthShell
        title="Sign in to AVASAR AI"
        description="Pick up where you left off with your scheme matches and applications."
        footer={
          <>
            New here? <Link href="/signup" className="font-semibold text-primary" data-nexen-id="nx-0de71383-0">Create an account</Link>
            <br />
            <Link href="/forgot-password" className="underline" data-nexen-id="nx-0de71383-1">Forgot password?</Link>
          </>
        }
      >
        {isMock && (
          <p className="mb-4 text-xs text-muted-foreground" data-nexen-id="nx-0de71383-2">
            Demo mode — credentials auto-filled. Submit to continue.
          </p>
        )}
        {formError && <div className="mb-4"><Notice tone="error">{formError}</Notice></div>}
        <form onSubmit={onSubmit} noValidate className="space-y-4" data-nexen-id="nx-0de71383-3">
          <FormField id="email" label="Email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={isMock ? DEMO_CREDS.email : ''}
              aria-invalid={Boolean(errors.email)}
              className={inputClass}
             data-nexen-id="nx-0de71383-4"/>
          </FormField>
          <FormField id="password" label="Password" error={errors.password}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              defaultValue={isMock ? DEMO_CREDS.password : ''}
              aria-invalid={Boolean(errors.password)}
              className={inputClass}
             data-nexen-id="nx-0de71383-5"/>
          </FormField>
          <button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-60"
           data-nexen-id="nx-0de71383-6">
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </AuthShell>
    </div>
  );
}
