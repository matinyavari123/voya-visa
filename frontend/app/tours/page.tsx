import type { Metadata } from "next";
import { PageHero, TourCard } from "@/components/ui";
import { ContactSection } from "@/components/sections";
import { tours } from "@/data/content";

export const metadata: Metadata = {
  title: "تورهای خارجی",
  description: "تورهای خارجی ویا ویزا با خدمات کامل ویزا، پرواز و هتل.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <>
      <PageHero eyebrow="تورهای خارجی" title="تورهای پیش رو" text="ویزا، بلیت، هتل و برنامه‌ی سفر؛ همه در یک‌جا." />
      <section className="bg-forest">
        <div className="container-page grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5 py-16">
          {tours.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>
      <ContactSection defaultService="tours" />
    </>
  );
}
