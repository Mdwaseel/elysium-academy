/**
 * All page copy, in one place.
 *
 * Components read from here rather than embedding strings, so the whole site
 * can be re-worded without touching markup. Headings use `accent` to pick out
 * the phrase rendered in the brand blue.
 */

import { assets, type Asset } from "./assets";

export type Heading = {
  eyebrow?: string;
  lead: string;
  accent?: string;
  trail?: string;
  lede?: string;
};

/* ------------------------------------------------------------------ hero -- */
export const hero = {
  /** Quiet proof line above the headline. Not a badge. */
  eyebrow: "$2.5M generated in year one",
  /** Two intentional lines. The final word carries the accent. */
  line1: "We Build You a Business",
  line2: "Designed to",
  accent: "Run.",
  sub: "We help sales reps build their own business. Closers, growth operators, or agency owners — we got you.",
  primary: { label: "Launch Your High Ticket Agency", href: "#contact" },
  secondary: { label: "See How It Works", href: "#why" },
  note: "Applications reviewed manually. We only take operators we can get results for.",
};

/* ---------------------------------------------------------------- rating -- */
export const rating = {
  stars: 5,
  label: "Rated by the operators we've built for",
  facts: [
    { value: "7 brands", label: "Agencies built across" },
    { value: "$2.5M", label: "Generated in year one" },
  ],
};

/* ------------------------------------------------------------------- why -- */
export const why = {
  heading: {
    eyebrow: "Why Elysium",
    lead: "An academy powered by systems,",
    accent: "led by operators.",
    lede: "Not coaches who read about it. Every system we install is one we run in our own agencies first.",
  } satisfies Heading,
  profile: {
    image: assets.muqader,
    name: "Muqader",
    role: "Founder — Elysium Academy",
    body: "Built the system that took Elysium to $2.5M in its first year, then turned it into a process other reps could run.",
    /** `strong` is rendered bold; `rest` follows in the regular weight. */
    points: [
      { strong: "Repeatable", rest: "for building and scaling multiple high-ticket agencies" },
      { strong: "Works directly", rest: "with every operator we take on — no account managers" },
      { strong: "Focused by results,", rest: "not benchmarks bought off a freelancer site" },
    ],
  },
};

/* --------------------------------------------------------- day in the life -- */
export const dayInTheLife = {
  heading: {
    eyebrow: "The Reality",
    lead: "What running one of these",
    accent: "actually looks like.",
  } satisfies Heading,
  poster: assets.posterDayInLife,
  videoUrl: "",
  stats: [
    { value: 2.5, prefix: "$", suffix: "M", decimals: 1, label: "Generated in year one" },
    { value: 7, suffix: "+", label: "Agencies built & backed" },
    { display: "From zero", label: "No audience or list required" },
  ] as Array<{
    value?: number;
    display?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    label: string;
  }>,
};

/* ----------------------------------------------------------------- space -- */
export const space = {
  heading: {
    eyebrow: "Inside The Build",
    lead: "Real operators.",
    accent: "Real agencies.",
    lede: "Parts of the operation we install with you. Swap these for real photos of your team, workspace and dashboards.",
  } satisfies Heading,
  items: [
    { image: assets.space1, title: "The Command Centre", caption: "Pipeline and numbers in one place" },
    { image: assets.space2, title: "The Acquisition Engine", caption: "Outbound, paid and referral together" },
    { image: assets.space3, title: "Delivery Systems", caption: "SOPs that keep clients paying" },
    { image: assets.space4, title: "The Outcome", caption: "A business that runs without your hours" },
    { image: assets.space5, title: "Sales Floor", caption: "Scripts, reviews and close rates" },
    { image: assets.space6, title: "Onboarding", caption: "The first 30 days, systemised" },
    { image: assets.space7, title: "Team Build", caption: "Setters and closers you actually keep" },
    { image: assets.space8, title: "Partnership", caption: "Where we scale alongside you" },
  ] as Array<{ image: Asset; title: string; caption: string }>,
};

