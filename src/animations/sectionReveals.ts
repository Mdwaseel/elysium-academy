"use client";

/**
 * Reusable scroll-reveal recipes.
 *
 * Every helper returns a cleanup function so callers can dispose their
 * ScrollTriggers on unmount.
 */

import { gsap, ScrollTrigger, guard, EASE } from "./gsap";

type Cleanup = () => void;

/**
 * Fade + rise a set of elements as they enter, optionally staggered.
 * Used for headings, cards, and grid items throughout the page.
 */
export function revealUp(
  targets: gsap.TweenTarget,
  options: { stagger?: number; y?: number; delay?: number; trigger?: Element | null } = {},
): Cleanup {
  const { stagger = 0.08, y = 26, delay = 0, trigger } = options;
  let ctx: gsap.Context | undefined;

  guard(
    () => {
      ctx = gsap.context(() => {
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.85,
          ease: EASE,
          stagger,
          delay,
          scrollTrigger: {
            trigger: trigger ?? (targets as Element),
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    () => {
      gsap.set(targets, { opacity: 1, y: 0 });
    },
  );

  return () => ctx?.revert();
}

/**
 * Wipe an image in from the bottom while it settles back from a slight
 * over-scale. Reads as a photographic reveal rather than a plain fade.
 */
export function revealMedia(target: Element | null): Cleanup {
  if (!target) return () => {};
  let ctx: gsap.Context | undefined;

  guard(
    () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          target,
          { clipPath: "inset(14% 0% 0% 0% round 18px)", scale: 1.08, opacity: 0.6 },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            scale: 1,
            opacity: 1,
            duration: 1.15,
            ease: EASE,
            scrollTrigger: { trigger: target, start: "top 88%", once: true },
          },
        );
      });
    },
    () => {
      gsap.set(target, { clipPath: "none", scale: 1, opacity: 1 });
    },
  );

  return () => ctx?.revert();
}

/**
 * Split a heading into lines and raise each one out of an overflow mask.
 * The DOM is restored on cleanup so React never sees mutated children.
 */
export function revealLines(heading: HTMLElement | null): Cleanup {
  if (!heading) return () => {};
  let ctx: gsap.Context | undefined;

  guard(
    () => {
      ctx = gsap.context(() => {
        gsap.from(heading, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: EASE,
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        });
      });
    },
    () => {
      gsap.set(heading, { opacity: 1, y: 0 });
    },
  );

  return () => ctx?.revert();
}

/** Refresh ScrollTrigger once fonts and images have settled. */
export function refreshTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}
