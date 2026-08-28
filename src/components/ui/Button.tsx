import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight" | "light" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold whitespace-nowrap " +
  "border border-transparent transition-all duration-200 ease-[var(--ease-out-expo)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover hover:-translate-y-px shadow-sm hover:shadow-md",
  outline: "border-line-strong bg-white text-navy hover:border-accent hover:text-accent",
  outlineLight: "border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10",
  light: "bg-white text-navy hover:bg-[#eef2f6] hover:-translate-y-px",
  dark: "bg-navy text-white hover:bg-[#16283f] hover:-translate-y-px",
};

const sizes: Record<Size, string> = {
  md: "px-[26px] py-[14px] text-[0.95rem]",
  lg: "px-[34px] py-[17px] text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

/** Renders an anchor when `href` is present, otherwise a real button. */
type ButtonProps = BaseProps &
  ({ href: string; onClick?: never } | ({ href?: undefined } & ComponentPropsWithoutRef<"button">));

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], "group", className);

  const inner = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-[3px]"
        >
          →
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}
