"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

/**
 * Single-open accordion.
 *
 * The panel animates via `grid-template-rows: 0fr -> 1fr`, which gives a real
 * height transition without measuring the content or locking a fixed height.
 */
export function Accordion({ items, className }: { items: readonly AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={cn("mx-auto max-w-[800px] border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-5 px-1 py-[22px] text-left",
                  "text-[1.01rem] font-semibold transition-colors duration-200",
                  isOpen ? "text-accent" : "text-navy hover:text-accent",
                )}
              >
                {item.q}

                {/* Plus that loses its vertical stroke when open. */}
                <span className="relative h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <span className="absolute inset-x-0 top-[6px] h-[1.6px] bg-accent" />
                  <span
                    className={cn(
                      "absolute inset-y-0 left-[6px] w-[1.6px] bg-accent transition-transform duration-300 ease-[var(--ease-out-expo)]",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[68ch] px-1 pb-[22px] text-[0.95rem] text-ink-soft">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
