/** WordPress REST API type definitions */

/** Raw WP post response shape from /wp/v2/posts?_embed */
export interface WpRawPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      avatar_urls?: Record<string, string>;
    }>;
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: Record<
          string,
          {
            source_url: string;
            width: number;
            height: number;
          }
        >;
      };
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

/** Normalized post shape used in the frontend */
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  modifiedAt: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  author: {
    name: string;
    avatarUrl: string | null;
  };
  categories: Array<{
    name: string;
    slug: string;
  }>;
}

/** API response for paginated blog list */
export interface BlogListResponse {
  posts: BlogPost[];
  totalPages: number;
  totalPosts: number;
}
