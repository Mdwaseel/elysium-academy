"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { assets } from "@/data/assets";
import { Button } from "@/components/ui/Button";

/**
 * Fixed header that sits transparent over the dark hero and turns into a
 * solid blurred bar once the page scrolls.
 */
export function Header() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu; resizing past the breakpoint discards it.
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

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 border-b transition-all duration-300",
        stuck ? "border-white/12 bg-[rgba(11,18,32,0.92)] backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="shell-wide">
        <nav className="flex items-center justify-between gap-6 py-3.5" aria-label="Primary">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={assets.logoMark.src}
              alt={site.name}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-[8px] object-cover"
              priority
            />
            <span className="text-base leading-tight font-bold tracking-[0.02em] text-white">
              {site.shortName}
              <span className="block text-[0.6rem] font-semibold tracking-[0.2em] text-on-dark-soft">
                {site.tagline}
              </span>
            </span>
          </Link>

          {/* ------------------------------------------------ desktop -- */}
          <ul className="hidden items-center gap-7 text-[0.92rem] font-medium min-[941px]:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/80 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button href={site.cta.href}>{site.cta.label}</Button>
            </li>
          </ul>

          {/* ------------------------------------------------- toggle -- */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-[42px] w-[42px] place-items-center rounded-[8px] border border-white/30 min-[941px]:hidden"
          >
            <span className="relative block h-[1.6px] w-[17px]">
              <span
                className={cn(
                  "absolute left-0 h-[1.6px] w-[17px] bg-white transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  menuOpen ? "top-0 translate-y-0 rotate-45" : "-top-1.5",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.6px] w-[17px] bg-white transition-opacity duration-200",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.6px] w-[17px] bg-white transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  menuOpen ? "top-0 translate-y-0 -rotate-45" : "top-1.5",
                )}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* -------------------------------------------------- mobile -- */}
      <div
        id="mobile-nav"
        className={cn(
          "absolute inset-x-0 top-full border-b border-white/12 bg-dark transition-all duration-250 ease-[var(--ease-out-expo)] min-[941px]:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="shell-wide py-2 pb-6">
          {site.nav.map((item) => (
            <li key={item.href} className="border-b border-white/12">
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[1.02rem] text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Button href={site.cta.href} className="w-full">
              {site.cta.label}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
