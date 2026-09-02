"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, guard } from "@/animations/gsap";
import { assets, heroVideo } from "@/data/assets";
import { hero } from "@/data/content";
import { Button } from "@/components/ui/Button";

/**
 * Hero.
 *
 * Full-bleed atmospheric background, copy on the left, the animated revenue
 * dashboard on the right. The background image is already composed with the
 * blue light on the right, so the overlay does very little — just enough to
 * hold contrast behind the copy.
 *
 * Motion is restricted to a single, short load-in. The dashboard video is
 * the animation; nothing else competes with it.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    guard(
      () => {
        ctx = gsap.context(() => {
          gsap
            .timeline({ defaults: { ease: "power2.out", duration: 0.6 } })
            .from("[data-hero-copy] > *", { opacity: 0, y: 14, stagger: 0.07 })
            .from("[data-hero-media]", { opacity: 0, y: 12, duration: 0.7 }, "-=0.35");
        }, root);
      },
      () => gsap.set("[data-hero-copy] > *, [data-hero-media]", { opacity: 1, y: 0 }),
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-[#050a14] pt-[calc(var(--header-h)+clamp(40px,6vw,72px))] pb-[clamp(56px,7vw,96px)]"
    >
      {/* ------------------------------------------------- backdrop -- */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={assets.hero.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
          style={{ objectPosition: assets.hero.position }}
        />
        {/* Left-weighted scrim only. The right side keeps its atmosphere. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,10,20,0.55) 0%, rgba(5,10,20,0.35) 45%, rgba(5,10,20,0) 72%)",
          }}
        />
      </div>

      <div className="shell-wide w-full">
        <div className="grid items-center gap-y-12 lg:grid-cols-[54fr_46fr] lg:gap-x-[clamp(40px,5vw,80px)]">
          {/* ---------------------------------------------- copy -- */}
          <div data-hero-copy className="max-w-[640px]">
            <p className="mb-6 flex items-center gap-2.5 text-[0.86rem] font-medium tracking-[0.01em] text-white/70">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </p>

            <h1 className="text-[clamp(44px,5.6vw,84px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
              {hero.line1}
              <br />
              {hero.line2} <span className="text-accent">{hero.accent}</span>
            </h1>

            <p className="mt-7 max-w-[560px] text-[clamp(17px,1.3vw,19px)] leading-[1.55] text-white/70">
              {hero.sub}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={hero.primary.href} size="lg" arrow className="w-full sm:w-auto">
                {hero.primary.label}
              </Button>
              <Button
                href={hero.secondary.href}
                size="lg"
                variant="outlineLight"
                className="w-full sm:w-auto"
              >
                {hero.secondary.label}
              </Button>
            </div>

            <p className="mt-7 flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-white/55">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-[3px] shrink-0"
              >
                <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              {hero.note}
            </p>
          </div>

          {/* --------------------------------------------- media -- */}
          <div data-hero-media className="relative">
            {/* Soft atmospheric lift behind the video so it sits in the light. */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[40px] bg-accent/20 blur-[60px]"
            />
            <video
              src={heroVideo.src}
              width={heroVideo.width}
              height={heroVideo.height}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Animated revenue dashboard"
              className="aspect-video w-full rounded-[20px] object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
