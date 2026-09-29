'use client';

import { Container } from '@/components/ui/Container';
import { FEATURES_CONTENT, type FeatureItem } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/** Inline SVG icons for features, keyed by feature icon name */
function FeatureIcon({ name, className = '' }: { name: string; className?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    email: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
    verified: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    filter: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    export: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    realtime: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    api: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  };

  return <>{iconMap[name] ?? null}</>;
}

/** Feature card for the bento grid */
function FeatureCard({ feature, index, isVisible }: { feature: FeatureItem; index: number; isVisible: boolean }) {
  return (
    <div
      className={`
        group relative bg-surface rounded-[var(--radius-lg)] border border-border p-6 lg:p-8
        hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300
        fade-in-up ${isVisible ? 'visible' : ''}
        ${feature.span === 'wide' ? 'sm:col-span-2' : ''}
        ${feature.span === 'tall' ? 'sm:row-span-2' : ''}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-11 h-11 rounded-[var(--radius-md)] bg-primary-light flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <FeatureIcon name={feature.icon} className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-heading font-semibold text-ink mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

/** Features bento grid with asymmetric cards */
export function FeaturesBentoSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="features"
      className="py-20 lg:py-28"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 id="features-heading" className="font-heading text-ink mb-4">
            Everything You Need to Find Quality Leads
          </h2>
          <p className="text-ink-muted text-lg">
            A complete B2B prospecting toolkit — from finding contacts to verifying data to exporting into your workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {FEATURES_CONTENT.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
