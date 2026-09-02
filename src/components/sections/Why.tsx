"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { rating, why } from "@/data/content";
import { revealUp } from "@/animations/sectionReveals";

/* ------------------------------------------------------------- icons -- */
/* Outline glyphs kept local: the section is the only place they appear. */

function StarRow({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-[3px]" role="img" aria-label={`${count} out of 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 6 21l1.3-6.8-5-4.7 6.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

function PeopleIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 19c0-3.3 2.9-5.2 6.5-5.2s6.5 1.9 6.5 5.2" />
      <path d="M16 6.5a3 3 0 0 1 0 6" />
      <path d="M18.5 14.2c2 .6 3.3 2.1 3.3 4.8" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 20h18" />
      <path d="M4 15l5-5 4 4 7-7" />
      <path d="M15 7h5v5" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8" />
    </svg>
  );
}

function CheckBadge() {
  return (
    <span className="mt-[2px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-accent text-white">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12 4.5 4.5L19 7" />
      </svg>
    </span>
  );
}

/* ----------------------------------------------------------- section -- */
/**
 * Why Elysium.
 *
 * A lightweight proof strip, a centred editorial heading, and one wide
 * founder panel — photograph left, dark credibility panel right. No cards
 * beyond the panel itself, nothing floating over the photograph.
 */
export function Why() {
  const strip = useRef<HTMLUListElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups = [
      strip.current && revealUp(strip.current.children, { trigger: strip.current, stagger: 0.08, y: 14 }),
      head.current && revealUp(head.current.children, { trigger: head.current, stagger: 0.09, y: 18 }),
      panel.current && revealUp(panel.current, { stagger: 0, y: 28 }),
    ];
    return () => cleanups.forEach((fn) => fn && fn());
  }, []);

  return (
    <section id="why" className="bg-white pt-[clamp(40px,4.5vw,56px)] pb-[clamp(80px,9vw,120px)]">
      <div className="shell-wide">
        {/* ------------------------------------------- trust strip -- */}
        <ul
          ref={strip}
          className="mx-auto flex max-w-[1120px] flex-col items-stretch gap-y-5 text-[0.95rem] leading-[1.35] text-ink-soft sm:flex-row sm:items-center sm:justify-center sm:gap-y-0"
        >
          <li className="flex items-center justify-center gap-4 sm:px-8 lg:px-12">
            <span className="text-accent">
              <StarRow count={rating.stars} />
            </span>
            <span className="max-w-[16ch]">{rating.label}</span>
          </li>

          <li
            aria-hidden="true"
            className="hidden h-11 w-px self-center bg-line sm:block"
          />

          <li className="flex items-center justify-center gap-4 sm:px-8 lg:px-12">
            <span className="text-accent">
              <PeopleIcon />
            </span>
            <span>
              {rating.facts[0].label}
              <br />
              <b className="text-[1.05rem] font-bold text-accent">{rating.facts[0].value}</b>
            </span>
          </li>

          <li
            aria-hidden="true"
            className="hidden h-11 w-px self-center bg-line sm:block"
          />

          <li className="flex items-center justify-center gap-4 sm:px-8 lg:px-12">
            <span className="text-accent">
              <GrowthIcon />
            </span>
            <span>
              {rating.facts[1].label}{" "}
              <b className="text-[1.05rem] font-bold text-accent">{rating.facts[1].value}</b>
            </span>
          </li>
        </ul>

        {/* ------------------------------------------------ header -- */}
        <div ref={head} className="mx-auto mt-[clamp(56px,7vw,80px)] max-w-[900px] text-center">
          <p className="t-eyebrow text-[0.85rem] text-accent">{why.heading.eyebrow}</p>

          <h2 className="mt-5 text-[clamp(38px,5.2vw,72px)] leading-[1.06] font-bold tracking-[-0.03em] text-navy">
            {why.heading.lead}
            <br />
            <span className="text-accent">{why.heading.accent}</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[clamp(17px,1.3vw,19px)] leading-[1.5] text-ink-soft">
            {why.heading.lede}
          </p>
        </div>

        {/* ------------------------------------------------- panel -- */}
        <div
          ref={panel}
          className="mx-auto mt-[clamp(48px,6vw,64px)] grid max-w-[1350px] overflow-hidden rounded-[22px] bg-dark shadow-[0_18px_50px_-24px_rgba(13,27,47,0.35)] lg:min-h-[430px] lg:grid-cols-2"
        >
          <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-0">
            <Image
              src={why.profile.image.src}
              alt={why.profile.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 675px"
              className="object-cover"
              style={{ objectPosition: why.profile.image.position }}
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-[clamp(36px,3.4vw,52px)]">
            <div className="flex items-center gap-4">
              <span className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-full bg-accent text-white">
                <PersonIcon />
              </span>
              <div>
                <p className="text-[clamp(22px,1.7vw,26px)] leading-tight font-bold text-white">
                  {why.profile.name}
                </p>
                <p className="mt-1 text-[1rem] text-accent-bright">{why.profile.role}</p>
              </div>
            </div>

            <p className="mt-6 max-w-[560px] text-[1.05rem] leading-[1.55] text-white/90">
              {why.profile.body}
            </p>

            <hr className="my-6 border-0 border-t border-white/12" />

            <ul className="grid gap-4">
              {why.profile.points.map((point) => (
                <li
                  key={point.strong}
                  className="flex items-start gap-3.5 text-[0.98rem] leading-[1.5] text-white/85"
                >
                  <CheckBadge />
                  <span>
                    <b className="font-bold text-white">{point.strong}</b> {point.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
