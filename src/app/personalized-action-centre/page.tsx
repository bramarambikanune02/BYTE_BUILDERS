'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { SignInRequired } from '@/components/SignInRequired';
import { getActionItems, updateActionItem } from '@/lib/data';
import type { ActionItem } from '@/lib/types';

function ActionsBody() {
  const [items, setItems] = useState<ActionItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getActionItems()
      .then((r) => setItems(Array.isArray(r) ? r : []))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load actions.'));
  }, []);

  async function resolve(item: ActionItem, status: 'done' | 'dismissed') {
    await updateActionItem(item.id, status);
    setItems((rows) => (rows ?? []).filter((r) => r.id !== item.id));
  }

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!items) return <Notice>Loading your actions…</Notice>;
  if (items.length === 0) return <Notice tone="empty">You are all caught up. New actions appear as your profile and schemes change.</Notice>;

  return (
    <ul className="space-y-3" data-nexen-id="nx-b13e6777-0">
      {items.map((item) => (
        <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4" data-nexen-id="nx-b13e6777-1">
          <div>
            <p className="font-medium" data-nexen-id="nx-b13e6777-2">{item.title}</p>
            {item.dueDate && <p className="text-xs text-muted-foreground" data-nexen-id="nx-b13e6777-3">Due {item.dueDate}</p>}
            {item.schemeId && (
              <Link href={`/schemes/${item.schemeId}`} className="text-xs font-semibold text-primary" data-nexen-id="nx-b13e6777-4">Open related scheme</Link>
            )}
          </div>
          <span className="flex gap-2" data-nexen-id="nx-b13e6777-5">
            <button type="button" onClick={() => resolve(item, 'done')} className="h-9 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground" data-nexen-id="nx-b13e6777-6">Done</button>
            <button type="button" onClick={() => resolve(item, 'dismissed')} className="h-9 rounded-lg border border-border px-3 text-sm font-semibold" data-nexen-id="nx-b13e6777-7">Dismiss</button>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ActionCentrePage() {
  return (
    <main data-nexen-component="ActionCentrePage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-b13e6777-8">
      <PageHeader eyebrow="Next steps" title="Action centre" description="Every alert connects to a scheme or activity so you know what to do next." />
      <SignInRequired>
        <ActionsBody />
      </SignInRequired>
    </main>
  );
}
