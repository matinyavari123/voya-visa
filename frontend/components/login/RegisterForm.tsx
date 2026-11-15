"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import Icon from "@/components/Icon";
import { normalizeDigits, isValidMobile } from "@/lib/validate";

type Status = "idle" | "sending" | "error" | "done";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

function mapServerErrors(body: Record<string, string[] | undefined>) {
  const pairs: [string, string | undefined][] = [
    ["name", body.full_name?.[0]],
    ["phone", body.phone?.[0]],
    ["password", body.password?.[0]],
    ["confirm", body.re_password?.[0] ?? body.non_field_errors?.[0]],
  ];
  return Object.fromEntries(pairs.filter(([, v]) => v)) as Record<string, string>;
}

const field =
  "h-[50px] w-full rounded-[14px] border border-field bg-white px-4 text-[15px] text-deep placeholder:text-muted/70 focus:border-rose focus:outline-none";

export default function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const phone = normalizeDigits(data.phone ?? "").replace(/\s|-/g, "");

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "نام و نام خانوادگی رو وارد کنید.";
    if (!isValidMobile(phone)) next.phone = "شماره موبایل معتبر نیست.";
    if ((data.password ?? "").length < 8) next.password = "رمز عبور باید حداقل ۸ کاراکتر باشه.";
    else if (data.password !== data.confirm) next.confirm = "تکرار رمز عبور با رمز یکی نیست.";
    if (!data.terms) next.terms = "برای ساخت حساب باید قوانین رو بپذیرید.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch(`${API}/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          full_name: data.name,
          password: data.password,
          re_password: data.confirm,
        }),
      });

      if (res.status === 201) {
        setStatus("done");
        return;
      }

      const body = await res.json().catch(() => ({}));
      const serverErrors = mapServerErrors(body);
      if (Object.keys(serverErrors).length) {
        setErrors(serverErrors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-[28px] bg-cream p-10 text-center text-deep">
        <span className="text-2xl font-extrabold">حساب شما ساخته شد</span>
        <p className="text-muted">حالا می‌تونید با شماره و رمزتون وارد بشید.</p>
        <Link href="/login" className="btn btn-primary mt-2">
          ورود به حساب
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px] rounded-[28px] bg-cream p-7 text-deep md:p-9">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-extrabold">ثبت‌نام</h2>
        <p className="text-sm text-muted">فقط چند ثانیه طول می‌کشه.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="r-name" className="text-sm font-bold">نام و نام خانوادگی</label>
        <input
          id="r-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="مثلاً علی رضایی"
          className={field}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-sm text-rose-dark">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="r-phone" className="text-sm font-bold">شماره موبایل</label>
        <input
          id="r-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="09xx xxx xxxx"
          className={`${field} text-right`}
          aria-invalid={!!errors.phone}
        />
        {errors.phone ? (
          <p className="text-sm text-rose-dark">{errors.phone}</p>
        ) : (
          <p className="text-[13px] text-muted">کد تأیید به همین شماره پیامک می‌شه.</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="r-password" className="text-sm font-bold">رمز عبور</label>
        <div className="relative">
          <input
            id="r-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="حداقل ۸ کاراکتر"
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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="r-confirm" className="text-sm font-bold">تکرار رمز عبور</label>
        <input
          id="r-confirm"
          name="confirm"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          className={field}
          aria-invalid={!!errors.confirm}
        />
        {errors.confirm && <p className="text-sm text-rose-dark">{errors.confirm}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="r-terms" className="flex cursor-pointer items-start gap-2 text-sm">
          <input id="r-terms" name="terms" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#c21a6b]" />
          <span>
            <Link href="/register" className="font-bold text-rose-dark hover:underline">
              قوانین و حریم خصوصی
            </Link>{" "}
            رو خوندم و می‌پذیرم.
          </span>
        </label>
        {errors.terms && <p className="text-sm text-rose-dark">{errors.terms}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary min-h-[54px] text-[17px] font-extrabold disabled:opacity-60"
      >
        {status === "sending" ? "در حال ثبت‌نام…" : "ساخت حساب کاربری"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-rose-dark">
          ارتباط با سرور برقرار نشد. دوباره تلاش کنید.
        </p>
      )}

      <p className="border-t border-line pt-4 text-center text-sm text-muted">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-bold text-rose-dark hover:underline">
          وارد شوید
        </Link>
      </p>
    </form>
  );
}