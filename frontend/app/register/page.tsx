import type { Metadata } from "next";
import AuthShell from "@/components/login/AuthShell";
import RegisterForm from "@/components/login/RegisterForm";

export const metadata: Metadata = {
  title: "ثبت‌نام",
  description: "ساخت حساب کاربری در ویا ویزا برای پیگیری آنلاین پرونده‌ی ویزا.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <AuthShell
      active="/register"
      eyebrow="حساب کاربری"
      title="ساخت حساب کاربری"
      text="یک‌بار ثبت‌نام کنید تا بدون تماس تلفنی، وضعیت پرونده و مدارکتون رو همین‌جا ببینید."
      bullets={[
        "پیگیری پرونده بدون تماس تلفنی",
        "اطلاع از مدارک ناقص",
        "یادآوری وقت سفارت",
        "سابقه‌ی درخواست‌های قبلی",
      ]}
    >
      <RegisterForm />
    </AuthShell>
  );
}
