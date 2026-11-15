"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Icon from "@/components/Icon";
import { normalizeDigits, isValidMobile } from "@/lib/validate";

type Status = "idle" | "sending" | "error" | "wrong";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

const field =
  "h-[50px] w-full rounded-[14px] border border-field bg-white px-4 text-[15px] text-deep placeholder:text-muted/70 focus:border-rose focus:outline-none";

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const phone = normalizeDigits(data.phone ?? "").replace(/\s|-/g, "");

    const next: Record<string, string> = {};
    if (!isValidMobile(phone)) next.phone = "شماره موبایل معتبر نیست.";
    if (!data.password) next.password = "رمز عبور رو وارد کنید.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch(`${API}/auth/jwt/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password: data.password }),
      });

      if (res.ok) {
        const tokens = await res.json();
        try {
          localStorage.setItem("access", tokens.access);
          localStorage.setItem("refresh", tokens.refresh);
        } catch {
          // مرورگر خصوصی: توکن ذخیره نمی‌شود ولی ورود انجام شده
        }
        router.push("/panel");
        return;
      }

      setStatus(res.status === 401 ? "wrong" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px] rounded-[28px] bg-cream p-7 text-deep md:p-9">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold">ورود به حساب کاربری</h2>
        <p className="text-sm text-muted">با شماره‌ی موبایلی که پرونده باهاش ثبت شده وارد بشید.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="l-phone" className="text-sm font-bold">شماره موبایل</label>
        <input
          id="l-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="09xx xxx xxxx"
          className={`${field} text-right`}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-sm text-rose-dark">{errors.phone}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="l-password" className="text-sm font-bold">رمز عبور</label>
        <div className="relative">
          <input
            id="l-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className={`${field} pl-12`}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            className="absolute top-0 left-0 flex h-[50px] w-12 items-center justify-center text-muted hover:text-deep"
          >
            <Icon name={showPassword ? "close" : "shield"} size={20} />
          </button>
        </div>
        {errors.password && <p className="text-sm text-rose-dark">{errors.password}</p>}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <label htmlFor="l-remember" className="flex cursor-pointer items-center gap-2">
          <input id="l-remember" name="remember" type="checkbox" className="h-4 w-4 accent-[#c21a6b]" />
          مرا به خاطر بسپار
        </label>
        <Link href="/login" className="font-bold text-rose-dark hover:underline">
          رمز عبور را فراموش کرده‌اید؟
        </Link>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary min-h-[54px] text-[17px] font-extrabold disabled:opacity-60"
      >
        {status === "sending" ? "در حال ورود…" : "ورود"}
      </button>

      {status === "wrong" && (
        <p role="alert" className="text-center text-sm text-rose-dark">
          شماره موبایل یا رمز عبور درست نیست.
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-rose-dark">
          ارتباط با سرور برقرار نشد. دوباره تلاش کنید.
        </p>
      )}

      <p className="border-t border-line pt-4 text-center text-sm text-muted">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="font-bold text-rose-dark hover:underline">
          ثبت‌نام کنید
        </Link>
      </p>
    </form>
  );
}