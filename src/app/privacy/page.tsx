import { PageHeader } from '@/components/PageHeader';

export default function PrivacyPage() {
  return (
    <main data-nexen-component="PrivacyPage" className="mx-auto max-w-[760px] space-y-6 px-6 py-10" data-nexen-id="nx-48f018d8-0">
      <PageHeader eyebrow="Privacy" title="Privacy policy" description="We collect only what is needed to check scheme conditions." />
      <section className="space-y-3 text-sm text-muted-foreground" data-nexen-id="nx-48f018d8-1">
        <p data-nexen-id="nx-48f018d8-2">We never ask for Aadhaar numbers or bank account details. The questionnaire blocks entries that look like either.</p>
        <p data-nexen-id="nx-48f018d8-3">You can edit or delete your saved information at any time from Settings. Deleting your data removes your profile, saved schemes, checklists, applications and action items.</p>
        <p data-nexen-id="nx-48f018d8-4">AI-generated explanations are labelled. Official scheme information is shown with its source and last verified date.</p>
        <p data-nexen-id="nx-48f018d8-5">Demonstration accounts use synthetic data only.</p>
      </section>
    </main>
  );
}
