import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CTA_CONTENT } from '@/content/landingContent';

/** Final CTA band on warm charcoal background */
export function CallToActionSection() {
  return (
    <section
      className="py-20 lg:py-24 bg-dark"
      aria-labelledby="cta-heading"
    >
      <Container className="text-center">
        <h2
          id="cta-heading"
          className="font-heading text-white mb-4 max-w-2xl mx-auto"
        >
          {CTA_CONTENT.headline}
        </h2>
        <p className="text-dark-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {CTA_CONTENT.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/login" size="lg">
            {CTA_CONTENT.ctaLabel}
          </Button>
          <Button href="/login" variant="secondary" size="lg">
            {CTA_CONTENT.secondaryCtaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
