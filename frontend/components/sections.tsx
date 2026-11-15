import Link from "next/link";
import Icon from "./Icon";
import ConsultForm from "./ConsultForm";
import { SectionHeading, ServiceCard, CountryCard, TourCard, ImagePlaceholder, Slider } from "./ui";
import { services } from "@/data/services";
import { countries, featuredCountries } from "@/data/countries";
import { tours, steps, faqs, benefits } from "@/data/content";
import { site } from "@/data/site";

const toFa = (n: number) => n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 });

/** پرچم کشورهای پرطرفدار، روی کره‌ی سه‌بعدی. مختصات پایتخت هر کشور. */
// lift: کشورهای نزدیک به هم (انگلیس/فرانسه، آلمان/ایتالیا) در ارتفاع متفاوت
// می‌نشینند تا پرچم‌هاشون روی هم نیفته.
const globeMarkers = [
  { slug: "uk", lat: 51.5, lon: -0.13, lift: 0.3 },
  { slug: "france", lat: 48.86, lon: 2.35, lift: 0 },
  { slug: "germany", lat: 52.52, lon: 13.4, lift: 0.3 },
  { slug: "italy", lat: 41.9, lon: 12.5, lift: 0 },
  { slug: "spain", lat: 40.42, lon: -3.7, lift: 0 },
  { slug: "usa", lat: 38.9, lon: -77.04, lift: 0 },
  { slug: "russia", lat: 55.75, lon: 37.6, lift: 0.3 },
  { slug: "uae", lat: 25.2, lon: 55.3, lift: 0 },
  { slug: "india", lat: 28.6, lon: 77.2, lift: 0.3 },
  { slug: "singapore", lat: 1.35, lon: 103.8, lift: 0 },
  { slug: "taiwan", lat: 25.03, lon: 121.5, lift: 0.3 },
  { slug: "australia", lat: -33.87, lon: 151.2, lift: 0 },
].map((m) => ({ ...m, flag: `/images/flags/${m.slug}.png` }));

export function Hero() {
  return (
    <section className="container-page flex flex-wrap items-center gap-12 py-16 md:py-20">
      <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
        <p className="eyebrow text-sage">ویزای توریستی، تحصیلی و کاری + تورهای خارجی</p>
        <h1 className="text-4xl leading-[1.3] font-black md:text-[56px]">
          با ویا ویزا،
          <br />
          <span className="text-rose-light">{site.tagline}</span>
        </h1>
        <p className="max-w-[520px] text-lg text-mist">
          از اولین مشاوره تا دریافت ویزا کنارتون هستیم: شرایط پرونده‌تون رو بررسی می‌کنیم، مدارک رو آماده می‌کنیم و تا
          آخر مسیر همراهتون می‌مونیم.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary min-h-12 px-7 text-base">
            <Icon name="send" size={18} strokeWidth={2} />
            همین حالا پیام بدید
          </Link>
          <Link href="/#services" className="btn btn-ghost min-h-12 px-7 text-base">
            مشاهده خدمات
          </Link>
        </div>
        <ul className="flex flex-wrap gap-6 pt-2 text-sm text-snow/85">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <Icon name="check" size={18} strokeWidth={2} className="text-sage" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0 flex-[1_1_420px]">
        <div className="relative overflow-hidden rounded-[28px] border border-sage/20">
          {/* کره‌ی سه‌بعدی؛ تا وقتی WebGL بالا بیاد عکس زیرش دیده می‌شه */}
          <div
            id="voya-globe"
            data-map="/images/world.jpg"
            data-markers={JSON.stringify(globeMarkers)}
            className="relative h-[380px] w-full md:h-[460px]"
            style={{ background: "radial-gradient(70% 70% at 50% 40%, #16352B 0%, #0B1F19 100%)" }}
          >
            <img
              data-globe-fallback=""
              src="/images/hero.jpg"
              alt="بال هواپیما بالای ابرها هنگام غروب"
              width={900}
              height={760}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute right-5 bottom-5 flex items-center gap-3 rounded-[18px] bg-cream px-4 py-3.5 text-deep shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-olive-dark text-cream">
              <Icon name="shield" size={22} />
            </span>
            <span className="flex flex-col leading-snug">
              <strong className="text-[15px]">[تعداد] پرونده‌ی موفق</strong>
              <span className="text-xs text-muted">عدد واقعی از مشتری</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 bg-cream text-deep">
      <div className="container-page py-20 md:py-22">
        <Slider
          label="خدمات ویا ویزا"
          eyebrow="خدمات ما"
          title="هر نوع سفری که در نظر دارید"
          text="برای هر نوع ویزا مسیر جداگانه‌ای داریم؛ از بررسی اولیه‌ی شرایط تا تحویل پاسپورت."
          slides={services.map((sv) => ({ key: sv.slug, content: <ServiceCard service={sv} /> }))}
        />
      </div>
    </section>
  );
}

