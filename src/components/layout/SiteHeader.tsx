'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PRIMARY_NAV } from '@/config/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MobileNavigation } from './MobileNavigation';

/**
 * Sticky site header with solid background on scroll.
 * Includes desktop nav, login/CTA buttons, and mobile drawer trigger.
 */
export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-200 ${
        isScrolled
          ? 'bg-bg shadow-md'
          : 'bg-bg/95'
      }`}
      role="banner"
    >
      <Container className="flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold text-ink shrink-0"
          aria-label="W3Leads home"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
            <path
              d="M8 22L12 10L16 18L20 10L24 22"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>W3Leads</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" href="/login" size="sm">
            Login
          </Button>
          <Button href="/login" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu */}
        <MobileNavigation />
      </Container>
    </header>
  );
}
