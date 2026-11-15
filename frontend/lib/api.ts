export const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type ApiRequest = {
  id: number;
  code: string;
  full_name: string;
  phone: string;
  service: string | null;
  service_title: string | null;
  country: string | null;
  country_name: string | null;
  message: string;
  status: "submitted" | "documents" | "appointment" | "issued" | "rejected";
  status_label: string;
  step: number;
  agent_note: string;
  created_at: string;
};

export function getToken(key: "access" | "refresh"): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function saveTokens(access: string, refresh?: string) {
  try {
    localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
  } catch {
    // مرورگر خصوصی: ذخیره نمی‌شود
  }
}

export function clearTokens() {
  try {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  } catch {
    // چیزی برای پاک کردن نبود
  }
}

/**
 * مثل fetch، ولی توکن را خودش می‌چسباند و اگر منقضی شده بود
 * یک بار با refresh تازه‌اش می‌کند و درخواست را دوباره می‌فرستد.
 */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const run = (token: string | null) =>
    fetch(`${API}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers as Record<string, string> | undefined),
        ...(token ? { Authorization: `JWT ${token}` } : {}),
      },
    });

  const res = await run(getToken("access"));
  if (res.status !== 401) return res;

  const refresh = getToken("refresh");
  if (!refresh) return res;

  const renewed = await fetch(`${API}/auth/jwt/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!renewed.ok) {
    clearTokens();
    return res;
  }

  const { access } = await renewed.json();
  saveTokens(access);
  return run(access);
}
