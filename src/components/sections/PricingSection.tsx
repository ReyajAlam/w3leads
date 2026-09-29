'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PRICING_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Check } from 'lucide-react';

/** Pricing section with monthly/yearly toggle and 3 plan cards */
export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="pricing"
      className="py-20 lg:py-28"
      aria-labelledby="pricing-heading"
    >
      <Container>
        <div className={`text-center max-w-2xl mx-auto mb-12 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 id="pricing-heading" className="font-heading text-ink mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-ink-muted text-lg mb-8">
            Start free, upgrade when you&apos;re ready. No hidden fees, no long-term contracts.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center gap-3 bg-surface-tint rounded-[var(--radius-full)] p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 text-sm font-medium rounded-[var(--radius-full)] transition-all cursor-pointer min-h-[40px] ${
                !isYearly
                  ? 'bg-surface text-ink shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
              aria-pressed={!isYearly}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 text-sm font-medium rounded-[var(--radius-full)] transition-all cursor-pointer min-h-[40px] ${
                isYearly
                  ? 'bg-surface text-ink shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
              aria-pressed={isYearly}
            >
              Yearly
              <span className="ml-1.5 text-xs text-primary font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {PRICING_CONTENT.map((plan, i) => (
            <div
              key={plan.name}
              className={`
                relative rounded-[var(--radius-lg)] border p-6 lg:p-8
                fade-in-up ${isVisible ? 'visible' : ''}
                ${
                  plan.highlighted
                    ? 'bg-primary text-white border-primary shadow-xl scale-[1.02] lg:scale-105'
                    : 'bg-surface border-border hover:shadow-lg hover:-translate-y-0.5'
                }
                transition-all duration-300
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-dark text-xs font-bold px-4 py-1 rounded-[var(--radius-full)]">
                  Most Popular
                </div>
              )}

              <h3
                className={`font-heading text-xl mb-1 ${
                  plan.highlighted ? 'text-white' : 'text-ink'
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted ? 'text-primary-light' : 'text-ink-muted'
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <span
                  className={`text-4xl font-heading font-bold ${
                    plan.highlighted ? 'text-white' : 'text-ink'
                  }`}
                >
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span
                  className={`text-sm ml-1 ${
                    plan.highlighted ? 'text-primary-light' : 'text-ink-muted'
                  }`}
                >
                  /month
                </span>
              </div>

              <p
                className={`text-sm font-medium mb-6 pb-6 border-b ${
                  plan.highlighted
                    ? 'text-white border-white/20'
                    : 'text-ink border-border'
                }`}
              >
                {plan.credits}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-accent' : 'text-primary'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? 'text-white' : 'text-ink-muted'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                href="/login"
                variant={plan.highlighted ? 'secondary' : 'primary'}
                className="w-full"
              >
                {plan.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
