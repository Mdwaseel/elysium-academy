"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { assets } from "@/data/assets";

/**
 * Fixed header.
 *
 * Fully transparent over the hero. Once the page scrolls it picks up a solid
 * dark background so it stays legible over light sections — no blur, no
 * border, no card. The CTA is the only strong colour in the bar.
 */
export function Header() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > 940 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 transition-colors duration-300",
        stuck || menuOpen ? "bg-[#050a14]" : "bg-transparent",
      )}
    >
      <div className="shell-wide">
        <nav className="flex h-[var(--header-h)] items-center justify-between gap-8" aria-label="Primary">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Image
              src={assets.logoMark.src}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-md object-cover"
              priority
            />
            <span className="text-[0.95rem] leading-none font-bold tracking-[0.06em] text-white">
              {site.shortName}
              <span className="ml-1.5 font-medium tracking-[0.12em] text-white/50">{site.tagline}</span>
            </span>
          </Link>

          {/* --------------------------------------------- desktop -- */}
          <ul className="hidden items-center gap-9 min-[941px]:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9rem] font-medium text-white/65 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={site.cta.href}
            className="group hidden items-center gap-2 rounded-[10px] bg-accent px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-hover min-[941px]:inline-flex"
          >
            {site.cta.label}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          {/* ---------------------------------------------- toggle -- */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center min-[941px]:hidden"
          >
            <span className="relative block h-[1.5px] w-[20px]">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-white transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  menuOpen ? "top-0 rotate-45" : "-top-[6px]",
                )}
              />
              <span
                className={cn(
                  "absolute top-0 left-0 h-[1.5px] w-full bg-white transition-opacity duration-200",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full bg-white transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  menuOpen ? "top-0 -rotate-45" : "top-[6px]",
                )}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* --------------------------------------------------- mobile -- */}
      <div
        id="mobile-nav"
        className={cn(
          "absolute inset-x-0 top-full bg-[#050a14] transition-all duration-250 ease-[var(--ease-out-expo)] min-[941px]:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="shell-wide pt-2 pb-8">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3.5 text-[1.05rem] font-medium text-white/85"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Link
              href={site.cta.href}
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-3.5 text-[0.95rem] font-semibold text-white"
            >
              {site.cta.label} <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
