'use client';
import { useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';

// The assistant has no backend endpoint in the current API surface, so answers
// come from a fixed, reviewed set. It never invents rules, benefits or deadlines.
const ANSWERS: { q: string; a: string }[] = [
  {
    q: 'What is an income certificate?',
    a: 'An income certificate is an official document from the state revenue department stating your family income. Schemes use it to check the income limit.',
  },
  {
    q: 'What is a domicile certificate?',
    a: 'A domicile certificate proves you live in a state. State-specific schemes often require it.',
  },
  {
    q: 'What should I do next?',
    a: 'Open your action centre. It lists the next step for each saved scheme, such as a missing document or a status update.',
  },
];

export default function AssistantPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <main data-nexen-component="AssistantPage" className="mx-auto max-w-[760px] space-y-8 px-6 py-10" data-nexen-id="nx-e8407881-0">
      <PageHeader
        eyebrow="AI assistant"
        title="Ask about schemes in plain language"
        description="I explain government terms and scheme rules. I am not a government authority and do not decide eligibility."
      />
      <Notice>Answers are explanations drawn from reviewed scheme information. Verify final details on the official portal.</Notice>
      <section className="space-y-3" data-nexen-id="nx-e8407881-1">
        <h2 className="font-bold" data-nexen-id="nx-e8407881-2">Common questions</h2>
        <ul className="flex flex-col gap-2" data-nexen-id="nx-e8407881-3">
          {ANSWERS.map((item, i) => (
            <li key={item.q} data-nexen-id="nx-e8407881-4">
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                className={`w-full rounded-lg border p-3 text-left text-sm ${selected === i ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
               data-nexen-id="nx-e8407881-5">
                {item.q}
              </button>
            </li>
          ))}
        </ul>
      </section>
      {selected !== null && (
        <section role="region" aria-live="polite" className="rounded-lg border border-border bg-card p-6 text-sm" data-nexen-id="nx-e8407881-6">
          {ANSWERS[selected].a}
        </section>
      )}
    </main>
  );
}
