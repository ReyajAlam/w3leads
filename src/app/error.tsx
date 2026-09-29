'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <Container className="text-center py-20">
        <h1 className="font-heading text-5xl text-ink mb-4">
          Something went wrong
        </h1>
        <p className="text-ink-muted text-lg mb-8 max-w-md mx-auto">
          We ran into an unexpected issue. Please try again, or contact support
          if the problem persists.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="secondary">
            Go Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
