import type { Metadata } from "next";
import { PageHero, CountryCard } from "@/components/ui";
import { ContactSection } from "@/components/sections";
import { countries } from "@/data/countries";

export const metadata: Metadata = {
  title: "کشورها",
  description: `${countries.length} کشور که ویا ویزا برای اخذ ویزای توریستی، تحصیلی و کاری آن‌ها همراهتون هست.`,
  alternates: { canonical: "/countries" },
};

// TODO: اگه مشتری دسته‌بندی دیگه‌ای خواست (مثلاً شینگن / غیرشینگن) این‌جا عوضش کن.
const groups = [
  { title: "اروپا", slugs: ["uk", "germany", "france", "italy", "spain", "netherlands", "belgium", "switzerland", "ireland", "poland", "czechia", "sweden", "norway", "denmark", "finland", "russia"] },
  { title: "آمریکا و اقیانوسیه", slugs: ["usa", "australia", "new-zealand"] },
  { title: "آسیا و خاورمیانه", slugs: ["uae", "kuwait", "india", "singapore", "taiwan", "vietnam"] },
];

export default function CountriesPage() {
  return (
    <>
      <PageHero
        eyebrow="مقصدها"
        title="کجا می‌خواید برید؟"
        text="کشور مقصدتون رو انتخاب کنید تا شرایط و نوع ویزاهاش رو ببینید."
      />
      <section className="container-page flex flex-col gap-14 py-16">
        {groups.map((group) => {
          const items = group.slugs
            .map((s) => countries.find((c) => c.slug === s))
            .filter((c): c is NonNullable<typeof c> => Boolean(c));
          if (!items.length) return null;
          return (
            <div key={group.title} className="flex flex-col gap-6">
              <h2 className="flex items-center gap-4 text-2xl font-extrabold">
                {group.title}
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-sm font-medium text-fog">{items.length} کشور</span>
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
                {items.map((c) => (
                  <CountryCard key={c.slug} country={c} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <ContactSection />
    </>
  );
}
