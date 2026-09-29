import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { fetchAllPostSlugs } from '@/lib/wordpress/client';

/**
 * Dynamic sitemap including static pages and all blog posts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Blog post pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await fetchAllPostSlugs();
    blogPages = slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('[Sitemap] Failed to fetch blog slugs:', error);
  }

  return [...staticPages, ...blogPages];
}
