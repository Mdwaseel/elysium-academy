import { rating } from "@/data/content";

/**
 * Thin trust strip directly beneath the hero.
 *
 * The star row is decorative; the accessible name carries the actual rating.
 */
export function RatingBar() {
  return (
    <section className="border-b border-line bg-bg py-6">
      <div className="shell-wide">
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-center">
          <span className="inline-flex items-center gap-2.5 text-[0.92rem] text-ink-soft">
            <span
              className="inline-flex gap-0.5 text-[1.02rem] leading-none text-rating"
              role="img"
              aria-label={`${rating.stars} out of 5`}
            >
              {"★".repeat(rating.stars)}
            </span>
            <b className="font-bold text-navy">{rating.label}</b>
          </span>

          {rating.facts.map((fact) => (
            <span key={fact.label} className="text-[0.92rem] text-ink-soft">
              {fact.label} <b className="font-bold text-navy">{fact.value}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
