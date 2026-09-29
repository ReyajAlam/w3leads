import { cookies } from 'next/headers';
import { isProduction } from '@/config/env';

const SESSION_COOKIE_NAME = 'w3leads_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Sets the session token in an httpOnly cookie.
 * In production, sets domain=".w3leads.in" so the dashboard can read it.
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
    ...(isProduction && { domain: '.w3leads.in' }),
  });
}

/**
 * Retrieves the session token from the httpOnly cookie.
 * Returns null if no session exists.
 */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

/**
 * Clears the session cookie.
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
