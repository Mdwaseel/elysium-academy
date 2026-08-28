"use client";

import { useEffect, useRef } from "react";
import { dayInTheLife } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoBlock } from "@/components/ui/VideoBlock";
import { Counter } from "@/components/ui/Counter";
import { revealUp } from "@/animations/sectionReveals";

/**
 * Editorial video band with the headline numbers underneath.
 */
export function DayInTheLife() {
  const stats = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stats.current) return;
    return revealUp(stats.current.children, { trigger: stats.current, stagger: 0.1 });
  }, []);

  return (
    <section className="band bg-bg-alt">
      <div className="shell">
        <SectionHeading heading={dayInTheLife.heading} />

        <VideoBlock
          poster={dayInTheLife.poster}
          videoUrl={dayInTheLife.videoUrl}
          label="Inside a week at an Elysium agency"
          sizes="(max-width: 768px) 100vw, 1180px"
        />

        <div ref={stats} className="mt-[42px] grid gap-6 text-center sm:grid-cols-3">
          {dayInTheLife.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[clamp(1.7rem,3.2vw,2.3rem)] leading-none font-bold tracking-[-0.03em] text-navy">
                {stat.display ?? (
                  <Counter
                    value={stat.value ?? 0}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                )}
              </div>
              <div className="mt-2 text-[0.88rem] text-ink-mute">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
