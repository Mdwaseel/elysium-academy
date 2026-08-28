"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { team } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealUp } from "@/animations/sectionReveals";

/**
 * Portrait team grid.
 */
export function Team() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grid.current) return;
    return revealUp(grid.current.children, { trigger: grid.current, stagger: 0.07, y: 28 });
  }, []);

  return (
    <section id="team" className="band bg-bg-alt">
      <div className="shell-wide">
        <SectionHeading heading={team.heading} />

        <div ref={grid} className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {team.members.map((member) => (
            <article key={member.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-bg">
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  style={{ objectPosition: member.image.position }}
                />
              </div>

              <p className="mt-3.5 text-[1.02rem] font-bold text-navy">{member.name}</p>
              <p className="mt-0.5 text-[0.85rem] font-semibold text-accent">{member.role}</p>
              <p className="mt-2 text-[0.89rem] text-ink-soft">{member.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
