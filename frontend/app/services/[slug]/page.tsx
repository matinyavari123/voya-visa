import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { StepsSection, ContactSection } from "@/components/sections";
import { services, getService } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <section className="border-b border-white/10">
        <div className="container-page flex flex-col gap-6 py-16 md:py-20">
          <nav aria-label="مسیر صفحه" className="text-sm text-fog">
            <Link href="/" className="hover:text-snow">خانه</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="hover:text-snow">خدمات</Link>
            <span className="mx-2">/</span>
            <span className="text-snow">{service.title}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-moss text-sage">
              <Icon name={service.icon} size={32} strokeWidth={1.6} />
            </span>
            <h1 className="text-3xl font-black md:text-5xl">{service.title}</h1>
          </div>
          <p className="max-w-2xl text-lg text-mist">{service.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/contact?service=${service.slug}`} className="btn btn-primary min-h-12 px-7">
              درخواست مشاوره برای {service.title}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream text-deep">
        <div className="container-page grid gap-6 py-16 md:grid-cols-2">
          <div className="rounded-[22px] border border-line bg-white p-7">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold">
              <Icon name="doc" size={22} className="text-rose-dark" /> مدارک لازم
            </h2>
            <ul className="flex flex-col gap-2.5 text-muted">
              {service.documents.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <Icon name="check" size={18} strokeWidth={2} className="text-olive" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-line bg-white p-7">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold">
              <Icon name="clock" size={22} className="text-rose-dark" /> زمان تقریبی
            </h2>
            <p className="text-muted">{service.duration}</p>
            <p className="mt-4 text-sm text-muted">
              زمان دقیق به کشور مقصد و نوبت سفارت بستگی داره. در مشاوره‌ی اولیه برآورد دقیق‌تری می‌گیرید.
            </p>
          </div>
        </div>
      </section>

      <StepsSection />
      <ContactSection defaultService={service.slug} />
    </>
  );
}
