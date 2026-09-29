import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { getSessionToken } from '@/lib/auth/session';
import { createPageMetadata } from '@/lib/seo/metadata';
import { clientEnv } from '@/config/env';

export const metadata: Metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to your W3Leads account to access verified B2B contact data.',
  path: '/login',
  noIndex: true,
});

export default async function LoginPage() {
  // If session already exists, redirect to dashboard
  const token = await getSessionToken();
  if (token) {
    redirect(clientEnv.NEXT_PUBLIC_DASHBOARD_URL);
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="p-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-heading text-xl font-bold text-ink"
          aria-label="W3Leads home"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
            <path
              d="M8 22L12 10L16 18L20 10L24 22"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>W3Leads</span>
        </Link>
      </header>

      {/* Main */}
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-5 py-12"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl text-ink mb-2">
              Welcome back
            </h1>
            <p className="text-ink-muted">
              Sign in to access your W3Leads dashboard
            </p>
          </div>

          <div className="bg-surface rounded-[var(--radius-lg)] border border-border p-6 lg:p-8 shadow-sm">
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-5 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} W3Leads. All rights reserved.
      </footer>
    </div>
  );
}
