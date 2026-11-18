import { AlertTriangle } from 'lucide-react';

export function StaleBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-clay-soft)] px-2 py-0.5 text-xs font-medium text-[var(--color-clay)]">
      <AlertTriangle size={12} aria-hidden />
      Do weryfikacji
    </span>
  );
}
