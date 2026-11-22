// Labelled form input that shows its validation error inline.
export function FormField({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string | null;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-nexen-component="FormField" className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold" data-nexen-id="nx-7126768e-0">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground" data-nexen-id="nx-7126768e-1">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive" data-nexen-id="nx-7126768e-2">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  'h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring';
