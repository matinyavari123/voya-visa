import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { StepsSection, ContactSection } from "@/components/sections";
import Icon from "@/components/Icon";
import { benefits } from "@/data/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "درباره ما",
  description: `درباره‌ی ${site.name}؛ ${site.description}`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="درباره ما" title="ویا ویزا؛ همراه سفرتون" text={site.description} />
      <section className="container-page grid gap-10 py-16 md:grid-cols-2">
        <div className="flex flex-col gap-4 text-mist">
          {/* TODO: متن واقعی درباره‌ی مجموعه (سابقه، تیم، مجوزها) از مشتری */}
          <p>[معرفی مجموعه: از کی شروع به کار کرده، چه تیمی داره و تمرکزش روی چه کشورهاییه.]</p>
          <p>[مجوزها، افتخارات یا همکاری‌ها، اگه هست.]</p>
        </div>
        <ul className="flex flex-col gap-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-[18px] border border-sage/15 bg-moss p-5 font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose text-white">
                <Icon name="check" size={20} strokeWidth={2} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </section>
      <StepsSection />
      <ContactSection />
    </>
  );
}
