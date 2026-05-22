import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

/**
 * Refined pill button with soft shadow.
 * All palette data lives in CSS variables (--shadow-btn-*, --color-accent*),
 * not in this file — swapping palette never requires editing Button.tsx.
 */
const base =
  'group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,box-shadow,background-color,color] duration-200 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-accent-fg)] shadow-[var(--shadow-btn-primary)] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-btn-primary-hover)]',
  secondary:
    'bg-[var(--color-paper)] text-[var(--color-fg)] border border-[var(--color-border-strong)] shadow-[var(--shadow-btn-secondary)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
  ghost:
    'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-paper)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}
