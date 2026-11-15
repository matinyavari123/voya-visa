import { NextResponse } from "next/server";
import { getService } from "@/data/services";
import { normalizeDigits, isValidMobile } from "@/lib/validate";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // honeypot: ربات‌ها این فیلد مخفی رو پر می‌کنن
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clip(body.name, 100);
  const phone = normalizeDigits(clip(body.phone, 20)).replace(/\s|-/g, "");
  const service = getService(clip(body.service, 30))?.title ?? "نامشخص";
  const country = clip(body.country, 60);
  const message = clip(body.message, 1000);

  if (!name || !isValidMobile(phone)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const text = [
    "📩 <b>درخواست مشاوره‌ی جدید – ویا ویزا</b>",
    `👤 نام: ${esc(name)}`,
    `📞 موبایل: ${esc(phone)}`,
    `🛂 نوع: ${esc(service)}`,
    country && `🌍 مقصد: ${esc(country)}`,
    message && `📝 توضیحات: ${esc(message)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // در محیط توسعه بدون تنظیمات تلگرام فقط لاگ می‌کنیم
    console.info("[consult] Telegram not configured:\n" + text);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    if (!res.ok) throw new Error(`telegram ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[consult] send failed", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
