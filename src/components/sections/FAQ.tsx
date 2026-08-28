import { faq } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  return (
    <section id="faq" className="band">
      <div className="shell">
        <SectionHeading heading={faq.heading} />
        <Accordion items={faq.items} />
      </div>
    </section>
  );
}
