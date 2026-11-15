"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Icon from "./Icon";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink">
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Logo />

        <nav aria-label="منوی اصلی" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-snow/85 transition-colors hover:text-rose-light">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${site.phone}`} dir="ltr" className="text-[15px] font-bold text-snow/85 hover:text-snow">
            {site.phoneDisplay}
          </a>
          <Link href="/login" className="text-[15px] font-medium text-snow/85 transition-colors hover:text-rose-light">
            ورود
          </Link>
          <span aria-hidden="true" className="text-white/20">
            |
          </span>
          <Link href="/register" className="text-[15px] font-medium text-snow/85 transition-colors hover:text-rose-light">
            ثبت‌نام
          </Link>
          <Link href="/contact" className="btn btn-primary text-sm">
            درخواست مشاوره
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="منوی موبایل" className="border-t border-white/10 lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 font-medium hover:bg-moss">
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-xl px-3 py-3 font-medium hover:bg-moss">
              ورود به حساب کاربری
            </Link>
            <Link href="/register" className="rounded-xl px-3 py-3 font-medium hover:bg-moss">
              ثبت‌نام
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-primary flex-1">
                درخواست مشاوره
              </Link>
              <a href={`tel:${site.phone}`} dir="ltr" className="btn btn-ghost flex-1">
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
