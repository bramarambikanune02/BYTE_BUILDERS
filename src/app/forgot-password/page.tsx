'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/AuthShell';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { forgotPassword } from '@/lib/data';
import { DEMO_CREDS } from '@/lib/data/demo-creds';
import { validateEmail } from '@/lib/validation';

const isMock = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '');
    const msg = validateEmail(email);
    setError(msg);
    if (msg) return;
    setSubmitting(true);
    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the reset link.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div data-nexen-component="ForgotPasswordPage">
      <AuthShell
        title="Reset your password"
        description="We will email you a link to choose a new password."
        footer={<Link href="/login" className="font-semibold text-primary" data-nexen-id="nx-d5936786-0">Back to sign in</Link>}
      >
        {sent ? (
          <Notice>If an account exists for that email, a reset link is on its way. Check your inbox.</Notice>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-4" data-nexen-id="nx-d5936786-1">
            {isMock && (
              <p className="text-xs text-muted-foreground" data-nexen-id="nx-d5936786-2">Demo mode — credentials auto-filled. Submit to continue.</p>
            )}
            <FormField id="email" label="Email" error={error}>
              <input id="email" name="email" type="email" autoComplete="email" defaultValue={isMock ? DEMO_CREDS.email : ''} className={inputClass}  data-nexen-id="nx-d5936786-3"/>
            </FormField>
            <button type="submit" disabled={submitting} className="h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-60" data-nexen-id="nx-d5936786-4">
              {submitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}
      </AuthShell>
    </div>
  );
}
