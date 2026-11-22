import type { EligibilityStatus } from '@/lib/types';

type Tone = 'primary' | 'secondary' | 'warn' | 'danger' | 'muted';

const TONES: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary text-secondary-foreground',
  warn: 'bg-accent text-accent-foreground',
  danger: 'bg-destructive/10 text-destructive',
  muted: 'bg-muted text-muted-foreground',
};

export function Badge({ tone = 'muted', children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span
      data-nexen-component="Badge"
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}
     data-nexen-id="nx-14a79ebb-0">
      {children}
    </span>
  );
}

const ELIGIBILITY_TONE: Record<EligibilityStatus, Tone> = {
  'Likely eligible': 'primary',
  'Needs More Information': 'warn',
  'Does Not Match': 'danger',
};

// Always uses "Likely eligible" wording; never "Guaranteed eligible".
export function EligibilityBadge({ status }: { status: EligibilityStatus }) {
  return (
    <span data-nexen-component="EligibilityBadge" data-nexen-id="nx-14a79ebb-1">
      <Badge tone={ELIGIBILITY_TONE[status]} data-nexen-id="nx-14a79ebb-2">{status}</Badge>
    </span>
  );
}
