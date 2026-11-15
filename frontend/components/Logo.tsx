import Link from "next/link";
import Icon from "./Icon";

// TODO: وقتی فایل SVG/PNG لوگو رسید، این رو با <Image src="/logo.svg" /> عوض کن.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 text-snow" aria-label="ویا ویزا – صفحه اصلی">
      {!compact && (
        <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-olive bg-cream text-olive-dark">
          <Icon name="globe" size={24} strokeWidth={1.6} />
        </span>
      )}
      <span dir="ltr" className="flex flex-col leading-tight">
        <span className="font-logo text-2xl font-bold tracking-wide">
          <span className="text-sage">voya</span>
          <span className="text-rose-light">visa</span>
        </span>
        {!compact && <span className="text-[10px] tracking-[0.2em] text-fog">VISA &amp; TRAVEL SERVICES</span>}
      </span>
    </Link>
  );
}
