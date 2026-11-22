'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminDeadlinesEditor } from '@/components/admin/AdminDeadlinesEditor';
import { AdminSchemeForm } from '@/components/admin/AdminSchemeForm';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { adminGetScheme } from '@/lib/data';
import type { SchemeDetail } from '@/lib/types';

export default function EditAdminSchemePage() {
  const { id } = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<SchemeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminGetScheme(id)
      .then(setScheme)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Could not load scheme.'));
  }, [id]);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!scheme) return <Notice>Loading scheme…</Notice>;

  return (
    <main data-nexen-component="EditAdminSchemePage" className="mx-auto max-w-[1120px] space-y-10 px-6 py-10" data-nexen-id="nx-136ee9b3-0">
      <PageHeader eyebrow="Admin" title={`Edit ${scheme.name}`} description="Changes are saved to the scheme record used by the public pages." />
      <AdminSchemeForm initial={scheme} onSaved={() => undefined} />
      <AdminDeadlinesEditor schemeId={scheme.id} initial={Array.isArray(scheme.deadlines) ? scheme.deadlines : []} />
    </main>
  );
}
