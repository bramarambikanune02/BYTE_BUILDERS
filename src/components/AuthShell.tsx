import Link from 'next/link';

// Shared shell for sign-in, sign-up, forgot and reset password screens.
export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main data-nexen-component="AuthShell" className="mx-auto max-w-md px-6 py-16" data-nexen-id="nx-89ccb5a5-0">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <img src="/nexen-logo.svg" alt="AVASAR AI logo" width={48} height={48}  data-nexen-id="nx-89ccb5a5-1"/>
        <h1 className="text-2xl font-bold" data-nexen-id="nx-89ccb5a5-2">{title}</h1>
        <p className="text-sm text-muted-foreground" data-nexen-id="nx-89ccb5a5-3">{description}</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">{children}</div>
      {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      <p className="mt-8 text-center text-xs text-muted-foreground" data-nexen-id="nx-89ccb5a5-4">
        AVASAR AI is an independent informational assistance service and is not an official government website.{' '}
        <Link href="/privacy" className="underline" data-nexen-id="nx-89ccb5a5-5">Privacy</Link>
      </p>
    </main>
  );
}
