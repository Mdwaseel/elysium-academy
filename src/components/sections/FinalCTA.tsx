"use client";

import { useState, type FormEvent } from "react";
import { finalCta } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "role", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Closing conversion band: numbered process on one side, application form on
 * the other. Validation is client-side only — wire `onSubmit` to a CRM
 * endpoint when one exists.
 */
export function FinalCTA() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};

    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();

    if (!firstName) next.firstName = "Required";
    if (!lastName) next.lastName = "Required";
    if (!EMAIL.test(email)) next.email = "Enter a valid email address";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number";
    if (!role) next.role = "Required";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // TODO: POST to the CRM / booking endpoint.
    setSent(true);
  };

  const fieldClass = (invalid?: string) =>
    cn(
      "w-full rounded-[8px] border bg-white px-[15px] py-[13px] text-base text-ink transition-all duration-200",
      "focus:outline-none focus:ring-3 focus:ring-accent/15",
      invalid ? "border-[#c0392b]" : "border-line-strong focus:border-accent",
    );

  return (
    <section id="contact" className="band bg-bg-alt">
      <div className="shell">
        <div className="grid gap-[clamp(32px,5vw,64px)] lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHeading heading={finalCta.heading} align="left" className="mb-8" />

            <ol className="grid gap-4">
              {finalCta.steps.map((step) => (
                <li
                  key={step.n}
                  className="grid grid-cols-[38px_1fr] items-start gap-4 rounded-[12px] border border-line bg-white p-4"
                >
                  <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-navy text-[0.82rem] font-bold text-white">
                    {step.n}
                  </span>
                  <span>
                    <b className="block text-[1rem] font-bold text-navy">{step.title}</b>
                    <span className="mt-0.5 block text-[0.92rem] text-ink-soft">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[18px] border border-line bg-white p-[clamp(26px,3.5vw,40px)] shadow-[0_6px_22px_rgba(13,27,47,0.09)]">
            {sent ? (
              <div className="py-10 text-center" role="status">
                <p className="t-h3 text-navy">Application received.</p>
                <p className="mt-3 text-[0.95rem] text-ink-soft">
                  We&apos;ll review it and come back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid gap-[18px] sm:grid-cols-2">
                  <div className="grid gap-[7px]">
                    <label htmlFor="firstName" className="text-[0.8rem] font-semibold text-navy">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "err-firstName" : undefined}
                      className={fieldClass(errors.firstName)}
                      placeholder="Jordan"
                    />
                    <p id="err-firstName" className="min-h-4 text-[0.79rem] text-[#c0392b]">
                      {errors.firstName}
                    </p>
                  </div>

                  <div className="grid gap-[7px]">
                    <label htmlFor="lastName" className="text-[0.8rem] font-semibold text-navy">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "err-lastName" : undefined}
                      className={fieldClass(errors.lastName)}
                      placeholder="Reyes"
                    />
                    <p id="err-lastName" className="min-h-4 text-[0.79rem] text-[#c0392b]">
                      {errors.lastName}
                    </p>
                  </div>

                  <div className="grid gap-[7px] sm:col-span-2">
                    <label htmlFor="email" className="text-[0.8rem] font-semibold text-navy">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={fieldClass(errors.email)}
                      placeholder="you@email.com"
                    />
                    <p id="err-email" className="min-h-4 text-[0.79rem] text-[#c0392b]">
                      {errors.email}
                    </p>
                  </div>

                  <div className="grid gap-[7px] sm:col-span-2">
                    <label htmlFor="phone" className="text-[0.8rem] font-semibold text-navy">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      className={fieldClass(errors.phone)}
                      placeholder="+1 555 000 1234"
                    />
                    <p id="err-phone" className="min-h-4 text-[0.79rem] text-[#c0392b]">
                      {errors.phone}
                    </p>
                  </div>

                  <div className="grid gap-[7px] sm:col-span-2">
                    <label htmlFor="role" className="text-[0.8rem] font-semibold text-navy">
                      Where are you right now?
                    </label>
                    <select
                      id="role"
                      name="role"
                      defaultValue=""
                      aria-invalid={!!errors.role}
                      aria-describedby={errors.role ? "err-role" : undefined}
                      className={cn(fieldClass(errors.role), "appearance-none pr-10")}
                    >
                      <option value="">Select one</option>
                      {finalCta.roles.map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>
                    <p id="err-role" className="min-h-4 text-[0.79rem] text-[#c0392b]">
                      {errors.role}
                    </p>
                  </div>
                </div>

                <Button size="lg" className="mt-4 w-full" arrow>
                  Book Your Call
                </Button>

                <p className="mt-4 text-center text-[0.78rem] leading-relaxed text-ink-mute">
                  {finalCta.consent}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
