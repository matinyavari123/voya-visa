import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/data/site";

const tabs = [
  { href: "/login", label: "ورود" },
  { href: "/register", label: "ثبت‌نام" },
];

export default function AuthShell({
  active,
  eyebrow,
  title,
  text,
  bullets,
  children,
}: {
  active: "/login" | "/register";
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-white/10">
        <div className="container-page flex flex-col gap-4 py-12 md:py-16">
          <nav aria-label="مسیر صفحه" className="text-sm text-fog">
            <Link href="/" className="hover:text-snow">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-snow">{tabs.find((t) => t.href === active)?.label}</span>
          </nav>
          <p className="eyebrow text-rose-light">{eyebrow}</p>
          <h1 className="text-3xl leading-snug font-black md:text-[42px]">{title}</h1>
          <p className="max-w-xl text-[17px] text-mist">{text}</p>
        </div>
      </section>

      <section className="container-page flex flex-wrap items-start justify-center gap-12 py-14 md:py-16">
        <div className="hidden min-w-0 flex-[1_1_360px] flex-col gap-5 lg:flex">
          <h2 className="text-xl font-extrabold">با حساب کاربری چی می‌بینید؟</h2>
          <ul className="flex flex-col gap-3 text-snow/85">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss text-sage">
                  <Icon name="check" size={18} strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-2 rounded-[18px] border border-sage/15 bg-moss p-5 text-sm text-mist">
            اگه پرونده‌ای ندارید، اول{" "}
            <Link href="/contact" className="font-bold text-rose-light hover:text-snow">
              درخواست مشاوره
            </Link>{" "}
            بدید تا کارشناسان ما شرایطتون رو بررسی کنن.
          </div>
        </div>

        <div className="min-w-0 flex-[1_1_400px] md:max-w-[460px]">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-moss p-1">
            {tabs.map((tab) => {
              const on = tab.href === active;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={on ? "page" : undefined}
                  className={`flex min-h-11 items-center justify-center rounded-full text-[15px] font-bold transition-colors ${
                    on ? "bg-rose text-white" : "text-snow/80 hover:text-snow"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
          {children}
          <p className="mt-5 text-center text-sm text-fog">
            مشکلی دارید؟{" "}
            <a href={`tel:${site.phone}`} dir="ltr" className="font-bold text-rose-light hover:text-snow">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
