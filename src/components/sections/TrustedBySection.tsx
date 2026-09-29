import { Container } from '@/components/ui/Container';
import { TRUST_CONTENT } from '@/content/landingContent';

/** Trust strip with grayscale SVG logo placeholders */
export function TrustedBySection() {
  return (
    <section className="py-12 border-y border-border" aria-label="Trusted by">
      <Container>
        <p className="text-center text-sm text-ink-muted mb-8 font-medium">
          {TRUST_CONTENT.headline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {TRUST_CONTENT.logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-ink-muted opacity-60 select-none"
              aria-label={logo.name}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  width="32"
                  height="32"
                  rx="6"
                  fill="currentColor"
                  opacity="0.15"
                />
                <text
                  x="16"
                  y="20"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                >
                  {logo.initials}
                </text>
              </svg>
              <span className="text-sm font-semibold tracking-wide hidden sm:inline">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
