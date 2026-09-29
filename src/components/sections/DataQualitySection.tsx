'use client';

import { Container } from '@/components/ui/Container';
import { DATA_QUALITY_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/** SVG progress ring component */
function ProgressRing({
  value,
  color,
  label,
  isVisible,
  delay,
}: {
  value: number;
  color: 'primary' | 'accent';
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorClasses = {
    primary: { stroke: 'var(--color-primary)', text: 'text-primary' },
    accent: { stroke: 'var(--color-accent)', text: 'text-accent' },
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={colorClasses[color].stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            className="transition-[stroke-dashoffset] duration-[1500ms] ease-out"
            style={{ transitionDelay: `${delay}ms` }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-heading font-bold ${colorClasses[color].text}`}>
            {value}%
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-ink-muted text-center">
        {label}
      </span>
    </div>
  );
}

/** Data quality / accuracy highlight section with SVG progress rings */
export function DataQualitySection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28"
      aria-labelledby="quality-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div className={`fade-in-up ${isVisible ? 'visible' : ''}`}>
            <h2 id="quality-heading" className="font-heading text-ink mb-4">
              {DATA_QUALITY_CONTENT.headline}
            </h2>
            <p className="text-ink-muted text-lg leading-relaxed mb-8">
              {DATA_QUALITY_CONTENT.subheadline}
            </p>

            {/* Quick stats bar */}
            <div className="grid grid-cols-3 gap-4">
              {DATA_QUALITY_CONTENT.metrics.map((m) => (
                <div key={m.label} className="text-center p-4 bg-surface-tint rounded-[var(--radius-md)]">
                  <div className={`text-2xl font-heading font-bold ${m.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                    {m.value}%
                  </div>
                  <div className="text-xs text-ink-muted mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Progress Rings */}
          <div
            className={`flex flex-wrap justify-center gap-8 lg:gap-10 fade-in-up delay-200 ${
              isVisible ? 'visible' : ''
            }`}
          >
            {DATA_QUALITY_CONTENT.metrics.map((m, i) => (
              <ProgressRing
                key={m.label}
                value={m.value}
                color={m.color}
                label={m.label}
                isVisible={isVisible}
                delay={i * 200}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
