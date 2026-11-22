import type { Metadata } from 'next';
import '@/styles/tokens.css';
import './globals.css';
import { AppNav } from '@/components/AppNav';
import { NexenInspector } from '@/components/_internal/NexenInspector';

export const metadata: Metadata = {
  title: 'AVASAR AI',
  description:
    'Discover government scholarships and schemes you may qualify for, understand the requirements and find your next step.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <NexenInspector />
        <AppNav />
        {children}
      </body>
    </html>
  );
}
