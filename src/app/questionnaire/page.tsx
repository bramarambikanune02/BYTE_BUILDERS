'use client';
import { useEffect, useState } from 'react';
import { Notice } from '@/components/Notice';
import { PageHeader } from '@/components/PageHeader';
import { ProgressMeter } from '@/components/ProgressMeter';
import { SignInRequired } from '@/components/SignInRequired';
import { getMyProfile, saveMyProfile } from '@/lib/data';
import { validateNoSensitiveId } from '@/lib/validation';

interface Question {
  key: string;
  label: string;
  help: string;
}

const QUESTIONS: Question[] = [
  { key: 'state', label: 'Which state do you live in?', help: 'State of domicile, for state-specific schemes.' },
  { key: 'educationLevel', label: 'What is your current education level?', help: 'For example undergraduate or postgraduate.' },
  { key: 'course', label: 'Which course or stream are you studying?', help: 'For example B.Tech or B.Sc.' },
  { key: 'academicYear', label: 'Which year of study are you in?', help: 'For example second year.' },
  { key: 'annualIncome', label: "What is your family's approximate annual income (₹)?", help: 'An estimate is fine. Do not share bank details.' },
  { key: 'previousScore', label: 'What was your score in your previous examination (%)?', help: 'Optional. You can skip this.' },
];

function QuestionnaireBody() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then((p) => setAnswers(p.answers ?? {}))
      .catch(() => setStatus('Could not load your saved answers. You can still answer below.'))
      .finally(() => setLoading(false));
  }, []);

  const q = QUESTIONS[index];
  const progress = Math.round(((index + 1) / QUESTIONS.length) * 100);
  const current = answers[q.key] ?? '';
  const isLast = index === QUESTIONS.length - 1;

  async function persist(payload: Record<string, string>, finish: boolean) {
    try {
      await saveMyProfile({ answers: payload, finish });
      setAnswers(payload);
      setStatus(finish ? 'Profile confirmed. Your matches are ready on the dashboard.' : 'Saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save. Try again.');
    }
  }

  function onChange(value: string) {
    setError(validateNoSensitiveId(value));
    setAnswers((a) => ({ ...a, [q.key]: value }));
  }

  async function onNext(skip: boolean) {
    if (!skip) {
      const msg = validateNoSensitiveId(current);
      if (msg) {
        setError(msg);
        return;
      }
    }
    const nextAnswers = skip ? { ...answers, [q.key]: '' } : answers;
    setError(null);
    await persist(nextAnswers, false);
    if (!isLast) setIndex(index + 1);
  }

  if (loading) return <Notice>Loading your questionnaire…</Notice>;

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <PageHeader eyebrow="Student profile" title="Tell us about yourself" description="Answer one question at a time. Skip anything you are unsure about." />
      <ProgressMeter value={progress} label={`Question ${index + 1} of ${QUESTIONS.length}`} />
      {status && <Notice>{status}</Notice>}
      <section className="space-y-4 rounded-lg border border-border bg-card p-6" data-nexen-id="nx-0e90d066-0">
        <h2 className="text-lg font-bold" data-nexen-id="nx-0e90d066-1">{q.label}</h2>
        <p className="text-sm text-muted-foreground" data-nexen-id="nx-0e90d066-2">{q.help}</p>
        <label htmlFor="answer" className="sr-only" data-nexen-id="nx-0e90d066-3">{q.label}</label>
        <input
          id="answer"
          value={current}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'answer-error' : undefined}
          className="h-11 w-full rounded-lg border border-input bg-background px-3"
         data-nexen-id="nx-0e90d066-4"/>
        {error && <p id="answer-error" role="alert" className="text-sm text-destructive" data-nexen-id="nx-0e90d066-5">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)} className="h-11 rounded-lg border border-border px-4 font-semibold disabled:opacity-50" data-nexen-id="nx-0e90d066-6">Back</button>
          <button type="button" onClick={() => onNext(true)} className="h-11 rounded-lg border border-border px-4 font-semibold" data-nexen-id="nx-0e90d066-7">Skip</button>
          <button type="button" onClick={() => onNext(false)} className="h-11 rounded-lg bg-primary px-4 font-semibold text-primary-foreground" data-nexen-id="nx-0e90d066-8">
            {isLast ? 'Save answer' : 'Next'}
          </button>
        </div>
      </section>
      {isLast && (
        <button type="button" onClick={() => persist(answers, true)} className="h-11 w-full rounded-lg bg-secondary font-semibold text-secondary-foreground" data-nexen-id="nx-0e90d066-9">
          Finish profile
        </button>
      )}
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <main data-nexen-component="QuestionnairePage" className="mx-auto max-w-[1120px] px-6 py-10" data-nexen-id="nx-0e90d066-10">
      <SignInRequired>
        <QuestionnaireBody />
      </SignInRequired>
    </main>
  );
}
