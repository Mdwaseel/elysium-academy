"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoBlock } from "@/components/ui/VideoBlock";
import { revealUp } from "@/animations/sectionReveals";

/**
 * Dark proof band: one large feature video, then a row of portrait tiles.
 *
 * On narrow screens the tile row becomes a snap-scrolling carousel rather
 * than a cramped grid.
 */
export function Testimonials() {
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row.current) return;
    return revealUp(row.current.children, { trigger: row.current, stagger: 0.07, y: 28 });
  }, []);

  const empties = Array.from({ length: testimonials.emptySlots });

  return (
    <section id="proof" className="band bg-dark">
      <div className="shell-wide">
        <SectionHeading heading={testimonials.heading} onDark />

        <div className="mx-auto max-w-[900px]">
          <VideoBlock
            poster={testimonials.featured.poster}
            videoUrl={testimonials.featured.videoUrl}
            label={`${testimonials.featured.name} — ${testimonials.featured.role}`}
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        <div
          ref={row}
          className="no-bar mt-7 flex snap-x snap-mandatory gap-[18px] overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6"
        >
          {testimonials.items.map((item) => (
            <figure
              key={item.name}
              className="m-0 w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-auto"
            >
              <VideoBlock
                poster={item.poster}
                videoUrl={item.videoUrl}
                ratio="portrait"
                sizes="(max-width: 768px) 62vw, 17vw"
              />
              <figcaption className="mt-3 text-[0.9rem] font-semibold text-white">
                {item.name}
                <small className="mt-0.5 block text-[0.81rem] font-normal text-on-dark-soft">
                  {item.role}
                </small>
              </figcaption>
            </figure>
          ))}

          {empties.map((_, i) => (
            <figure
              key={`empty-${i}`}
              className="m-0 w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-auto"
            >
              <div className="grid aspect-[4/5] place-items-center rounded-[18px] border border-dashed border-white/25 bg-white/5 p-4 text-center text-[0.84rem] text-on-dark-soft">
                Add a testimonial video
              </div>
              <figcaption className="mt-3 text-[0.9rem] font-semibold text-white">
                Open slot
                <small className="mt-0.5 block text-[0.81rem] font-normal text-on-dark-soft">
                  Replace with a client
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
