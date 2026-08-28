"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { revealMedia } from "@/animations/sectionReveals";
import type { Asset } from "@/data/assets";

type Props = {
  poster: Asset;
  /** Embed URL. When empty the block stays a poster and the play button is inert. */
  videoUrl?: string;
  label?: string;
  /** 16/9 for features, 4/5 for the portrait testimonial tiles. */
  ratio?: "video" | "portrait";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Poster-first video block. Nothing third-party loads until the visitor
 * presses play, which keeps the page weight down and avoids embedding
 * trackers on first paint.
 */
export function VideoBlock({
  poster,
  videoUrl,
  label,
  ratio = "video",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 60vw",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => revealMedia(ref.current), []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[18px] bg-dark shadow-[0_20px_55px_rgba(13,27,47,0.16)]",
        ratio === "video" ? "aspect-video" : "aspect-[4/5]",
        className,
      )}
    >
      {playing && videoUrl ? (
        <iframe
          src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
          title={label ?? "Video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image
            src={poster.src}
            alt={poster.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition: poster.position ?? "center" }}
          />

          <button
            type="button"
            onClick={() => videoUrl && setPlaying(true)}
            aria-label={videoUrl ? `Play ${label ?? "video"}` : `${label ?? "Video"} — embed not set`}
            className={cn(
              "group absolute inset-0 grid place-items-center bg-[rgba(8,14,25,0.35)]",
              "transition-colors duration-250 hover:bg-[rgba(8,14,25,0.5)]",
              !videoUrl && "cursor-default",
            )}
          >
            <span
              className={cn(
                "grid place-items-center rounded-full bg-white text-accent shadow-lg",
                "transition-transform duration-250 group-hover:scale-105",
                ratio === "video" ? "h-[62px] w-[62px]" : "h-12 w-12",
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          {label && (
            <p className="pointer-events-none absolute inset-x-4 bottom-4 text-[0.86rem] font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
              {label}
            </p>
          )}
        </>
      )}
    </div>
  );
}
