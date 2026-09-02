import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Why } from "@/components/sections/Why";
import { DayInTheLife } from "@/components/sections/DayInTheLife";
import { Space } from "@/components/sections/Space";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientWins } from "@/components/sections/ClientWins";
import { Brands } from "@/components/sections/Brands";
import { Packages } from "@/components/sections/Packages";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

/**
 * Page composition.
 *
 * Band order alternates dark / light so the page reads in distinct chapters:
 * dark hero → light context → dark proof → light offer → dark package →
 * light system → light close → dark footer.
 */
export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <Why />
        <DayInTheLife />
        <Space />
        <Testimonials />
        <ClientWins />
        <Brands />
        <Packages />
        <Ecosystem />
        <CaseStudies />
        <Team />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
