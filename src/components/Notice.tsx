// Inline loading / error / empty notice used by data-backed pages.
export function Notice({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'error' | 'empty';
  children: React.ReactNode;
}) {
  const cls =
    tone === 'error'
      ? 'border-destructive/40 text-destructive'
      : 'border-border text-muted-foreground';
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      data-nexen-component="Notice"
      className={`rounded-lg border bg-card p-6 text-sm ${cls}`}
    >
      {children}
    </div>
  );
}
