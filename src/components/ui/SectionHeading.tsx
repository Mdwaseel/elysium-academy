"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { revealLines } from "@/animations/sectionReveals";
import type { Heading } from "@/data/content";

type Props = {
  heading: Heading;
  /** Dark bands invert the ink and brighten the accent. */
  onDark?: boolean;
  align?: "center" | "left";
  className?: string;
  /** Renders the heading as h1 for the hero. */
  as?: "h1" | "h2";
  size?: "display" | "h2";
};

/**
 * Section heading with an eyebrow, a two-tone headline where one phrase is
 * picked out in the accent colour, and an optional lede.
 */
export function SectionHeading({
  heading,
  onDark = false,
  align = "center",
  className,
  as: Tag = "h2",
  size = "h2",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => revealLines(ref.current), []);

  return (
    <div
      ref={ref}
      className={cn(
        align === "center" ? "text-center" : "text-left",
        "mb-[clamp(38px,4.5vw,58px)]",
        className,
      )}
    >
      {heading.eyebrow && (
        <p className={cn("t-eyebrow mb-3.5", onDark ? "text-accent-bright" : "text-accent")}>
          {heading.eyebrow}
        </p>
      )}

      <Tag
        className={cn(
          size === "display" ? "t-display" : "t-h2",
          "text-balance",
          onDark ? "text-white" : "text-navy",
        )}
      >
        {heading.lead}{" "}
        {heading.accent && (
          <em
            className={cn("not-italic", onDark ? "text-accent-bright" : "text-accent")}
          >
            {heading.accent}
          </em>
        )}
        {heading.trail && <> {heading.trail}</>}
      </Tag>

      {heading.lede && (
        <p
          className={cn(
            "t-lede mt-[18px] max-w-[60ch]",
            align === "center" && "mx-auto",
            onDark ? "text-on-dark-soft" : "text-ink-soft",
          )}
        >
          {heading.lede}
        </p>
      )}
    </div>
  );
}
