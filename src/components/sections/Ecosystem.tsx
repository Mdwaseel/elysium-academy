"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, guard } from "@/animations/gsap";
import { ecosystem } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven system walkthrough.
 *
 * On desktop the section pins and the four stages advance as the visitor
 * scrolls, with a progress rail filling alongside. On mobile pinning is
 * dropped entirely — the stages become a plain stacked list, which reads
 * better on a small screen than a hijacked scroll.
 */
export function Ecosystem() {
  const root = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    let ctx: gsap.Context | undefined;

    guard(() => {
      ctx = gsap.context(() => {
        // Desktop only: pin and scrub through the stages.
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            const count = ecosystem.stages.length;

            ScrollTrigger.create({
              trigger: node,
              start: "top top",
              end: () => `+=${count * 60}%`,
              pin: "[data-eco-pin]",
              scrub: 0.5,
              onUpdate: (self) => {
                // Map scroll progress onto a stage index.
                const index = Math.min(count - 1, Math.floor(self.progress * count));
                setActiveStage(index);
              },
            });

            gsap.to("[data-eco-progress]", {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top top",
                end: () => `+=${count * 60}%`,
                scrub: 0.5,
              },
            });
          },
        });
      }, node);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={root} className="band bg-bg-alt">
      <div className="shell-wide">
        <SectionHeading heading={ecosystem.heading} />

        <div data-eco-pin className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* ------------------------------------------- stage rail -- */}
          <div className="relative lg:pl-8">
            {/* Progress rail, desktop only. */}
            <div className="absolute top-2 bottom-2 left-0 hidden w-[3px] rounded bg-line lg:block">
              <div
                data-eco-progress
                className="h-full w-full origin-top scale-y-0 rounded bg-accent"
              />
            </div>

            <ol className="grid gap-3">
              {ecosystem.stages.map((stage, i) => {
                const isActive = i === activeStage;
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      onClick={() => setActiveStage(i)}
                      aria-current={isActive}
                      className={cn(
                        "w-full rounded-[12px] border p-5 text-left transition-all duration-300 ease-[var(--ease-out-expo)]",
                        isActive
                          ? "border-accent bg-white shadow-[0_6px_22px_rgba(13,27,47,0.09)]"
                          : "border-line bg-white/60 hover:border-line-strong",
                      )}
                    >
                      <span
                        className={cn(
                          "text-[0.74rem] font-bold tracking-[0.12em] uppercase transition-colors",
                          isActive ? "text-accent" : "text-ink-mute",
                        )}
                      >
                        Stage {stage.id}
                      </span>
                      <span className="mt-1.5 block text-[1.08rem] font-bold text-navy">
                        {stage.name}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]",
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr] lg:grid-rows-[0fr]",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-[0.93rem] text-ink-soft">
                            {stage.body}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---------------------------------------- systems panel -- */}
          <div className="rounded-[18px] border border-line bg-white p-[clamp(24px,3vw,40px)] shadow-[0_6px_22px_rgba(13,27,47,0.09)]">
            <p className="t-eyebrow text-accent">
              Stage {ecosystem.stages[activeStage].id} — {ecosystem.stages[activeStage].name}
            </p>
            <p className="mt-3 text-[1.05rem] text-ink-soft">
              {ecosystem.stages[activeStage].body}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {ecosystem.stages[activeStage].systems.map((system) => (
                <div
                  key={system}
                  className="flex items-center gap-2.5 rounded-[10px] border border-line bg-bg-alt px-3.5 py-3 text-[0.92rem] font-medium text-navy"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent-tint text-accent">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      aria-hidden="true"
                    >
                      <path d="m4 12 5.5 5.5L20 7" />
                    </svg>
                  </span>
                  {system}
                </div>
              ))}
            </div>

            <p className="mt-7 border-t border-line pt-5 text-[0.88rem] text-ink-mute">
              One lead moves through every stage without you touching it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
