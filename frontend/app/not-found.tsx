import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center gap-5 py-28 text-center">
      <p className="font-logo text-7xl font-bold text-rose-light" dir="ltr">404</p>
      <h1 className="text-3xl font-extrabold">این صفحه پیدا نشد</h1>
      <p className="text-mist">شاید آدرس اشتباه وارد شده یا صفحه جابه‌جا شده.</p>
      <Link href="/" className="btn btn-primary">برگشت به صفحه اصلی</Link>
    </section>
  );
}
