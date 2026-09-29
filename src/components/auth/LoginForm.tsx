'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/config/site';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginApiResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Login form with email/password, show/hide password toggle,
 * zod validation, and Laravel error display.
 */
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverFieldErrors, setServerFieldErrors] = useState<Record<string, string[]>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setServerFieldErrors({});

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const body: LoginApiResponse = await res.json();

      if (body.success) {
        // External redirect to dashboard
        window.location.assign(SITE_CONFIG.dashboardUrl);
        return;
      }

      // Display server errors
      if (body.errors) {
        setServerFieldErrors(body.errors);
      }
      if (body.message) {
        setServerError(body.message);
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    }
  };

  const getFieldError = (field: 'email' | 'password'): string | undefined => {
    return errors[field]?.message ?? serverFieldErrors[field]?.[0];
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Login form"
    >
      {/* Server Error Banner */}
      {serverError && (
        <div
          role="alert"
          className="p-4 rounded-[var(--radius-md)] bg-coral/10 border border-coral/20 text-coral text-sm"
        >
          {serverError}
        </div>
      )}

      {/* Email Field */}
      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-ink mb-1.5"
        >
          Email address
        </label>
        <input
          {...register('email')}
          id="login-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!getFieldError('email')}
          aria-describedby={getFieldError('email') ? 'email-error' : undefined}
          placeholder="you@company.com"
          className={`w-full h-12 px-4 rounded-[var(--radius-md)] border bg-surface text-ink placeholder:text-ink-muted outline-none transition-colors ${
            getFieldError('email')
              ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/10'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/10'
          }`}
        />
        {getFieldError('email') && (
          <p id="email-error" className="mt-1.5 text-sm text-coral">
            {getFieldError('email')}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-ink mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            aria-invalid={!!getFieldError('password')}
            aria-describedby={getFieldError('password') ? 'password-error' : undefined}
            placeholder="Enter your password"
            className={`w-full h-12 px-4 pr-12 rounded-[var(--radius-md)] border bg-surface text-ink placeholder:text-ink-muted outline-none transition-colors ${
              getFieldError('password')
                ? 'border-coral focus:border-coral focus:ring-2 focus:ring-coral/10'
                : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/10'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Eye className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
        {getFieldError('password') && (
          <p id="password-error" className="mt-1.5 text-sm text-coral">
            {getFieldError('password')}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        Don&apos;t have an account?{' '}
        <a href="/login" className="text-primary font-medium hover:underline">
          Get started free
        </a>
      </p>
    </form>
  );
}
