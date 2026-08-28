/**
 * Site-wide brand configuration.
 *
 * Everything identity-related lives here so the whole build can be re-pointed
 * at a different brand by editing this one file.
 */

export const site = {
  name: "Elysium Academy",
  shortName: "ELYSIUM",
  tagline: "ACADEMY",
  url: "https://elysiumacademy.com",
  description:
    "We help sales reps build their own business. Closers, growth operators, or agency owners — we got you.",
  locale: "en",
  email: "hello@elysiumacademy.com",
  location: "Remote — worldwide",

  nav: [
    { label: "Why Us", href: "#why" },
    { label: "The Build", href: "#build" },
    { label: "Client Wins", href: "#proof" },
    { label: "Package", href: "#package" },
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],

  cta: {
    label: "Talk To Our Team",
    href: "#contact",
  },

  footer: {
    columns: [
      {
        title: "Company",
        links: [
          { label: "Why Us", href: "#why" },
          { label: "The Build", href: "#build" },
          { label: "Team", href: "#team" },
          { label: "Client Wins", href: "#proof" },
        ],
      },
      {
        title: "Get Started",
        links: [
          { label: "Talk To Our Team", href: "#contact" },
          { label: "Package", href: "#package" },
          { label: "FAQ", href: "#faq" },
        ],
      },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Earnings Disclaimer", href: "#" },
    ],
    social: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    /**
     * Required on any page running paid traffic against income claims.
     */
    disclaimer:
      "Results shown are not typical and are not a guarantee of income. Any figures referenced reflect the outcomes of specific individuals and depend on effort, experience and market conditions. This site is not part of, nor endorsed by, Meta Platforms, Inc., Google LLC, or any of their properties.",
  },
} as const;

export type Site = typeof site;
