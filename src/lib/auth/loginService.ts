import { serverEnv } from '@/config/env';

/** Possible shapes of a successful auth API response */
interface AuthSuccessResponse {
  token?: string;
  access_token?: string;
  data?: {
    token?: string;
    access_token?: string;
  };
  user?: Record<string, unknown>;
}

/** Laravel 422 validation error shape */
interface AuthValidationError {
  message?: string;
  errors?: Record<string, string[]>;
}

export interface LoginResult {
  success: boolean;
  token?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

/**
 * Calls the Laravel login API and extracts the auth token.
 * Tolerant of multiple response shapes (token, access_token, data.token).
 *
 * @param email - User email
 * @param password - User password
 * @returns LoginResult with token on success, or errors/message on failure
 */
export async function loginWithCredentials(
  email: string,
  password: string
): Promise<LoginResult> {
  const res = await fetch(serverEnv.LOGIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const body = await res.json().catch(() => null);

  // Rate limiting
  if (res.status === 429) {
    return {
      success: false,
      message: 'Too many login attempts. Please try again in a few minutes.',
    };
  }

  // Server error
  if (res.status >= 500) {
    return {
      success: false,
      message: 'Something went wrong on our end. Please try again later.',
    };
  }

  // Validation errors (Laravel 422)
  if (res.status === 422 && body) {
    const errorBody = body as AuthValidationError;
    return {
      success: false,
      errors: errorBody.errors,
      message: errorBody.message ?? 'Validation failed.',
    };
  }

  // Unauthorized
  if (res.status === 401) {
    return {
      success: false,
      message: (body as AuthValidationError)?.message ?? 'Invalid email or password.',
    };
  }

  // Any other non-success
  if (!res.ok) {
    return {
      success: false,
      message: (body as AuthValidationError)?.message ?? 'Login failed. Please try again.',
    };
  }

  // Success — extract token from multiple possible shapes
  if (body) {
    const successBody = body as AuthSuccessResponse;
    const token =
      successBody.token ??
      successBody.access_token ??
      successBody.data?.token ??
      successBody.data?.access_token;

    if (token && typeof token === 'string') {
      return { success: true, token };
    }
  }

  return {
    success: false,
    message: 'Login succeeded but no token was returned. Please contact support.',
  };
}
