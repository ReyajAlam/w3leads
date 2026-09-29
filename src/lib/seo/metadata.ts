import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generates consistent Next.js Metadata for any page.
 * Handles canonical, OG, Twitter cards, and robots directives.
 */
export function createPageMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const image = ogImage ?? `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: SITE_CONFIG.twitter,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
