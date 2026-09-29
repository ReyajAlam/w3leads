export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/** Primary navigation links (header) */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Product', href: '/#product' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
];

/** Footer navigation organised by column */
export const FOOTER_NAV = {
  product: {
    title: 'Product',
    links: [
      { label: 'Email Finder', href: '/#features' },
      { label: 'Data Enrichment', href: '/#features' },
      { label: 'CRM Export', href: '/#features' },
      { label: 'API Access', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '#' },
      { label: 'API Docs', href: '#' },
      { label: 'Integrations', href: '#' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
} as const;
