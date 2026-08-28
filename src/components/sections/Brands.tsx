"use client";

import Image from "next/image";
import { brands } from "@/data/content";

/**
 * Infinite logo marquee.
 *
 * The track holds two identical copies of the logo set and translates by -50%,
 * so the loop is seamless. The duplicate is hidden from assistive tech.
 */
export function Brands() {
  return (
    <section className="band-tight bg-bg-alt">
      <div className="shell-wide">
        <h2 className="mb-8 text-center text-[clamp(1.3rem,2.4vw,1.75rem)] leading-tight font-bold tracking-[-0.02em] text-navy">
          {brands.heading.lead}{" "}
          <em className="not-italic text-accent">{brands.heading.accent}</em>
        </h2>
      </div>

      <div className="mask-x relative overflow-hidden">
        <div className="marquee-track flex w-max gap-11">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-11" aria-hidden={copy === 1}>
              {brands.logos.map((logo) => (
                <Image
                  key={`${copy}-${logo.src}`}
                  src={logo.src}
                  alt={copy === 1 ? "" : logo.alt}
                  width={150}
                  height={44}
                  className="h-11 w-auto max-w-[150px] object-contain opacity-70 grayscale transition-all duration-250 hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 38s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
