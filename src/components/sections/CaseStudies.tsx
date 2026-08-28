"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { caseStudies } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealUp } from "@/animations/sectionReveals";

/**
 * Three case-study cards. Image zooms slightly and the card lifts on hover.
 */
export function CaseStudies() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grid.current) return;
    return revealUp(grid.current.children, { trigger: grid.current, stagger: 0.09, y: 30 });
  }, []);

  return (
    <section className="band">
      <div className="shell-wide">
        <SectionHeading heading={caseStudies.heading} />

        <div ref={grid} className="grid gap-6 md:grid-cols-3">
          {caseStudies.items.map((item) => (
            <article
              key={item.client}
              className="group overflow-hidden rounded-[12px] border border-line bg-white shadow-sm transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[0_6px_22px_rgba(13,27,47,0.09)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  style={{ objectPosition: item.image.position }}
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[0.74rem] font-semibold text-navy">
                  {item.duration}
                </span>
              </div>

              <div className="p-6">
                <p className="text-[0.78rem] font-semibold tracking-[0.1em] text-accent uppercase">
                  {item.result}
                </p>
                <h3 className="t-h3 mt-2 text-navy">{item.client}</h3>
                <p className="mt-2.5 text-[0.95rem] text-ink-soft">{item.story}</p>
                <p className="mt-4 border-t border-line pt-4 text-[0.86rem] text-ink-mute">
                  {item.person}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
