"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, guard, EASE } from "@/animations/gsap";
import { packages } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
 * Dark band holding a single light package card with tabbed tracks.
 *
 * Switching tabs cross-fades the panel rather than swapping instantly, and
 * follows the ARIA tablist pattern including arrow-key navigation.
 */
export function Packages() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Animate the panel whenever the selected tab changes.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    let ctx: gsap.Context | undefined;
    guard(
      () => {
        ctx = gsap.context(() => {
          gsap.fromTo(
            node.querySelectorAll("[data-panel-item]"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: EASE, stagger: 0.05 },
          );
        }, node);
      },
      () => gsap.set(node.querySelectorAll("[data-panel-item]"), { opacity: 1, y: 0 }),
    );

    return () => ctx?.revert();
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = packages.tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const tab = packages.tabs[active];

  return (
    <section id="package" className="band bg-dark">
      <div className="shell">
        <SectionHeading heading={packages.heading} onDark />

        <div className="mx-auto max-w-[900px] rounded-[18px] bg-[#fbfaf7] p-[clamp(30px,4vw,52px)] shadow-[0_20px_55px_rgba(13,27,47,0.16)]">
          <h3 className="mb-3 text-center text-[clamp(1.4rem,2.6vw,1.95rem)] leading-tight font-bold tracking-[-0.025em] text-navy">
            {packages.cardTitle}
          </h3>
          <p className="mx-auto mb-8 max-w-[56ch] text-center text-[0.98rem] text-ink-soft">
            {packages.cardSub}
          </p>

          {/* ------------------------------------------------- tabs -- */}
          <div
            role="tablist"
            aria-label="Package tracks"
            className="mx-auto mb-8 flex max-w-[440px] gap-2 rounded-[10px] bg-[#eceae5] p-1"
          >
            {packages.tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex-1 rounded-[7px] px-4 py-2.5 text-[0.9rem] font-semibold transition-all duration-250",
                  active === i ? "bg-white text-navy shadow-sm" : "text-ink-mute hover:text-navy",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ------------------------------------------------ panel -- */}
          <div
            ref={panelRef}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            className="border-t border-line pt-8"
          >
            <h4 data-panel-item className="text-[1.05rem] font-bold text-navy">
              {tab.title}
            </h4>
            <p data-panel-item className="mt-1 text-[0.9rem] text-ink-mute">
              {tab.who}
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-x-11">
              {tab.points.map((point) => (
                <li
                  key={point}
                  data-panel-item
                  className="grid grid-cols-[20px_1fr] items-start gap-3 text-[0.96rem] text-ink-soft"
                >
                  <Check />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9 text-center">
            <Button href={packages.cta.href} size="lg" arrow>
              {packages.cta.label}
            </Button>
            <p className="mt-3.5 text-[0.84rem] text-ink-mute">{packages.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
