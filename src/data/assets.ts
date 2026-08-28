/**
 * Central asset map.
 *
 * No component hard-codes an image path — everything resolves through here so
 * media can be swapped in one place. Each entry carries the intrinsic size and
 * the crop the layout expects, so a replacement can preserve composition.
 */

export type Asset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** object-position to preserve the intended crop on replacement. */
  position?: string;
  /** true when this is a stand-in awaiting real brand media. */
  placeholder?: boolean;
};

export const assets = {
  /* ------------------------------------------------------------ brand -- */
  logoMark: {
    src: "/brand/elysium-mark.jpeg",
    alt: "Elysium Academy",
    width: 1276,
    height: 1276,
  },
  logoLandscape: {
    src: "/brand/elysium-landscape.jpeg",
    alt: "Elysium Academy",
    width: 1685,
    height: 937,
  },

  /* ------------------------------------------------------------- hero -- */
  hero: {
    src: "/media/1.jpeg",
    alt: "",
    width: 1685,
    height: 937,
    position: "center 55%",
  },

  /* --------------------------------------------------- video posters -- */
  posterFounder: {
    src: "/team/muqader-2.jpeg",
    alt: "",
    width: 1200,
    height: 1200,
    position: "center top",
  },
  posterDayInLife: {
    src: "/media/10.png",
    alt: "",
    width: 1100,
    height: 1700,
    placeholder: true,
  },
  posterFeatured: {
    src: "/team/kevin-dawood.jpeg",
    alt: "",
    width: 1200,
    height: 1200,
    position: "center top",
  },

  /* ------------------------------------------------------------- team -- */
  muqader: {
    src: "/team/muqader-1.jpeg",
    alt: "Muqader, founder of Elysium Academy",
    width: 1200,
    height: 1200,
    position: "center top",
  },
  kevin: {
    src: "/team/kevin-dawood.jpeg",
    alt: "Kevin Dawood, The Kevin Estate",
    width: 1200,
    height: 1200,
    position: "center top",
  },
  zach: {
    src: "/team/zach-mentz.jpeg",
    alt: "Zach Mentz, Eden Traders",
    width: 1200,
    height: 1200,
    position: "center top",
  },
  gerardo: {
    src: "/team/gerardo-garcia.jpeg",
    alt: "Gerardo Garcia, AGM Prestige",
    width: 1200,
    height: 1200,
    position: "center top",
  },

  /* --------------------------------------------- workspace / gallery -- */
  /* Stand-ins. Replace with real workspace and team photography; the layout
     expects 4:3 landscape crops here. */
  space1: { src: "/media/10.png", alt: "Operator workstation", width: 1100, height: 1700, placeholder: true },
  space2: { src: "/media/1.jpeg", alt: "Workspace overlooking a skyline", width: 1685, height: 937, placeholder: true },
  space3: { src: "/media/2.jpeg", alt: "Operator workspace", width: 1685, height: 937, placeholder: true },
  space4: { src: "/media/5.png", alt: "On the move", width: 1100, height: 1700, placeholder: true },
  space5: { src: "/media/3.png", alt: "Sales floor", width: 1100, height: 1700, placeholder: true },
  space6: { src: "/media/6.png", alt: "Onboarding", width: 1100, height: 1700, placeholder: true },
  space7: { src: "/media/7.png", alt: "Team build", width: 1100, height: 1700, placeholder: true },
  space8: { src: "/media/9.png", alt: "Partnership", width: 1100, height: 1700, placeholder: true },

  /* ------------------------------------------------------------ logos -- */
  logoKevinEstate: { src: "/logos/kevin-estate.jpeg", alt: "The Kevin Estate", width: 800, height: 800 },
  logoEden: { src: "/logos/eden.jpg", alt: "Eden Traders", width: 800, height: 800 },
  logoAgm: { src: "/logos/agm-prestige.jpg", alt: "AGM Prestige", width: 800, height: 800 },
  logoElios: { src: "/logos/elios.jpg", alt: "Elios", width: 800, height: 800 },
  logoEmpyrean: { src: "/logos/empyrean.jpg", alt: "Empyrean", width: 800, height: 800 },
  logoEon: { src: "/logos/eon.jpg", alt: "Eon", width: 800, height: 800 },
  logoWestpeak: { src: "/logos/westpeak.jpg", alt: "Westpeak", width: 800, height: 800 },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;

/**
 * Square stand-ins for the client-wins wall. These MUST be replaced with real
 * screenshots (payment notifications, closed deals, client messages) — the
 * section is the single highest-converting block on the page.
 */
export const winPlaceholders: Asset[] = [
  "/media/3.png",
  "/media/4.png",
  "/media/6.png",
  "/media/7.png",
  "/media/8.png",
  "/media/9.png",
  "/media/11.png",
  "/media/5.png",
  "/media/1.jpeg",
  "/media/2.jpeg",
  "/media/10.png",
  "/media/4.png",
].map((src, i) => ({
  src,
  alt: `Client win screenshot placeholder ${i + 1}`,
  width: 1100,
  height: 1100,
  placeholder: true,
}));
