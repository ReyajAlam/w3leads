import { HeroSection } from '@/components/sections/HeroSection';
import { TrustedBySection } from '@/components/sections/TrustedBySection';
import { MetricsSection } from '@/components/sections/MetricsSection';
import { FeaturesBentoSection } from '@/components/sections/FeaturesBentoSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { DataQualitySection } from '@/components/sections/DataQualitySection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CallToActionSection } from '@/components/sections/CallToActionSection';

/**
 * Landing page composing all marketing sections.
 * Server Component — all interactive child components use "use client" individually.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <MetricsSection />
      <FeaturesBentoSection />
      <WorkflowSection />
      <DataQualitySection />
      <UseCasesSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CallToActionSection />
    </>
  );
}
