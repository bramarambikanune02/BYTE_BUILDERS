export function ProgressMeter({ value, label }: { value: number; label: string }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div data-nexen-component="ProgressMeter" className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground" data-nexen-id="nx-1d9e6c57-0">{label}</span>
        <span className="font-semibold" data-nexen-id="nx-1d9e6c57-1">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={label}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
