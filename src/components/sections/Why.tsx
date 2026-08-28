"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { why } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealUp } from "@/animations/sectionReveals";

/** Small inline check used across the feature lists. */
function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-hidden="true"
      className="mt-[5px] shrink-0 text-accent"
    >
      <path d="m4 12 5.5 5.5L20 7" />
    </svg>
  );
}

/**
 * Positioning band: photograph one side, credibility panel the other.
 */
export function Why() {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card.current) return;
    return revealUp(card.current, { y: 30, stagger: 0 });
  }, []);

  return (
    <section id="why" className="band">
      <div className="shell">
        <SectionHeading heading={why.heading} />

        <div
          ref={card}
          className="grid overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_6px_22px_rgba(13,27,47,0.09)] md:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative min-h-[300px] bg-bg-alt">
            <Image
              src={why.profile.image.src}
              alt={why.profile.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              style={{ objectPosition: why.profile.image.position }}
            />
          </div>

          <div className="p-[clamp(28px,3.5vw,44px)]">
            <p className="text-[1.2rem] font-bold text-navy">{why.profile.name}</p>
            <p className="mb-5 text-[0.85rem] font-semibold text-accent">{why.profile.role}</p>

            <p className="t-lede text-ink-soft">{why.profile.body}</p>

            <ul className="mt-[22px] grid gap-3">
              {why.profile.points.map((point) => (
                <li key={point} className="grid grid-cols-[20px_1fr] items-start gap-3 text-[0.97rem] text-ink-soft">
                  <Check />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
