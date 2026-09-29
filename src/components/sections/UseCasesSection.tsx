'use client';

import { Container } from '@/components/ui/Container';
import { Tabs } from '@/components/ui/Tabs';
import { USE_CASES_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { CheckCircle } from 'lucide-react';

/** Use cases tabbed section (Sales, Marketing, Recruiters, Agencies) */
export function UseCasesSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const tabItems = USE_CASES_CONTENT.map((useCase) => ({
    id: useCase.id,
    label: useCase.label,
    content: (
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <h3 className="font-heading text-2xl text-ink mb-3">
            {useCase.title}
          </h3>
          <p className="text-ink-muted leading-relaxed mb-6">
            {useCase.description}
          </p>
          <ul className="space-y-3">
            {useCase.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <CheckCircle
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm text-ink leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative card */}
        <div className="bg-surface-tint rounded-[var(--radius-lg)] border border-border p-8 hidden lg:flex items-center justify-center min-h-[240px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <p className="text-sm text-ink-muted font-medium">
              Tailored for {useCase.label.toLowerCase()} professionals
            </p>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-surface-tint"
      aria-labelledby="usecases-heading"
    >
      <Container>
        <div className={`text-center max-w-2xl mx-auto mb-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 id="usecases-heading" className="font-heading text-ink mb-4">
            Built for Every Growth Team
          </h2>
          <p className="text-ink-muted text-lg">
            Whether you&apos;re in sales, marketing, recruiting, or running an agency — W3Leads adapts to your workflow.
          </p>
        </div>

        <div className={`fade-in-up delay-200 ${isVisible ? 'visible' : ''}`}>
          <Tabs items={tabItems} />
        </div>
      </Container>
    </section>
  );
}
