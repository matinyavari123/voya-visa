"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { steps } from "@/data/content";
import { apiFetch, type ApiRequest } from "@/lib/api";

type State = "loading" | "ready" | "unauth" | "error";

const toFa = (n: number) => n.toLocaleString("fa-IR");

const tones: Record<ApiRequest["status"], string> = {
  // رنگ و روشنایی هر دو فرق دارند، تا فقط با رنگ از هم جدا نشوند
  submitted: "bg-white/10 text-snow ring-1 ring-white/25",
  documents: "bg-sage text-deep",
  appointment: "bg-sage text-deep",
  issued: "bg-[#1FA855] text-white",
  rejected: "bg-rose text-white",
};

function faDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function RequestCard({ request }: { request: ApiRequest }) {
  const failed = request.status === "rejected";
  const title = [request.service_title, request.country_name].filter(Boolean).join(" ");

  return (
    <article className="flex flex-col gap-5 rounded-[22px] border border-sage/15 bg-moss p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-extrabold">{title || "درخواست مشاوره"}</h3>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-fog">
            <span>
              شماره پیگیری:{" "}
              <span dir="ltr" className="inline-block font-bold text-snow/85">
                {request.code}
              </span>
            </span>
            <span>ثبت: {faDate(request.created_at)}</span>
          </p>
        </div>
        <span className={`rounded-full px-4 py-1.5 text-[13px] font-bold ${tones[request.status]}`}>
          {request.status_label}
        </span>
      </div>

      <div>
        <ol className="flex gap-2">
          {steps.map((step, i) => {
            const reached = !failed && i < request.step;
            return (
              <li key={step.title} className="flex-1">
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full ${failed ? "bg-rose/40" : reached ? "bg-sage" : "bg-white/12"}`}
                />
                <span className={`mt-2 block text-[11px] leading-tight ${reached ? "text-snow/85" : "text-fog/70"}`}>
                  {step.title}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="sr-only">
          قدم {toFa(request.step)} از {toFa(steps.length)}
        </p>
      </div>

      {request.agent_note && <p className="text-[15px] text-mist">{request.agent_note}</p>}

      {request.message && (
        <p className="rounded-[16px] border border-white/10 bg-ink/40 p-4 text-sm whitespace-pre-line text-fog">
          {request.message}
        </p>
      )}

      {request.country && (
        <div className="border-t border-white/10 pt-4">
          <Link href={`/countries/${request.country}`} className="btn btn-ghost min-h-11 px-5 text-sm">
            شرایط ویزای {request.country_name}
          </Link>
        </div>
      )}
    </article>
  );
}

export default function RequestsPanel() {
  const [state, setState] = useState<State>("loading");
  const [items, setItems] = useState<ApiRequest[]>([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await apiFetch("/requests/");
        if (!alive) return;
        if (res.status === 401) {
          setState("unauth");
          return;
        }
        if (!res.ok) {
          setState("error");
          return;
        }
        const data = await res.json();
        // اگر صفحه‌بندی روشن شود، نتیجه داخل results می‌آید
        setItems(Array.isArray(data) ? data : (data.results ?? []));
        setState("ready");
      } catch {
        if (alive) setState("error");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="flex flex-col gap-5" aria-busy="true">
        {[0, 1].map((i) => (
          <div key={i} className="h-44 animate-pulse rounded-[22px] border border-sage/15 bg-moss" />
        ))}
      </div>
    );
  }

  if (state === "unauth") {
    return (
      <Box
        title="برای دیدن پرونده‌ها وارد شوید"
        text="این صفحه فقط برای کاربران واردشده است."
        action={{ href: "/login", label: "ورود به حساب" }}
      />
    );
  }

  if (state === "error") {
    return (
      <Box
        title="اطلاعات بارگذاری نشد"
        text="ارتباط با سرور برقرار نشد. چند لحظه بعد دوباره امتحان کنید."
        action={{ href: "/contact", label: "تماس با ما" }}
      />
    );
  }

  if (items.length === 0) {
    return (
      <Box
        title="هنوز درخواستی ثبت نکرده‌اید"
        text="اولین درخواست مشاوره‌تون رو ثبت کنید تا کارشناسان ما شرایطتون رو بررسی کنن."
        action={{ href: "/contact", label: "درخواست مشاوره" }}
      />
    );
  }

  const open = items.filter((r) => r.status !== "issued" && r.status !== "rejected").length;
  const done = items.filter((r) => r.status === "issued").length;

  return (
    <div className="flex flex-col gap-8">
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {[
          { label: "همه‌ی درخواست‌ها", value: items.length, icon: "doc" as const },
          { label: "در جریان", value: open, icon: "clock" as const },
          { label: "ویزای صادرشده", value: done, icon: "shield" as const },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-4 rounded-[20px] border border-sage/15 bg-moss p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-ink text-sage">
              <Icon name={t.icon} size={22} />
            </span>
            <span className="flex flex-col">
              <dt className="text-[13px] text-fog">{t.label}</dt>
              <dd className="text-2xl font-extrabold">{toFa(t.value)}</dd>
            </span>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-5">
        {items.map((r) => (
          <RequestCard key={r.id} request={r} />
        ))}
      </div>
    </div>
  );
}

function Box({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[22px] border border-sage/15 bg-moss px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-sage">
        <Icon name="doc" size={26} />
      </span>
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="max-w-sm text-mist">{text}</p>
      <Link href={action.href} className="btn btn-primary mt-1">
        {action.label}
      </Link>
    </div>
  );
}
