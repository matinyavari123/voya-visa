import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountryFlag from "@/components/CountryFlag";
import { ContactSection } from "@/components/sections";
import { countries, getCountry } from "@/data/countries";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = getCountry((await params).slug);
  if (!country) return {};
  return {
    title: `ویزای ${country.name}`,
    description: `اخذ ویزای ${country.visaTypes.join("، ")} ${country.name} با ویا ویزا.`,
    alternates: { canonical: `/countries/${country.slug}` },
  };
}

export default async function CountryPage({ params }: Props) {
  const country = getCountry((await params).slug);
  if (!country) notFound();

  return (
    <>
      <section className="container-page flex flex-wrap items-center gap-10 py-16 md:py-20">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <nav aria-label="مسیر صفحه" className="text-sm text-fog">
            <Link href="/" className="hover:text-snow">خانه</Link>
            <span className="mx-2">/</span>
            <Link href="/countries" className="hover:text-snow">کشورها</Link>
            <span className="mx-2">/</span>
            <span className="text-snow">{country.name}</span>
          </nav>
          <h1 className="text-3xl font-black md:text-5xl">ویزای {country.name}</h1>
          <p className="text-lg text-mist">{country.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {country.visaTypes.map((t) => (
              <li key={t} className="rounded-full bg-sage px-4 py-1 text-sm font-bold text-deep">
                ویزای {t}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary min-h-12 w-fit px-7">
            مشاوره برای ویزای {country.name}
          </Link>
        </div>
        <div
          className="relative flex min-w-0 flex-[1_1_380px] items-center justify-center overflow-hidden rounded-[28px] border border-sage/20 bg-moss-2"
          style={{ minHeight: "20rem" }}
        >
          {country.image ? (
            <>
              <img
                src={country.image}
                alt={`نمایی از ${country.name}`}
                width={800}
                height={500}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(11,31,25,0.7), transparent 60%)" }}
              />
              <CountryFlag
                slug={country.slug}
                className="absolute top-5 right-5 h-[40px] w-[60px] rounded-[6px] shadow-[0_6px_18px_rgba(0,0,0,0.5)] ring-1 ring-white/25"
              />
            </>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(201,211,160,0.16), transparent 70%)" }}
              />
              <div className="relative flex flex-col items-center gap-5">
                <CountryFlag
                  slug={country.slug}
                  className="h-[120px] w-[180px] rounded-[10px] shadow-[0_14px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
                />
                <span dir="ltr" className="text-sm tracking-[0.22em] text-fog uppercase">
                  {country.nameEn}
                </span>
              </div>
            </>
          )}
        </div>
      </section>
      <ContactSection />
    </>
  );
}
