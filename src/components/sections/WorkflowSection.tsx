'use client';

import { Container } from '@/components/ui/Container';
import { WORKFLOW_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/** How-it-works section with 3 numbered steps and connecting line */
export function WorkflowSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-surface-tint"
      aria-labelledby="workflow-heading"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 id="workflow-heading" className="font-heading text-ink mb-4">
            How W3Leads Works
          </h2>
          <p className="text-ink-muted text-lg">
            Three simple steps from search to outreach. Start closing deals in minutes, not weeks.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting Line (desktop only) */}
          <div
            className="hidden lg:block absolute left-[28px] top-[56px] bottom-[56px] w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-8 lg:space-y-12">
            {WORKFLOW_CONTENT.map((step, i) => (
              <div
                key={step.step}
                className={`
                  relative flex flex-col lg:flex-row items-start gap-5 lg:gap-8
                  fade-in-up ${isVisible ? 'visible' : ''}
                `}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Step Number */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white font-heading text-xl font-bold shrink-0 shadow-md">
                  {step.step}
                </div>

                {/* Step Content */}
                <div className="bg-surface rounded-[var(--radius-lg)] border border-border p-6 lg:p-8 flex-1 shadow-sm">
                  <h3 className="font-heading text-xl text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