/* ---------------------------------------------------------- testimonials -- */
export const testimonials = {
  heading: {
    eyebrow: "Proof",
    lead: "In our",
    accent: "operators' words,",
    trail: "not ours.",
    lede: "Real agencies, built inside Elysium, run by people who started exactly where you are.",
  } satisfies Heading,
  featured: { poster: assets.posterFeatured, name: "Kevin Dawood", role: "The Kevin Estate", videoUrl: "" },
  items: [
    { poster: assets.kevin, name: "Kevin Dawood", role: "The Kevin Estate", videoUrl: "" },
    { poster: assets.zach, name: "Zach Mentz", role: "Eden Traders", videoUrl: "" },
    { poster: assets.gerardo, name: "Gerardo Garcia", role: "AGM Prestige", videoUrl: "" },
    { poster: assets.muqader, name: "Muqader", role: "Founder, Elysium", videoUrl: "" },
  ],
  /** Rendered as dashed empty slots until real client videos exist. */
  emptySlots: 2,
};

/* ------------------------------------------------------------ client wins -- */
export const clientWins = {
  heading: {
    eyebrow: "Client Wins",
    lead: "Receipts,",
    accent: "not promises.",
    lede: "Replace these tiles with real screenshots — payment notifications, closed deals, client messages.",
  } satisfies Heading,
  initialCount: 8,
  showAllLabel: "Show all wins",
  showLessLabel: "Show fewer wins",
};

/* ---------------------------------------------------------------- brands -- */
export const brands = {
  heading: {
    lead: "Started from scratch. Helped scale.",
    accent: "Partnered with.",
  } satisfies Heading,
  logos: [
    assets.logoKevinEstate,
    assets.logoEden,
    assets.logoAgm,
    assets.logoElios,
    assets.logoEmpyrean,
    assets.logoEon,
    assets.logoWestpeak,
  ],
};

/* --------------------------------------------------------------- package -- */
export const packages = {
  heading: {
    eyebrow: "The Offer",
    lead: "Select your package.",
    accent: "Get started today.",
    lede: "One build, two tracks. Which one fits depends on what you already have — we'll tell you straight on the call.",
  } satisfies Heading,
  cardTitle: "Everything it takes to own a real business — built for you.",
  cardSub:
    "We help closers and growth operators build their own agency and get the real high-ticket dream they were promised. All done for you.",
  tabs: [
    {
      id: "launch",
      label: "Launch Kit",
      title: "Track One — Launch",
      who: "For closers and growth operators starting from zero.",
      points: [
        "Offer, pricing and positioning built with you",
        "Entity, contracts and payment setup",
        "Acquisition system installed and running",
        "Sales training and live call reviews",
        "Delivery SOPs for your first clients",
      ],
    },
    {
      id: "scale",
      label: "Business Scaler",
      title: "Track Two — Scale",
      who: "For agency owners whose revenue has flattened.",
      points: [
        "Everything in Launch",
        "Repricing and repositioning of your offer",
        "Hiring, training and comp for setters and closers",
        "Retention and fulfilment rebuild",
        "Partnership, introductions and capital where it fits",
      ],
    },
  ],
  cta: { label: "Book Your Call", href: "#contact" },
  note: "No pressure and no obligation. We go through numbers openly on the call.",
};

/* ------------------------------------------------------------- ecosystem -- */
export const ecosystem = {
  heading: {
    eyebrow: "The System",
    lead: "Every component",
    accent: "works together.",
    lede: "One lead moves through every stage without you touching it. Four stages, twelve systems.",
  } satisfies Heading,
  stages: [
    {
      id: "01",
      name: "Capture",
      body: "Traffic lands, gets qualified, and books itself into your calendar.",
      systems: ["Website", "Landing pages", "Paid traffic", "Outbound"],
    },
    {
      id: "02",
      name: "Respond",
      body: "Every enquiry gets answered immediately, whatever hour it arrives.",
      systems: ["CRM", "AI chat", "AI phone", "AI text"],
    },
    {
      id: "03",
      name: "Deliver",
      body: "Signed clients get onboarded and served without you chasing anything.",
      systems: ["Scheduling", "Payments", "Onboarding", "Dispatch"],
    },
    {
      id: "04",
      name: "Grow",
      body: "The numbers come back so you know what to do more of next month.",
      systems: ["Marketing automation", "Reporting", "Retention", "Referrals"],
    },
  ],
};

