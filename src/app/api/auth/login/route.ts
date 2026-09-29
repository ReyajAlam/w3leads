import { NextResponse } from 'next/server';
import { z } from 'zod';
import { loginWithCredentials } from '@/lib/auth/loginService';
import { setSessionCookie } from '@/lib/auth/session';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

/**
 * POST /api/auth/login
 *
 * Proxies login requests to the Laravel API.
 * On success, sets an httpOnly session cookie and returns { success: true }.
 * On failure, returns structured error messages.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]?.toString() ?? 'form';
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
      }

      return NextResponse.json(
        { success: false, errors: fieldErrors, message: 'Validation failed.' },
        { status: 422 }
      );
    }

    const result = await loginWithCredentials(parsed.data.email, parsed.data.password);

    if (result.success && result.token) {
      await setSessionCookie(result.token);
      return NextResponse.json({ success: true });
    }

    // Forward validation errors from Laravel
    return NextResponse.json(
      {
        success: false,
        errors: result.errors,
        message: result.message ?? 'Login failed.',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('[Auth] Login route error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
