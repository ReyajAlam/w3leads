'use client';

import { Container } from '@/components/ui/Container';
import { TESTIMONIALS_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/** Testimonials section with 3 cards and initials avatars */
export function TestimonialsSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-surface-tint"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className={`text-center max-w-2xl mx-auto mb-14 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 id="testimonials-heading" className="font-heading text-ink mb-4">
            Trusted by Growth Leaders
          </h2>
          <p className="text-ink-muted text-lg">
            Hear from sales and marketing leaders who transformed their pipeline with W3Leads.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS_CONTENT.map((testimonial, i) => (
            <figure
              key={testimonial.name}
              className={`
                bg-surface rounded-[var(--radius-lg)] border border-border p-6 lg:p-8
                hover:shadow-lg transition-shadow duration-300
                fade-in-up ${isVisible ? 'visible' : ''}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <svg
                    key={starIdx}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="var(--color-accent)"
                    aria-hidden="true"
                  >
                    <path d="M8 0l2.472 5.018L16 5.82l-4 3.898.944 5.502L8 12.616 3.056 15.22 4 9.718 0 5.82l5.528-.802z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm text-ink leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                {/* Initials Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <cite className="not-italic text-sm font-semibold text-ink block">
                    {testimonial.name}
                  </cite>
                  <span className="text-xs text-ink-muted">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
