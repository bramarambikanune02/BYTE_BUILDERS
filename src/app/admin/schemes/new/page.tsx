'use client';
import { useRouter } from 'next/navigation';
import { AdminSchemeForm } from '@/components/admin/AdminSchemeForm';
import { PageHeader } from '@/components/PageHeader';

export default function NewAdminSchemePage() {
  const router = useRouter();
  return (
    <main data-nexen-component="NewAdminSchemePage" className="mx-auto max-w-[1120px] space-y-8 px-6 py-10" data-nexen-id="nx-992c62ec-0">
      <PageHeader eyebrow="Admin" title="New scheme" description="Create the scheme, then add its rules, documents and deadlines." />
      <AdminSchemeForm onSaved={(id) => router.push(`/admin/schemes/${id}`)} />
    </main>
  );
}
