// Shared page chrome: eyebrow, title, description.
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header data-nexen-component="PageHeader" className="mb-8 space-y-2" data-nexen-id="nx-8bc82b36-0">
      {eyebrow && <p className="text-sm font-semibold text-primary" data-nexen-id="nx-8bc82b36-1">{eyebrow}</p>}
      <h1 className="text-3xl font-bold tracking-tight" data-nexen-id="nx-8bc82b36-2">{title}</h1>
      {description && <p className="max-w-2xl text-muted-foreground" data-nexen-id="nx-8bc82b36-3">{description}</p>}
    </header>
  );
}
