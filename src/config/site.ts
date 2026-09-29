/** Central site metadata used across SEO, layout, and structured data */
export const SITE_CONFIG = {
  name: 'W3Leads',
  tagline: 'Find Decision-Makers, Close Deals Faster',
  description:
    'W3Leads is the B2B contact data platform trusted by 5,000+ sales teams. Find verified emails, direct dials, and company data with 95%+ accuracy.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://w3leads.in',
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://dashboard.w3leads.in',
  locale: 'en_US',
  twitter: '@w3leads',
  ogImage: '/og-image.png',
  themeColor: '#0F5D4A',
} as const;

export type SiteConfig = typeof SITE_CONFIG;
