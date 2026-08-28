import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { assets } from "@/data/assets";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark py-14 pb-7 text-[0.91rem] text-on-dark-soft">
      <div className="shell-wide">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={assets.logoMark.src}
                alt={site.name}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-[8px] object-cover"
                loading="lazy"
              />
              <span className="text-base leading-tight font-bold tracking-[0.02em] text-white">
                {site.shortName}
                <span className="block text-[0.6rem] font-semibold tracking-[0.2em] text-[#7f92ab]">
                  {site.tagline}
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-[40ch] text-[0.89rem]">{site.description}</p>
            <p className="mt-3 text-[0.85rem] text-[#7f92ab]">{site.location}</p>
          </div>

          {site.footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-white uppercase">
                {column.title}
              </h2>
              <ul className="grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors duration-200 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-3.5 text-[0.75rem] font-semibold tracking-[0.14em] text-white uppercase">
              Connect
            </h2>
            <ul className="grid gap-2.5">
              {site.footer.social.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-7 gap-y-3 border-t border-white/12 pt-6 text-[0.83rem]">
          <span>
            &copy; {year} {site.name}. All rights reserved.
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.footer.legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors duration-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 max-w-[80ch] text-[0.76rem] leading-relaxed text-[#6d7b8e]">
          {site.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
