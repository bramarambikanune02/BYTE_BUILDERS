'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/Badge';
import { PageHeader } from '@/components/PageHeader';
import { ProgressMeter } from '@/components/ProgressMeter';
import { Notice } from '@/components/Notice';
import { SignInRequired } from '@/components/SignInRequired';
import { getDashboard, getRecentlyViewed, updateActionItem } from '@/lib/data';
import type { ActionItem, Dashboard, ViewedScheme } from '@/lib/types';

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground" data-nexen-id="nx-c5386723-0">{label}</p>
      <p className="mt-1 text-3xl font-bold" data-nexen-id="nx-c5386723-1">{value}</p>
    </div>
  );
}

function DashboardBody() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [recent, setRecent] = useState<ViewedScheme[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getDashboard(), getRecentlyViewed()])
      .then(([d, r]) => {
        setData(d);
        setRecent(Array.isArray(r) ? r : []);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load dashboard.'));
  }, []);

  async function act(item: ActionItem, status: 'done' | 'dismissed') {
    await updateActionItem(item.id, status);
    setData((d) => (d ? { ...d, nextActions: d.nextActions.filter((a) => a.id !== item.id) } : d));
  }

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!data) return <Notice>Loading your dashboard…</Notice>;

  const savedSchemes = Array.isArray(data.savedSchemes) ? data.savedSchemes : [];
  const nextActions = Array.isArray(data.nextActions) ? data.nextActions : [];
  const deadlines = Array.isArray(data.upcomingDeadlines) ? data.upcomingDeadlines : [];

  return (
    <div className="space-y-10">
      <PageHeader eyebrow="Your dashboard" title={`Welcome back, ${data.welcomeName}`} description="Your matches, deadlines and next steps in one place." />
      <section className="grid gap-4 md:grid-cols-4" data-nexen-id="nx-c5386723-2">
        <Stat label="Likely matches" value={data.likelyCount} />
        <Stat label="Need more information" value={data.needsInfoCount} />
        <Stat label="Pending documents" value={data.pendingChecklistItems} />
        <div className="rounded-lg border border-border bg-card p-5">
          <ProgressMeter value={data.profileCompletion} label="Profile completion" />
        </div>
      </section>

      <section className="space-y-3" data-nexen-id="nx-c5386723-3">
        <h2 className="text-xl font-bold" data-nexen-id="nx-c5386723-4">Recommended next actions</h2>
        {nextActions.length === 0 ? (
          <Notice tone="empty">No open actions. Nice work.</Notice>
        ) : (
          <ul className="space-y-3" data-nexen-id="nx-c5386723-5">
            {nextActions.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4" data-nexen-id="nx-c5386723-6">
                <span className="font-medium" data-nexen-id="nx-c5386723-7">{a.title}</span>
                <span className="flex gap-2" data-nexen-id="nx-c5386723-8">
                  <button type="button" onClick={() => act(a, 'done')} className="h-9 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground" data-nexen-id="nx-c5386723-9">Mark done</button>
                  <button type="button" onClick={() => act(a, 'dismissed')} className="h-9 rounded-lg border border-border px-3 text-sm font-semibold" data-nexen-id="nx-c5386723-10">Dismiss</button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2" data-nexen-id="nx-c5386723-11">
        <div className="space-y-3">
          <h2 className="text-xl font-bold" data-nexen-id="nx-c5386723-12">Saved schemes</h2>
          {savedSchemes.length === 0 ? (
            <Notice tone="empty">You have not saved any schemes yet.</Notice>
          ) : (
            <ul className="space-y-2" data-nexen-id="nx-c5386723-13">
              {savedSchemes.map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm" data-nexen-id="nx-c5386723-14">
                  <span data-nexen-id="nx-c5386723-15">{s.schemeName}</span>
                  <Badge data-nexen-id="nx-c5386723-16">{s.applicationStatus}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold" data-nexen-id="nx-c5386723-17">Upcoming deadlines</h2>
          {deadlines.length === 0 ? (
            <Notice tone="empty">No verified deadlines yet. Deadlines appear only when confirmed by official information.</Notice>
          ) : (
            <ul className="space-y-2" data-nexen-id="nx-c5386723-18">
              {deadlines.map((d) => (
                <li key={`${d.schemeName}-${d.label}`} className="rounded-lg border border-border bg-card p-4 text-sm" data-nexen-id="nx-c5386723-19">
                  <b>{d.schemeName}</b> — {d.label} <span className="text-muted-foreground" data-nexen-id="nx-c5386723-20">({d.date})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="space-y-3" data-nexen-id="nx-c5386723-21">
        <h2 className="text-xl font-bold" data-nexen-id="nx-c5386723-22">Recently viewed</h2>
        {recent.length === 0 ? (
          <Notice tone="empty">Schemes you open will appear here.</Notice>
        ) : (
          <ul className="flex flex-wrap gap-2 text-sm" data-nexen-id="nx-c5386723-23">
            {recent.map((r) => (
              <li key={`${r.schemeId}-${r.viewedAt}`} data-nexen-id="nx-c5386723-24">
                <Link href={`/schemes/${r.schemeId}`} className="rounded-full border border-border px-3 py-1 hover:text-primary" data-nexen-id="nx-c5386723-25">
                  {r.schemeName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main data-nexen-component="DashboardPage" className="mx-auto max-w-[1120px] px-6 py-10" data-nexen-id="nx-c5386723-26">
      <SignInRequired>
        <DashboardBody />
      </SignInRequired>
    </main>
  );
}
