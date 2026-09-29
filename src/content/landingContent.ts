/**
 * All landing page copy and data, separated from JSX.
 * Changing copy never requires touching component files.
 */

export const HERO_CONTENT = {
  headline: 'Find the Right Leads.\nClose More Deals.',
  subheadline:
    'Access 155M+ verified B2B contacts with real-time email verification. Stop wasting time on bad data — connect with decision-makers who actually convert.',
  ctaLabel: 'Start Finding Leads',
  ctaPlaceholder: 'Enter a company name or domain…',
  trustLine: 'No credit card required · 50 free credits · Cancel anytime',
} as const;

export const TRUST_CONTENT = {
  headline: 'Trusted by 5,000+ sales teams worldwide',
  logos: [
    { name: 'Acme Corp', initials: 'AC' },
    { name: 'Beacon Digital', initials: 'BD' },
    { name: 'Craftwork', initials: 'CW' },
    { name: 'DataSync', initials: 'DS' },
    { name: 'Evergreen', initials: 'EG' },
    { name: 'FocusPoint', initials: 'FP' },
  ],
} as const;

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
}

export const METRICS_CONTENT: MetricItem[] = [
  { value: 155, suffix: 'M+', label: 'Verified Contacts' },
  { value: 95, suffix: '%', label: 'Data Accuracy' },
  { value: 200, suffix: '+', label: 'Countries Covered' },
  { value: 16, suffix: 'M+', label: 'Companies Indexed' },
];

export interface FeatureItem {
  title: string;
  description: string;
  icon: string; // icon key for inline SVG
  span?: 'wide' | 'tall'; // bento grid sizing
}

export const FEATURES_CONTENT: FeatureItem[] = [
  {
    title: 'Email Finder',
    description:
      'Find verified business emails for any prospect in seconds. Build targeted contact lists without manual research.',
    icon: 'email',
    span: 'wide',
  },
  {
    title: 'Verified Data',
    description:
      'Every contact is verified in real-time before delivery. No more bounced emails destroying your sender reputation.',
    icon: 'verified',
  },
  {
    title: 'Advanced Filters',
    description:
      'Filter by industry, company size, location, job title, technology stack, and 50+ other criteria.',
    icon: 'filter',
  },
  {
    title: 'CRM Export',
    description:
      'Export directly to Salesforce, HubSpot, Pipedrive, or download as CSV. Seamless workflow integration.',
    icon: 'export',
    span: 'wide',
  },
  {
    title: 'Real-Time Verification',
    description:
      'Our multi-step verification catches invalid emails before they reach your outbox, ensuring 95%+ deliverability.',
    icon: 'realtime',
  },
  {
    title: 'API Access',
    description:
      'Integrate W3Leads into your own tools with our RESTful API. Enrich data programmatically at scale.',
    icon: 'api',
  },
];

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export const WORKFLOW_CONTENT: WorkflowStep[] = [
  {
    step: 1,
    title: 'Define Your Audience',
    description:
      'Use 50+ filters to narrow down your ideal customer profile — by industry, location, company size, tech stack, and more.',
  },
  {
    step: 2,
    title: 'Get Verified Contacts',
    description:
      'Instantly access verified email addresses and direct dials. Every contact is checked in real-time before delivery.',
  },
  {
    step: 3,
    title: 'Export & Close',
    description:
      'Push contacts directly to your CRM or download as CSV. Start your outreach campaign and close deals faster.',
  },
];

export const DATA_QUALITY_CONTENT = {
  headline: 'Data You Can Actually Trust',
  subheadline:
    'Unlike other providers, we verify every email address in real-time before you see it. The result: industry-leading accuracy that protects your sender reputation.',
  metrics: [
    { label: 'Email Accuracy', value: 95, color: 'primary' as const },
    { label: 'Phone Accuracy', value: 90, color: 'accent' as const },
    { label: 'Company Data Match', value: 97, color: 'primary' as const },
  ],
};

export interface UseCaseTab {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
}

