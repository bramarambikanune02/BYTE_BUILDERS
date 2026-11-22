'use client';
// Demo session helper. The real session is an httpOnly cookie set by
// /api/auth/login; this mirror lets client components render signed-in UI.

const KEY = 'avasar_session';

export function setSession(name: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify({ name }));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}

export function readSessionName(): string | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return (JSON.parse(raw) as { name: string }).name;
  } catch {
    return null;
  }
}
