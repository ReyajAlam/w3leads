import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <Container className="text-center py-20">
        <h1 className="font-heading text-7xl text-primary mb-4">404</h1>
        <h2 className="font-heading text-2xl text-ink mb-4">Page Not Found</h2>
        <p className="text-ink-muted text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/blog" variant="secondary">
            Read Blog
          </Button>
        </div>
      </Container>
    </div>
  );
}
