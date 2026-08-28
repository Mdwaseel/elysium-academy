"use client";

import Image from "next/image";
import { useState } from "react";
import { clientWins } from "@/data/content";
import { winPlaceholders } from "@/data/assets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/**
 * Uniform square screenshot wall with a show-all toggle.
 *
 * Hidden tiles stay out of the DOM until expanded so the initial payload only
 * carries the first row set.
 */
export function ClientWins() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? winPlaceholders : winPlaceholders.slice(0, clientWins.initialCount);

  return (
    <section className="band bg-dark pt-0">
      <div className="shell-wide">
        <SectionHeading heading={clientWins.heading} onDark />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((win, i) => (
            <figure
              key={`${win.src}-${i}`}
              className="m-0 overflow-hidden rounded-[12px] border border-white/12 bg-dark-2 transition-transform duration-250 ease-[var(--ease-out-expo)] hover:-translate-y-1"
            >
              <div className="relative aspect-square">
                <Image
                  src={win.src}
                  alt={win.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.81rem] text-on-dark-soft">
                Add screenshot
              </figcaption>
            </figure>
          ))}
        </div>

        {winPlaceholders.length > clientWins.initialCount && (
          <div className="mt-8 text-center">
            <Button
              variant="outlineLight"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? clientWins.showLessLabel : clientWins.showAllLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
