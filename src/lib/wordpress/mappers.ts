import type { WpRawPost, BlogPost } from './types';

/**
 * Decodes common HTML entities in strings (e.g. WP titles).
 */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&nbsp;/g, ' ');
}

/**
 * Strips HTML tags from a string and trims to a max length.
 */
function stripHtml(html: string, maxLength = 200): string {
  const text = html.replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/**
 * Maps a raw WordPress post response to the normalized BlogPost shape.
 */
export function mapWpPostToBlogPost(raw: WpRawPost): BlogPost {
  const featuredMedia = raw._embedded?.['wp:featuredmedia']?.[0];
  const author = raw._embedded?.author?.[0];
  const categories = raw._embedded?.['wp:term']?.[0] ?? [];

  return {
    id: raw.id,
    slug: raw.slug,
    title: decodeHtmlEntities(raw.title.rendered),
    excerpt: stripHtml(decodeHtmlEntities(raw.excerpt.rendered)),
    content: raw.content.rendered,
    publishedAt: raw.date_gmt || raw.date,
    modifiedAt: raw.modified_gmt || raw.modified,
    featuredImage: featuredMedia
      ? {
          url: featuredMedia.source_url,
          alt: featuredMedia.alt_text || decodeHtmlEntities(raw.title.rendered),
          width: featuredMedia.media_details?.width ?? 800,
          height: featuredMedia.media_details?.height ?? 450,
        }
      : null,
    author: {
      name: author?.name ?? 'W3Leads Team',
      avatarUrl: author?.avatar_urls?.['96'] ?? null,
    },
    categories: categories.map((cat) => ({
      name: decodeHtmlEntities(cat.name),
      slug: cat.slug,
    })),
  };
}
