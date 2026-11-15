import Link from "next/link";
import Icon from "./Icon";
import CountryFlag from "./CountryFlag";
import type { Service } from "@/data/services";
import type { Country } from "@/data/countries";
import type { Tour } from "@/data/content";
import { site } from "@/data/site";

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`flex max-w-2xl flex-col gap-2 ${center ? "mx-auto items-center text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-rose-dark" : "text-rose-light"}`}>{eyebrow}</p>}
      <Tag className="text-3xl leading-snug font-extrabold md:text-[38px]">{title}</Tag>
      {text && <p className={`text-[17px] ${light ? "text-muted" : "text-mist"}`}>{text}</p>}
    </div>
  );
}

export function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-moss-2 p-6 text-center text-sm text-haze ${className}`}
    >
      <Icon name="image" size={36} strokeWidth={1.4} />
      <span>{label}</span>
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col gap-3.5 rounded-[22px] border border-line bg-white p-7 text-deep transition-shadow hover:shadow-[0_12px_40px_rgba(18,37,31,0.1)]"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-deep text-sage">
        <Icon name={service.icon} size={28} strokeWidth={1.6} />
      </span>
      <span className="text-[21px] font-extrabold">{service.title}</span>
      <span className="text-[15px] text-muted">{service.short}</span>
      <span className="mt-auto flex items-center gap-1 text-sm font-bold text-rose-dark">
        اطلاعات بیشتر
        <Icon name="arrow" size={16} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-sage/15 bg-moss text-snow"
    >
      <span className="relative flex h-44 items-center justify-center overflow-hidden bg-moss-2">
        {country.image ? (
          <>
            <img
              src={country.image}
              alt={`نمایی از ${country.name}`}
              width={800}
              height={500}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(11,31,25,0.85), rgba(11,31,25,0.1) 55%)" }}
            />
            <CountryFlag
              slug={country.slug}
              className="absolute top-3 right-3 h-[26px] w-[39px] rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/25"
            />
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(201,211,160,0.16), transparent 70%)" }}
            />
            <span className="relative flex flex-col items-center gap-3">
              <CountryFlag
                slug={country.slug}
                className="h-[52px] w-[78px] rounded-[6px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105"
              />
              <span dir="ltr" className="text-[11px] tracking-[0.18em] text-fog uppercase">
                {country.nameEn}
              </span>
            </span>
          </>
        )}
      </span>
      <span className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="flex flex-col leading-normal">
          <span className="text-[19px] font-extrabold">{country.name}</span>
          <span className="text-[13px] text-fog">{country.visaTypes.join(" · ")}</span>
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-snow/30 transition-colors group-hover:border-rose-light group-hover:text-rose-light">
          <Icon name="arrow" size={18} strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
}

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="flex flex-col gap-3.5 rounded-[22px] border border-sage/15 bg-ink p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-sage px-3 py-0.5 text-[13px] font-bold text-deep">{tour.duration}</span>
        <span className="text-[13px] text-fog">{tour.departure}</span>
      </div>
      <h3 className="text-[22px] font-extrabold">{tour.title}</h3>
      <p className="text-sm text-fog">{tour.route}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3.5">
        <span className="font-extrabold text-rose-light">{tour.price} تومان</span>
        <Link href={`/contact?service=tours`} className="btn btn-ghost min-h-11 px-5 text-sm">
          رزرو
        </Link>
      </div>
    </article>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="گفتگو در واتساپ"
      className="fixed bottom-6 left-6 z-50 flex h-15 w-15 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
    >
      <Icon name="whatsapp" size={30} />
    </a>
  );
}

/**
 * ریل اسلایدی با دکمه‌های قبلی/بعدی و نقطه‌ها.
 * رفتارش را public/slider.js می‌سازد؛ بدون آن هم ریل با کشیدن کار می‌کند.
 */
export function Slider({
  eyebrow,
  title,
  text,
  label,
  slides,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  label: string;
  slides: { key: string; content: React.ReactNode }[];
}) {
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-deep/25 text-deep transition-colors hover:border-deep hover:bg-deep hover:text-cream disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-deep";

  return (
    <div className="flex flex-col gap-8" data-slider="">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading light eyebrow={eyebrow} title={title} text={text} />
        <div className="flex gap-2">
          <button type="button" data-slider-prev="" aria-label="قبلی" className={btn}>
            <Icon name="arrow" size={20} strokeWidth={2} className="rotate-180" />
          </button>
          <button type="button" data-slider-next="" aria-label="بعدی" className={btn}>
            <Icon name="arrow" size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <ul
        data-slider-track=""
        tabIndex={0}
        aria-label={label}
        className="-mx-1 flex snap-x snap-mandatory list-none gap-5 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&.is-dragging]:cursor-grabbing [&.is-dragging]:select-none [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s) => (
          <li
            key={s.key}
            data-slider-slide=""
            className="w-[86%] shrink-0 snap-start [transform-origin:50%_50%] [backface-visibility:hidden] will-change-[transform,opacity] sm:w-[calc(50%-0.63rem)] lg:w-[calc(33.333%-0.84rem)]"
          >
            {s.content}
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            data-slider-dot=""
            aria-label={`مورد ${(i + 1).toLocaleString("fa-IR")}`}
            className="h-2.5 w-2.5 rounded-full bg-deep/25 transition-all aria-[current=true]:w-7 aria-[current=true]:bg-rose"
          />
        ))}
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-white/10">
      <div className="container-page py-16 md:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} text={text} as="h1" />
      </div>
    </section>
  );
}
