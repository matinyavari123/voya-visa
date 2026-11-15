import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { nav, site } from "@/data/site";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-fog">{site.description}</p>
        </div>

        <div>
          <h2 className="mb-4 font-bold">خدمات</h2>
          <ul className="flex flex-col gap-2 text-sm text-fog">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-snow">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-bold">دسترسی سریع</h2>
          <ul className="flex flex-col gap-2 text-sm text-fog">
            <li>
              <Link href="/panel" className="hover:text-snow">
                مشاوره‌های من
              </Link>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-snow">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-bold">تماس</h2>
          <ul className="flex flex-col gap-3 text-sm text-fog">
            <li className="flex items-center gap-2">
              <Icon name="phone" size={18} className="text-rose-light" />
              <a href={`tel:${site.phone}`} dir="ltr" className="hover:text-snow">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="pin" size={18} className="mt-1 shrink-0 text-rose-light" />
              {site.address}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="whatsapp" size={18} className="text-rose-light" />
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-snow">
                واتساپ
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-fog">
          <span>© {new Date().getFullYear()} ویا ویزا – تمامی حقوق محفوظ است</span>
          <span dir="ltr" className="italic">
            {site.slogan}
          </span>
        </div>
      </div>
    </footer>
  );
}
