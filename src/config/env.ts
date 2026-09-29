import { z } from 'zod';

/**
 * Server-side environment variables schema.
 * These are only available in server components and API routes.
 */
const serverEnvSchema = z.object({
  WP_POSTS_API: z
    .string()
    .url('WP_POSTS_API must be a valid URL')
    .default('https://wpthrust.in//wp-json/wp/v2/posts/'),
  WP_SINGLE_POST_API: z
    .string()
    .url('WP_SINGLE_POST_API must be a valid URL')
    .default('https://wpthrust.in//wp-json/wp/v2/posts/2196'),
  LOGIN_API: z
    .string()
    .url('LOGIN_API must be a valid URL')
    .default('https://api-crm.wpthrust.in/api/login'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Client-side environment variables schema.
 * These are exposed to the browser via the NEXT_PUBLIC_ prefix.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL must be a valid URL')
    .default('http://localhost:3000'),
  NEXT_PUBLIC_DASHBOARD_URL: z
    .string()
    .url('NEXT_PUBLIC_DASHBOARD_URL must be a valid URL')
    .default('http://localhost:3001'),
});

/** Validated server environment variables */
export const serverEnv = serverEnvSchema.parse({
  WP_POSTS_API: process.env.WP_POSTS_API,
  WP_SINGLE_POST_API: process.env.WP_SINGLE_POST_API,
  LOGIN_API: process.env.LOGIN_API,
  NODE_ENV: process.env.NODE_ENV,
});

/** Validated client environment variables */
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
});

/**
 * Helper to extract the base posts URL from WP_POSTS_API.
 * e.g. "https://wpthrust.in//wp-json/wp/v2/posts/" → base for list queries
 */
export function getWpPostsBaseUrl(): string {
  return serverEnv.WP_POSTS_API;
}

/**
 * Builds a single-post URL by ID, derived from WP_SINGLE_POST_API pattern.
 * The env value is like ".../posts/2196" — we replace the trailing ID segment.
 */
export function getWpSinglePostUrl(id: number): string {
  const base = serverEnv.WP_SINGLE_POST_API.replace(/\/\d+\/?$/, '');
  return `${base}/${id}`;
}

/** Whether the app is running in production */
export const isProduction = serverEnv.NODE_ENV === 'production';
