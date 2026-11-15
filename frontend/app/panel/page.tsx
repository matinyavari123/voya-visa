import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import RequestsPanel from "@/components/panel/RequestsPanel";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "مشاوره‌های من",
  description: "پیگیری درخواست‌های مشاوره و وضعیت پرونده‌ی ویزا در ویا ویزا.",
  alternates: { canonical: "/panel" },
  robots: { index: false, follow: false },
};

export default function PanelPage() {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="container-page flex flex-wrap items-end justify-between gap-6 py-12 md:py-16">
          <div className="flex flex-col gap-3">
            <nav aria-label="مسیر صفحه" className="text-sm text-fog">
              <Link href="/" className="hover:text-snow">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <span className="text-snow">مشاوره‌های من</span>
            </nav>
            <h1 className="text-3xl leading-snug font-black md:text-[42px]">مشاوره‌های من</h1>
            <p className="max-w-xl text-[17px] text-mist">
              وضعیت هر پرونده، مدارکی که مونده و قدم بعدی، همه یک‌جا.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary min-h-12 px-7">
            <Icon name="send" size={18} strokeWidth={2} />
            درخواست مشاوره‌ی جدید
          </Link>
        </div>
      </section>

      <section id="requests" className="scroll-mt-20">
        <div className="container-page flex flex-col gap-6 py-12 pb-20">
          <div className="flex flex-col gap-1">
            <p className="eyebrow text-rose-light">درخواست‌ها</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">پرونده‌های شما</h2>
          </div>

          <RequestsPanel />

          <p className="text-sm text-fog">
            سؤالی درباره‌ی پرونده‌تون دارید؟{" "}
            <a href={`tel:${site.phone}`} dir="ltr" className="font-bold text-rose-light hover:text-snow">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
