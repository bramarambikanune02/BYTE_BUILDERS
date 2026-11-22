// 404 — page not found (replaces the "Coming soon — generating" skeleton).
export default function NotFound() {
	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
			<h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
			<p className="text-muted-foreground">The page you are looking for does not exist.</p>
			<a
				href="/"
				className="inline-flex items-center rounded-[var(--radius)] bg-primary px-4 py-2 font-medium text-primary-foreground"
			>
				Go home
			</a>
		</main>
	);
}
