'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

type CounterProps = {
  value: string;
  duration?: number;
  className?: string;
};

export function Counter({ value, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  // Parse "17+", "100%", "11", etc.
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? Number(match[2].replace(',', '.')) : NaN;
  const suffix = match?.[3] ?? '';
  const isInt = Number.isFinite(target) && Number.isInteger(target);

  const mv = useMotionValue(Number.isFinite(target) ? target : 0);
  const display = useTransform(mv, (v) =>
    isInt ? Math.round(v).toString() : v.toFixed(1)
  );

  useEffect(() => {
    if (!inView || !Number.isFinite(target)) return;
    if (prefersReduced) {
      mv.set(target);
      return;
    }
    mv.set(0);
    const controls = animate(mv, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, target, duration, prefersReduced, mv]);

  if (!Number.isFinite(target)) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
