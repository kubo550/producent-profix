import { siteConfig } from '@/content/site';

/** Shared social icons + link metadata so the navbar, the "follow us" band and
 * the footer stay in sync. Brand-monochrome SVGs that inherit `currentColor`. */

export function FacebookIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function TikTokIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.5 3c.3 2.04 1.46 3.36 3.5 3.5v2.4c-1.18.12-2.21-.27-3.41-1v5.46c0 5.55-6.05 7.28-8.48 3.3-1.56-2.56-.6-7.05 4.42-7.23v2.53c-.38.06-.79.16-1.16.29-1.11.38-1.74 1.08-1.56 2.32.33 2.38 4.7 3.08 4.34-1.57V3h2.35z" />
    </svg>
  );
}

export type SocialLink = {
  key: 'facebook' | 'tiktok';
  href: string;
  label: string;
  Icon: typeof FacebookIcon;
};

/** Single source of truth for which social profiles render across the site. */
export const socialLinks: readonly SocialLink[] = [
  {
    key: 'facebook',
    href: siteConfig.social.facebook,
    label: 'Facebook',
    Icon: FacebookIcon,
  },
  {
    key: 'tiktok',
    href: siteConfig.social.tiktok,
    label: 'TikTok',
    Icon: TikTokIcon,
  },
];
