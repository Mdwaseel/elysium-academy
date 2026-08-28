"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, guard, EASE } from "@/animations/gsap";
import { assets } from "@/data/assets";
import { hero } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { VideoBlock } from "@/components/ui/VideoBlock";

/**
 * Dark full-bleed hero: photograph behind a left-weighted scrim, copy on the
 * left, a floating video card on the right.
 *
 * The entrance runs on load rather than on scroll — it is already in view.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    guard(
      () => {
        ctx = gsap.context(() => {
          gsap
            .timeline({ defaults: { ease: EASE, duration: 0.9 } })
            .from("[data-hero-badge]", { opacity: 0, y: 18 })
            .from("[data-hero-title]", { opacity: 0, y: 30 }, "-=0.65")
            .from("[data-hero-sub]", { opacity: 0, y: 22 }, "-=0.65")
            .from("[data-hero-actions] > *", { opacity: 0, y: 18, stagger: 0.08 }, "-=0.6")
            .from("[data-hero-note]", { opacity: 0 }, "-=0.5")
            .from("[data-hero-card]", { opacity: 0, y: 34, scale: 0.97, duration: 1.1 }, "-=0.9");

          // Slow parallax drift on the backdrop as the hero scrolls away.
          gsap.to("[data-hero-bg]", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }, root);
      },
      () => {
        gsap.set(
          "[data-hero-badge], [data-hero-title], [data-hero-sub], [data-hero-actions] > *, [data-hero-note], [data-hero-card]",
          { opacity: 1, y: 0, scale: 1 },
        );
      },
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate grid min-h-[min(92svh,820px)] items-center overflow-hidden bg-dark pt-[clamp(120px,13vw,180px)] pb-[clamp(64px,8vw,110px)]"
    >
      {/* backdrop */}
      <div data-hero-bg className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src={assets.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: assets.hero.position }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,11,20,0.94) 0%, rgba(6,11,20,0.8) 46%, rgba(6,11,20,0.55) 100%), linear-gradient(180deg, rgba(6,11,20,0.86) 0%, rgba(6,11,20,0.2) 40%, rgba(6,11,20,0.9) 100%)",
          }}
        />
      </div>

      <div className="shell-wide">
        <div className="grid items-center gap-[clamp(30px,4vw,56px)] lg:grid-cols-[1.35fr_0.65fr]">
          <div className="max-w-[720px]">
            <p
              data-hero-badge
              className="mb-[22px] inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-[7px] text-[0.81rem] font-semibold text-white backdrop-blur-[6px]"
            >
              <span aria-hidden="true">◆</span>
              <b className="font-bold">{hero.badge.strong}</b> {hero.badge.rest}
            </p>

            <h1 data-hero-title className="t-display mb-5 text-balance text-white">
              {hero.lead} <em className="not-italic text-accent-bright">{hero.accent}</em>
            </h1>

            <p data-hero-sub className="mb-7 max-w-[48ch] text-[clamp(1rem,1.4vw,1.16rem)] text-white/85">
              {hero.sub}
            </p>

            <div data-hero-actions className="flex flex-wrap items-center gap-3">
              <Button href={hero.primary.href} size="lg" arrow>
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} size="lg" variant="outlineLight">
                {hero.secondary.label}
              </Button>
            </div>

            <p data-hero-note className="mt-[22px] flex items-center gap-2 text-[0.87rem] text-white/70">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Z" />
              </svg>
              {hero.note}
            </p>
          </div>

          <div data-hero-card className="max-w-[380px] lg:max-w-none">
            <VideoBlock
              poster={hero.poster}
              videoUrl={hero.videoUrl}
              ratio="portrait"
              priority
              sizes="(max-width: 1024px) 380px, 30vw"
              className="border border-white/15"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
