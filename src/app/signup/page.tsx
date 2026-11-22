'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/AuthShell';
import { FormField, inputClass } from '@/components/FormField';
import { Notice } from '@/components/Notice';
import { signup } from '@/lib/data';
import { DEMO_CREDS } from '@/lib/data/demo-creds';
import { setSession } from '@/lib/session';
import {
  PASSWORD_MIN_LENGTH,
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from '@/lib/validation';

const isMock = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
type Fields = 'name' | 'email' | 'password' | 'confirm';

export default function SignupPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<Record<Fields, string | null>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirm') ?? '');
    const next = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validateConfirm(password, confirm),
    };
    setErrors(next);
    setFormError(null);
    if (Object.values(next).some(Boolean)) return;

    setSubmitting(true);
    try {
      const me = await signup({ name: name.trim(), email: email.trim(), password });
      setSession(me.name);
      router.push('/questionnaire');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Sign up failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div data-nexen-component="SignupPage">
      <AuthShell
        title="Create your AVASAR AI account"
        description="Only your name, email and a password. No Aadhaar or bank details."
        footer={
          <>
            Already registered? <Link href="/login" className="font-semibold text-primary" data-nexen-id="nx-85022a33-0">Sign in</Link>
          </>
        }
      >
        {isMock && (
          <p className="mb-4 text-xs text-muted-foreground" data-nexen-id="nx-85022a33-1">
            Demo mode — credentials auto-filled. Submit to continue.
          </p>
        )}
        {formError && <div className="mb-4"><Notice tone="error">{formError}</Notice></div>}
        <form onSubmit={onSubmit} noValidate className="space-y-4" data-nexen-id="nx-85022a33-2">
          <FormField id="name" label="Full name" error={errors.name}>
            <input id="name" name="name" autoComplete="name" defaultValue={isMock ? 'Asha Rao' : ''} className={inputClass}  data-nexen-id="nx-85022a33-3"/>
          </FormField>
          <FormField id="email" label="Email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" defaultValue={isMock ? DEMO_CREDS.email : ''} className={inputClass}  data-nexen-id="nx-85022a33-4"/>
          </FormField>
          <FormField id="password" label="Password" error={errors.password} hint={`At least ${PASSWORD_MIN_LENGTH} characters.`}>
            <input id="password" name="password" type="password" autoComplete="new-password" defaultValue={isMock ? DEMO_CREDS.password : ''} className={inputClass}  data-nexen-id="nx-85022a33-5"/>
          </FormField>
          <FormField id="confirm" label="Confirm password" error={errors.confirm}>
            <input id="confirm" name="confirm" type="password" autoComplete="new-password" defaultValue={isMock ? DEMO_CREDS.password : ''} className={inputClass}  data-nexen-id="nx-85022a33-6"/>
          </FormField>
          <button type="submit" disabled={submitting} className="h-11 w-full rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-60" data-nexen-id="nx-85022a33-7">
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </AuthShell>
    </div>
  );
}
