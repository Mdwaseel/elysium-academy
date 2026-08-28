"use client";

/**
 * Single GSAP entry point.
 *
 * ScrollTrigger is registered exactly once here so no component has to think
 * about it, and every animation helper funnels through `guard()` which is a
 * no-op when the visitor has asked for reduced motion.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Runs `fn` only when motion is allowed. When it isn't, `fallback` gets a
 * chance to put elements into their final state so nothing stays invisible.
 */
export function guard(fn: () => void, fallback?: () => void) {
  if (prefersReducedMotion()) {
    fallback?.();
    return;
  }
  fn();
}

/** Shared easing so every section moves with the same character. */
export const EASE = "power3.out";
export const EASE_INOUT = "power2.inOut";
