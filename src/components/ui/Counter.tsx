"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
};

/**
 * Counts up once when scrolled into view.
 *
 * The final value is rendered server-side, so the correct number is present
 * without JavaScript and for crawlers. On mount — motion permitting — the
 * span is reset to zero and animated by writing `textContent` directly rather
 * than through state, which avoids a re-render on every animation frame.
 *
 * IntersectionObserver is enough here; there's no pinning or scrubbing to
 * justify pulling GSAP into it.
 */
export function Counter({ value, prefix = "", suffix = "", decimals = 0, durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    let raf = 0;

    // Start from zero now that we know we're animating.
    node.textContent = format(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        let start: number | null = null;

        const step = (now: number) => {
          if (start === null) start = now;
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          node.textContent = format(value * eased);
          if (progress < 1) raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      // Leave the final value behind if this unmounts mid-count.
      node.textContent = format(value);
    };
  }, [value, prefix, suffix, decimals, durationMs]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