/* ----------------------------------------------------------- case studies -- */
export const caseStudies = {
  heading: {
    eyebrow: "Case Studies",
    lead: "Real businesses.",
    accent: "Real numbers.",
    lede: "Replace the summaries below with real figures and timelines once each owner has signed off.",
  } satisfies Heading,
  items: [
    {
      image: assets.kevin,
      duration: "90 days",
      client: "The Kevin Estate",
      person: "Kevin Dawood",
      story:
        "Came in closing on someone else's offer with no business of his own. We built the offer and acquisition side together.",
      result: "Closer → agency owner",
    },
    {
      image: assets.zach,
      duration: "4 months",
      client: "Eden Traders",
      person: "Zach Mentz",
      story:
        "The piece nobody teaches is fulfilment. We installed the delivery system before the clients arrived, so they stayed.",
      result: "Built delivery before demand",
    },
    {
      image: assets.gerardo,
      duration: "1 quarter",
      client: "AGM Prestige",
      person: "Gerardo Garcia",
      story:
        "He brought the closing ability, we brought everything else — from a conversation to a working agency with people in it.",
      result: "Idea to agency with a team",
    },
  ],
};

/* ------------------------------------------------------------------ team -- */
export const team = {
  heading: {
    eyebrow: "The Team",
    lead: "The people who",
    accent: "actually do the work.",
    lede: "Responsible for building and scaling multiple high-ticket agencies. Backed by results.",
  } satisfies Heading,
  members: [
    { image: assets.muqader, name: "Muqader", role: "Founder", note: "Built the system that took Elysium to $2.5M in year one." },
    { image: assets.kevin, name: "Kevin Dawood", role: "The Kevin Estate", note: "Runs acquisition for Elysium operators." },
    { image: assets.zach, name: "Zach Mentz", role: "Eden Traders", note: "Builds the fulfilment and retention side." },
    { image: assets.gerardo, name: "Gerardo Garcia", role: "AGM Prestige", note: "Runs sales training and call reviews." },
  ],
};

/* ------------------------------------------------------------------- faq -- */
export const faq = {
  heading: {
    eyebrow: "Questions",
    lead: "The honest answers, including",
    accent: "the unflattering ones.",
  } satisfies Heading,
  items: [
    {
      q: "Who is this actually for?",
      a: "Closers, growth operators and existing agency owners. If you can already sell — or you're running an agency that has stalled — this is built for you. If you've never had a sales conversation in your life, we're not the right first step.",
    },
    {
      q: "What does “done for you” actually mean?",
      a: "We build the pieces with you rather than handing you a course and wishing you luck: the offer, the acquisition systems, the fulfilment infrastructure and the hiring. You still have to show up and close — everything around that, we install.",
    },
    {
      q: "How is this different from a course or a mastermind?",
      a: "A course sells you information and leaves the building to you. We do the building alongside you and stay in it until the system runs. That's also why we cap how many people we take on.",
    },
    {
      q: "How fast do people see results?",
      a: "It depends on your starting point, your market and how much you execute. Some operators sign their first client inside the first month; others take longer. Nothing here is a guarantee of income.",
    },
    {
      q: "Do I need an existing audience or client list?",
      a: "No. The acquisition system is built to work from a standing start. An existing audience helps, but it isn't a requirement for either track.",
    },
    {
      q: "How much time does this take each week?",
      a: "Plan for real working hours, not a side project. The build phase is front-loaded, and the operators who get results treat it like the business it's becoming.",
    },
    {
      q: "What does it cost?",
      a: "It depends which track fits and how much we're building for you. We go through numbers openly on the call — no pressure and no obligation to continue.",
    },
    {
      q: "What happens if it doesn't work?",
      a: "Some people don't execute, and some markets are harder than we expect. We screen on the call precisely so we don't take on operators we can't help — and if we don't think we can get you a result, we'll say so rather than sell you anyway.",
    },
  ],
};

/* ------------------------------------------------------------- final cta -- */
export const finalCta = {
  heading: {
    eyebrow: "Next Step",
    lead: "Let's map out",
    accent: "your business.",
    lede: "Tell us where you are now. We'll come back with what we'd build, what it would take, and whether we're the right people to do it.",
  } satisfies Heading,
  steps: [
    { n: "01", title: "Send your application", body: "Takes under a minute. Tell us where you are now." },
    { n: "02", title: "We review it properly", body: "A real operator reads it, not an automated filter." },
    { n: "03", title: "Book your call", body: "If it's a fit, you'll pick a time and speak to us directly." },
  ],
  roles: [
    "Closer / sales rep for someone else",
    "Growth operator",
    "Agency owner — under $10k/mo",
    "Agency owner — $10k/mo or more",
    "Brand new to high ticket",
  ],
  consent:
    "By submitting you agree to be contacted about your application. We don't sell your details, and you can opt out at any time.",
};
