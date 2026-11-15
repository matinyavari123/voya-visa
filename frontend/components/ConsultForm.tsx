"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { normalizeDigits, isValidMobile } from "@/lib/validate";

type Status = "idle" | "sending" | "success" | "error";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

const field =
  "h-[50px] w-full rounded-[14px] border border-field bg-white px-4 text-[15px] text-deep placeholder:text-muted/70 focus:border-rose focus:outline-none";

function authHeader(): Record<string, string> {
  try {
    const token = localStorage.getItem("access");
    return token ? { Authorization: `JWT ${token}` } : {};
  } catch {
    return {};
  }
}

export default function ConsultForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const phone = normalizeDigits(data.phone ?? "").replace(/\s|-/g, "");

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "نام رو وارد کنید.";
    if (!isValidMobile(phone)) next.phone = "شماره موبایل معتبر نیست.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const country = (data.country ?? "").trim();
    const message = [country && `کشور مقصد: ${country}`, (data.message ?? "").trim()]
      .filter(Boolean)
      .join("\n");

    setStatus("sending");
    try {
      const body = JSON.stringify({
        full_name: data.name,
        phone,
        service: data.service || null,
        message,
      });

      let res = await fetch(`${API}/requests/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body,
      });

      // توکن منقضی نباید جلوی ثبت درخواست عمومی را بگیرد
      if (res.status === 401) {
        res = await fetch(`${API}/requests/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
      }

      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-[28px] bg-cream p-10 text-center text-deep">
        <span className="text-2xl font-extrabold">درخواستتون ثبت شد</span>
        <p className="text-muted">کارشناسان ویا ویزا به‌زودی باهاتون تماس می‌گیرن.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-primary mt-2">
          ثبت درخواست جدید
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px] rounded-[28px] bg-cream p-7 text-deep md:p-9">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-name" className="text-sm font-bold">نام و نام خانوادگی</label>
        <input id="f-name" name="name" type="text" autoComplete="name" placeholder="مثلاً علی رضایی" className={field} aria-invalid={!!errors.name} />
        {errors.name && <p className="text-sm text-rose-dark">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-phone" className="text-sm font-bold">شماره موبایل</label>
        <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="09xx xxx xxxx" className={`${field} text-right`} aria-invalid={!!errors.phone} />
        {errors.phone && <p className="text-sm text-rose-dark">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-service" className="text-sm font-bold">نوع درخواست</label>
          <select id="f-service" name="service" defaultValue={defaultService ?? services[0].slug} className={`${field} px-3`}>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-country" className="text-sm font-bold">کشور مقصد</label>
          <input id="f-country" name="country" type="text" placeholder="مثلاً فرانسه" className={field} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-msg" className="text-sm font-bold">توضیحات (اختیاری)</label>
        <textarea id="f-msg" name="message" rows={3} className="w-full resize-y rounded-[14px] border border-field bg-white px-4 py-3 text-[15px] text-deep focus:border-rose focus:outline-none" />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary min-h-[54px] text-[17px] font-extrabold disabled:opacity-60">
        {status === "sending" ? "در حال ارسال…" : "ارسال درخواست مشاوره"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-center text-sm text-rose-dark">
          ارسال انجام نشد. لطفاً دوباره امتحان کنید یا با{" "}
          <a href={`tel:${site.phone}`} className="font-bold text-rose-dark underline">{site.phoneDisplay}</a>{" "}
          تماس بگیرید.
        </p>
      )}
      <p className="text-center text-[13px] text-muted">پاسخ‌گویی در ساعات کاری: {site.hours}</p>
    </form>
  );
}