export function StepsSection() {
  const last = steps.length - 1;
  return (
    <section className="border-t border-line bg-cream text-deep">
      <div className="container-page py-20">
        <Slider
          label="مراحل کار"
          eyebrow="مسیر کار"
          title="از مشاوره تا ویزا، در چهار قدم"
          slides={steps.map((step, i) => ({
            key: step.title,
            content: (
              <article
                className={`flex h-full flex-col gap-3 rounded-[22px] border border-line border-t-[3px] bg-white p-7 ${
                  i === last ? "border-t-rose" : "border-t-deep"
                }`}
              >
                <span className={`text-[44px] leading-none font-black ${i === last ? "text-rose-dark" : "text-olive"}`}>
                  {toFa(i + 1)}
                </span>
                <h3 className="text-xl font-extrabold">{step.title}</h3>
                <p className="text-[15px] text-muted">{step.text}</p>
              </article>
            ),
          }))}
        />
      </div>
    </section>
  );
}

export function CountriesSection() {
  return (
    <section>
      <div className="container-page flex flex-col gap-10 py-20 md:py-22">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="مقصدهای پرطرفدار" title="کجا می‌خواید برید؟" />
          <Link href="/countries" className="flex items-center gap-1 font-bold text-sage hover:text-snow">
            همه‌ی {countries.length} کشور <Icon name="arrow" size={16} strokeWidth={2} />
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
          {featuredCountries.map((c) => (
            <CountryCard key={c.slug} country={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ToursSection() {
  return (
    <section className="bg-forest">
      <div className="container-page flex flex-col gap-10 py-20 md:py-22">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="تورهای خارجی" title="تورهای پیش رو" />
          <Link href="/tours" className="flex items-center gap-1 font-bold text-sage hover:text-snow">
            همه‌ی تورها <Icon name="arrow" size={16} strokeWidth={2} />
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {tours.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-cream text-deep">
      <div className="mx-auto flex max-w-[860px] flex-col gap-8 px-6 py-20 md:py-22">
        <SectionHeading light center eyebrow="سؤالات متداول" title="پیش از شروع بدونید" />
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-[18px] border border-line bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl leading-none text-rose-dark transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ defaultService }: { defaultService?: string }) {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="container-page flex flex-wrap gap-12 py-20 md:py-22">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <SectionHeading
            eyebrow="درخواست مشاوره"
            title="برای مشاوره همین حالا پیام بدید"
            text="فرم رو پر کنید تا کارشناسان ما باهاتون تماس بگیرن، یا مستقیم در واتساپ پیام بدید."
          />
          <div className="flex flex-col gap-3.5 pt-2">
            <a href={`tel:${site.phone}`} className="flex items-center gap-3.5 hover:text-rose-light">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-moss text-rose-light">
                <Icon name="phone" size={22} />
              </span>
              <span dir="ltr" className="text-xl font-extrabold">
                {site.phoneDisplay}
              </span>
            </a>
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-moss text-rose-light">
                <Icon name="pin" size={22} />
              </span>
              <span>{site.address}</span>
            </div>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 hover:text-rose-light">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-moss text-rose-light">
                <Icon name="whatsapp" size={22} />
              </span>
              <span>گفتگو در واتساپ</span>
            </a>
          </div>
          {/* TODO: نقشه‌ی نشان یا گوگل‌مپ با iframe */}
          <ImagePlaceholder label="[نقشه‌ی دفتر – نشان / گوگل‌مپ]" className="h-52 rounded-[20px] border border-sage/15 bg-moss" />
        </div>
        <div className="min-w-0 flex-[1_1_420px]">
          <ConsultForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
