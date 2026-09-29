import { getWpPostsBaseUrl, getWpSinglePostUrl } from '@/config/env';
import type { WpRawPost, BlogPost, BlogListResponse } from './types';
import { mapWpPostToBlogPost } from './mappers';

const POSTS_PER_PAGE = 9;

/**
 * Fetches a paginated list of posts from the WordPress REST API.
 * Uses ?_embed for featured images and author data.
 *
 * @param page - Page number (1-indexed)
 * @returns Posts array with pagination metadata
 */
export async function fetchBlogPosts(page = 1): Promise<BlogListResponse> {
  const baseUrl = getWpPostsBaseUrl();
  const url = `${baseUrl}?_embed&per_page=${POSTS_PER_PAGE}&page=${page}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[WP API] Failed to fetch posts: ${res.status} ${res.statusText}`);
      return { posts: [], totalPages: 0, totalPosts: 0 };
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '0', 10);
    const totalPosts = parseInt(res.headers.get('X-WP-Total') ?? '0', 10);
    const rawPosts: WpRawPost[] = await res.json();

    return {
      posts: rawPosts.map(mapWpPostToBlogPost),
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.error('[WP API] Network error fetching posts:', error);
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
}

/**
 * Fetches a single post by its slug.
 * Falls back gracefully on errors.
 */
export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const baseUrl = getWpPostsBaseUrl();
  const url = `${baseUrl}?slug=${encodeURIComponent(slug)}&_embed`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[WP API] Failed to fetch post by slug "${slug}": ${res.status}`);
      return null;
    }

    const rawPosts: WpRawPost[] = await res.json();
    if (rawPosts.length === 0) return null;

    return mapWpPostToBlogPost(rawPosts[0]);
  } catch (error) {
    console.error(`[WP API] Network error fetching post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches a single post by its numeric ID.
 * Uses the WP_SINGLE_POST_API pattern to build the URL.
 */
export async function fetchPostById(id: number): Promise<BlogPost | null> {
  const url = `${getWpSinglePostUrl(id)}?_embed`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[WP API] Failed to fetch post by ID ${id}: ${res.status}`);
      return null;
    }

    const rawPost: WpRawPost = await res.json();
    return mapWpPostToBlogPost(rawPost);
  } catch (error) {
    console.error(`[WP API] Network error fetching post by ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches all post slugs for static generation (generateStaticParams).
 * Iterates through all pages to get complete slug list.
 */
export async function fetchAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { posts, totalPages } = await fetchBlogPosts(page);
    slugs.push(...posts.map((p) => p.slug));
    hasMore = page < totalPages;
    page++;
  }

  return slugs;
}
