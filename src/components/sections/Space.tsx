"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { space } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealUp } from "@/animations/sectionReveals";

/**
 * Photo grid, four across on desktop and two rows deep.
 *
 * Tiles stagger in as the grid enters and lift slightly on hover.
 */
export function Space() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grid.current) return;
    return revealUp(grid.current.children, { trigger: grid.current, stagger: 0.06, y: 30 });
  }, []);

  return (
    <section id="build" className="band">
      <div className="shell-wide">
        <SectionHeading heading={space.heading} />

        <div
          ref={grid}
          className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {space.items.map((item) => (
            <figure key={item.title} className="group m-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-2.5 text-[0.88rem] font-semibold text-navy">
                {item.title}
                <small className="mt-0.5 block text-[0.82rem] font-normal text-ink-mute">
                  {item.caption}
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
