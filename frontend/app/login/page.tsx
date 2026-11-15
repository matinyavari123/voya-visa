import type { Metadata } from "next";
import Link from "next/link";
import AuthShell from "@/components/login/AuthShell";
import LoginForm from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
  description: "ورود به پنل کاربری ویا ویزا برای پیگیری وضعیت پرونده‌ی ویزا.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell
      active="/login"
      eyebrow="حساب کاربری"
      title="ورود به پنل پیگیری پرونده"
      text="با شماره‌ای که پرونده‌تون باهاش ثبت شده وارد بشید و مرحله‌ی فعلی ویزاتون رو ببینید."
      bullets={[
        "مرحله‌ی فعلی پرونده",
        "مدارک تحویل‌شده و باقی‌مانده",
        "تاریخ وقت سفارت",
        "پیام‌های کارشناس پرونده",
      ]}
    >
      <LoginForm />
      {/* TODO: بعد از اتصال به بک‌اند، پنل فقط بعد از ورود باز می‌شود */}
      <p className="mt-4 text-center text-sm text-fog">
        نمونه‌ی پنل را ببینید:{" "}
        <Link href="/panel" className="font-bold text-rose-light hover:text-snow">
          مشاوره‌های من
        </Link>
      </p>
    </AuthShell>
  );
}
