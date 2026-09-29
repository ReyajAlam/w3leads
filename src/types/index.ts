/**
 * Central type definitions for W3Leads marketing application.
 */

export type * from '@/lib/wordpress/types';
export type * from '@/lib/auth/loginService';

/** Navigation link item */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Footer navigation column */
export interface FooterColumn {
  title: string;
  links: NavItem[];
}

/** Metric counter data */
export interface MetricData {
  value: number;
  suffix: string;
  label: string;
}

/** Feature bento item */
export interface FeatureData {
  title: string;
  description: string;
  icon: string;
  span?: 'wide' | 'tall';
}

/** Step in the workflow section */
export interface WorkflowStepData {
  step: number;
  title: string;
  description: string;
}

/** Use case data */
export interface UseCaseData {
  id: string;
  label: string;
  title: string;
  description: string;
  benefits: string[];
}

/** Pricing tier plan */
export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

/** Testimonial quote */
export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

/** FAQ item */
export interface FaqData {
  question: string;
  answer: string;
}
