'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HERO_CONTENT } from '@/content/landingContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Search } from 'lucide-react';

/**
 * Hero section with split layout: headline + search input on left,
 * CSS/SVG product preview card on right.
 */
export function HeroSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="product"
      className="pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Copy + CTA */}
        <div className={`fade-in-up ${isVisible ? 'visible' : ''}`}>
          <Badge variant="accent" className="mb-6">
            155M+ verified B2B contacts
          </Badge>

          <h1
            id="hero-heading"
            className="font-heading text-ink mb-6 whitespace-pre-line"
          >
            {HERO_CONTENT.headline}
          </h1>

          <p className="text-lg text-ink-muted leading-relaxed max-w-lg mb-8">
            {HERO_CONTENT.subheadline}
          </p>

          {/* Search Input CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 max-w-lg">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder={HERO_CONTENT.ctaPlaceholder}
                aria-label="Search for a company or domain"
                className="w-full h-12 pl-12 pr-4 rounded-[var(--radius-md)] border border-border bg-surface text-ink placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
            <Button href="/login" size="lg" className="shrink-0">
              {HERO_CONTENT.ctaLabel}
            </Button>
          </div>

          <p className="text-sm text-ink-muted">
            {HERO_CONTENT.trustLine}
          </p>
        </div>

        {/* Right — Product Preview Card */}
        <div
          className={`fade-in-up delay-200 ${isVisible ? 'visible' : ''}`}
          aria-hidden="true"
        >
          <ProductPreviewCard />
        </div>
      </Container>
    </section>
  );
}

/**
 * CSS/SVG-built mock lead table card with floating stat chips.
 * Purely decorative — no heavy images.
 */
function ProductPreviewCard() {
  const leads = [
    { name: 'Sarah Chen', title: 'VP of Sales', company: 'TechCorp', verified: true },
    { name: 'Michael Brown', title: 'CTO', company: 'DataFlow', verified: true },
    { name: 'Emily Rodriguez', title: 'Head of Growth', company: 'ScaleUp', verified: true },
    { name: 'James Wilson', title: 'Director', company: 'CloudSync', verified: false },
  ];

  return (
    <div className="relative">
      {/* Floating Stat Chips */}
      <div className="absolute -top-4 -right-2 z-10 bg-surface rounded-[var(--radius-md)] shadow-lg px-4 py-3 border border-border">
        <div className="text-xs text-ink-muted mb-0.5">Accuracy Rate</div>
        <div className="text-xl font-bold text-primary font-heading">95.7%</div>
      </div>

      <div className="absolute -bottom-3 -left-2 z-10 bg-surface rounded-[var(--radius-md)] shadow-lg px-4 py-3 border border-border">
        <div className="text-xs text-ink-muted mb-0.5">Contacts Found</div>
        <div className="text-xl font-bold text-accent font-heading">2,847</div>
      </div>

      {/* Main Card */}
      <div className="bg-surface rounded-[var(--radius-lg)] shadow-xl border border-border overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-tint">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-coral" />
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-xs text-ink-muted font-medium">Lead Finder</span>
          <div className="w-14" />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr_80px] gap-3 px-5 py-2.5 text-xs font-semibold text-ink-muted uppercase tracking-wider border-b border-border">
          <span>Name</span>
          <span>Title</span>
          <span>Company</span>
          <span className="text-center">Status</span>
        </div>

        {/* Table Rows */}
        {leads.map((lead, i) => (
          <div
            key={lead.name}
            className={`grid grid-cols-[1fr_1fr_1fr_80px] gap-3 px-5 py-3 text-sm items-center ${
              i < leads.length - 1 ? 'border-b border-border' : ''
            } hover:bg-surface-tint transition-colors`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                {lead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="font-medium text-ink truncate">{lead.name}</span>
            </div>
            <span className="text-ink-muted truncate">{lead.title}</span>
            <span className="text-ink-muted truncate">{lead.company}</span>
            <div className="flex justify-center">
              {lead.verified ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 5.22a.75.75 0 0 0-1.06 0L7 8.94 5.28 7.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0 0-1.06Z" />
                  </svg>
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted bg-surface-tint px-2 py-0.5 rounded-full">
                  Pending
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Card Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface-tint border-t border-border">
          <span className="text-xs text-ink-muted">Showing 4 of 2,847 results</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <span
                key={p}
                className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${
                  p === 1
                    ? 'bg-primary text-white'
                    : 'text-ink-muted hover:bg-surface-tint'
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