export const USE_CASES_CONTENT: UseCaseTab[] = [
  {
    id: 'sales',
    label: 'Sales',
    title: 'Supercharge Your Sales Pipeline',
    description:
      'Build hyper-targeted prospect lists and reach decision-makers directly. Spend less time researching and more time selling.',
    bullets: [
      'Find direct emails for C-suite and VP-level contacts',
      'Filter by company revenue, size, and funding stage',
      'Sync prospects directly to your CRM in one click',
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    title: 'Build High-Converting Audiences',
    description:
      'Create precision-targeted contact lists for ABM campaigns. Reach the right people with the right message at the right time.',
    bullets: [
      'Segment audiences by industry and tech stack',
      'Enrich existing lists with verified data',
      'Improve campaign deliverability with real-time verification',
    ],
  },
  {
    id: 'recruiters',
    label: 'Recruiters',
    title: 'Find Top Talent Faster',
    description:
      'Source candidates directly without relying on job boards. Get verified contact details for passive candidates in any industry.',
    bullets: [
      'Search by job title, seniority, and location',
      'Access direct emails beyond LinkedIn InMail limits',
      'Build talent pools for future hiring needs',
    ],
  },
  {
    id: 'agencies',
    label: 'Agencies',
    title: 'Deliver Results for Every Client',
    description:
      'Provide verified lead data to your clients at scale. White-label-ready data enrichment that makes your agency indispensable.',
    bullets: [
      'Multi-client workspace management',
      'API access for custom integrations',
      'Scalable credits across client accounts',
    ],
  },
];

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  credits: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

export const PRICING_CONTENT: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'For individuals getting started with outbound.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    credits: '500 credits/mo',
    features: [
      '500 verified contacts',
      'Email finder',
      'Basic filters',
      'CSV export',
      'Email support',
    ],
    ctaLabel: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'For growing teams that need verified data at scale.',
    monthlyPrice: 99,
    yearlyPrice: 79,
    credits: '2,500 credits/mo',
    features: [
      '2,500 verified contacts',
      'Email + phone finder',
      'Advanced filters',
      'CRM integrations',
      'Real-time verification',
      'Priority support',
    ],
    highlighted: true,
    ctaLabel: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    description: 'For organisations needing unlimited power.',
    monthlyPrice: 249,
    yearlyPrice: 199,
    credits: '10,000 credits/mo',
    features: [
      '10,000 verified contacts',
      'Full API access',
      'Team management',
      'Custom integrations',
      'Dedicated account manager',
      'SSO & security controls',
    ],
    ctaLabel: 'Contact Sales',
  },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export const TESTIMONIALS_CONTENT: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'VP of Sales',
    company: 'TechForge',
    quote:
      'W3Leads transformed our outbound strategy. We went from a 12% bounce rate to under 3% — and our pipeline grew 40% in the first quarter.',
    initials: 'SM',
  },
  {
    name: 'James Park',
    role: 'Growth Lead',
    company: 'ScaleUp Agency',
    quote:
      'The data quality is genuinely best-in-class. We\'ve tried four other providers, and W3Leads is the only one that consistently delivers accurate contacts.',
    initials: 'JP',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Demand Gen',
    company: 'CloudNova',
    quote:
      'Our ABM campaigns finally hit the right inboxes. The advanced filters let us build exactly the audience segments our clients need.',
    initials: 'PS',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_CONTENT: FaqItem[] = [
  {
    question: 'How accurate is W3Leads data?',
    answer:
      'Our data maintains 95%+ accuracy through real-time verification. Every email is validated before it\'s delivered to you, ensuring high deliverability and protecting your sender reputation.',
  },
  {
    question: 'Do I need a credit card to start?',
    answer:
      'No. You can sign up for a free account with 50 credits — no credit card required. Upgrade anytime when you\'re ready to scale.',
  },
  {
    question: 'What CRMs do you integrate with?',
    answer:
      'W3Leads integrates directly with Salesforce, HubSpot, Pipedrive, Outreach, and Salesloft. You can also export data as CSV or use our API for custom integrations.',
  },
  {
    question: 'Is W3Leads GDPR compliant?',
    answer:
      'Yes. We are fully GDPR compliant. All data is sourced from publicly available information and processed in accordance with data protection regulations. Users can request data deletion at any time.',
  },
  {
    question: 'How is W3Leads different from other providers?',
    answer:
      'Unlike providers that sell stale databases, W3Leads verifies every contact in real-time before delivery. This means higher accuracy, fewer bounces, and better ROI on your outreach campaigns.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Absolutely. There are no long-term contracts. You can upgrade, downgrade, or cancel your plan at any time from your dashboard.',
  },
];

export const CTA_CONTENT = {
  headline: 'Ready to Find Your Next Customer?',
  subheadline:
    'Join 5,000+ sales teams using W3Leads to find verified contacts and close more deals. Start free — no credit card required.',
  ctaLabel: 'Get Started Free',
  secondaryCtaLabel: 'Talk to Sales',
} as const;
