import Link from 'next/link';

const STEPS = [
  { title: 'Discover', body: 'Describe your circumstances in plain language or fill a short guided form.' },
  { title: 'Check eligibility', body: 'See which rules are met, which are missing and the official rule behind each result.' },
  { title: 'Prepare documents', body: "Get a checklist built from each scheme's own required certificates." },
  { title: 'Track and apply', body: 'Follow official portal steps, track status and get deadline reminders.' },
];

const FAQS = [
  { q: 'Is AVASAR AI an official government website?', a: 'No. It is an independent informational assistance service. It does not submit applications or verify application status.' },
  { q: 'Do you ask for Aadhaar or bank details?', a: 'No. We never ask for Aadhaar numbers or bank account details.' },
  { q: 'What does "Likely eligible" mean?', a: 'Your profile meets all known mandatory conditions. The final decision rests with the relevant government authority.' },
];

export default function HomePage() {
  return (
    <main data-nexen-component="HomePage" className="mx-auto max-w-[1120px] px-6" data-nexen-id="nx-3393394e-0">
      <section className="grid items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr]" data-nexen-id="nx-3393394e-1">
        <div>
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary" data-nexen-id="nx-3393394e-2">
            Every Opportunity You Deserve, Within Your Reach
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl" data-nexen-id="nx-3393394e-3">
            Your Future Deserves Every Opportunity.{' '}
            <span className="text-primary" data-nexen-id="nx-3393394e-4">Discover the Government Support You May Be Missing.</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground" data-nexen-id="nx-3393394e-5">
            Tell us about yourself. We&apos;ll help you discover government scholarships and schemes you may qualify for,
            understand the requirements and find your next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/questionnaire" className="inline-flex h-11 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground shadow-sm" data-nexen-id="nx-3393394e-6">
              Find My Scholarships
            </Link>
            <Link href="/schemes" className="inline-flex h-11 items-center rounded-lg border border-border px-5 font-semibold" data-nexen-id="nx-3393394e-7">
              Explore Government Schemes
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span data-nexen-id="nx-3393394e-8"><b className="text-foreground">Official sources</b> linked on every scheme</span>
            <span data-nexen-id="nx-3393394e-9"><b className="text-foreground">No Aadhaar</b> or bank details required</span>
            <span data-nexen-id="nx-3393394e-10"><b className="text-foreground">Hindi, Telugu, Tamil</b> and more</span>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <strong data-nexen-id="nx-3393394e-11">Your profile</strong>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary" data-nexen-id="nx-3393394e-12">Profile 72% complete</span>
          </div>
          <div className="my-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[72%] bg-primary" /></div>
          <p className="text-xs text-muted-foreground" data-nexen-id="nx-3393394e-13">Sample synthetic profile</p>
          <div className="my-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-md border border-border p-2"><small className="block text-xs text-muted-foreground" data-nexen-id="nx-3393394e-14">State</small>Andhra Pradesh</div>
            <div className="rounded-md border border-border p-2"><small className="block text-xs text-muted-foreground" data-nexen-id="nx-3393394e-15">Education</small>B.Tech, 2nd year</div>
            <div className="rounded-md border border-border p-2"><small className="block text-xs text-muted-foreground" data-nexen-id="nx-3393394e-16">Annual family income</small>~₹1.5 lakh</div>
            <div className="rounded-md border border-border p-2"><small className="block text-xs text-muted-foreground" data-nexen-id="nx-3393394e-17">Previous score</small>85%</div>
          </div>
          <p className="text-xs text-muted-foreground" data-nexen-id="nx-3393394e-18">
            Likely eligible means your profile meets all known mandatory conditions. Final decisions rest with the relevant government authority.
          </p>
        </div>
      </section>

      <section className="py-14" data-nexen-id="nx-3393394e-19">
        <h2 className="text-2xl font-bold" data-nexen-id="nx-3393394e-20">How it works</h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-4" data-nexen-id="nx-3393394e-21">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-lg border border-border bg-muted/30 p-5" data-nexen-id="nx-3393394e-22">
              <span className="text-sm font-bold text-primary" data-nexen-id="nx-3393394e-23">Step {i + 1}</span>
              <h3 className="mt-1 font-bold" data-nexen-id="nx-3393394e-24">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground" data-nexen-id="nx-3393394e-25">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14" data-nexen-id="nx-3393394e-26">
        <h2 className="text-2xl font-bold" data-nexen-id="nx-3393394e-27">Frequently asked questions</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-3" data-nexen-id="nx-3393394e-28">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-card p-5">
              <dt className="font-semibold" data-nexen-id="nx-3393394e-29">{f.q}</dt>
              <dd className="mt-2 text-sm text-muted-foreground" data-nexen-id="nx-3393394e-30">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="mt-10 border-t border-border py-8 text-xs text-muted-foreground" data-nexen-id="nx-3393394e-31">
        <p data-nexen-id="nx-3393394e-32">
          An independent informational assistance service. AVASAR AI is not an official government website and does not submit
          applications or verify application status.{' '}
          <Link href="/trust" className="underline" data-nexen-id="nx-3393394e-33">Trust centre</Link> ·{' '}
          <Link href="/privacy" className="underline" data-nexen-id="nx-3393394e-34">Privacy policy</Link>
        </p>
      </footer>
    </main>
  );
}
