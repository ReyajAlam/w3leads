'use client';

import { Container } from '@/components/ui/Container';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { METRICS_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/** Stats band with 4 animated-on-view counters */
export function MetricsSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-16 lg:py-20 bg-surface-tint"
      aria-label="Key metrics"
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {METRICS_CONTENT.map((metric, i) => (
            <div
              key={metric.label}
              className={`text-center fade-in-up ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-heading text-4xl lg:text-5xl font-bold text-ink mb-2">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                />
              </div>
              <p className="text-sm text-ink-muted font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
