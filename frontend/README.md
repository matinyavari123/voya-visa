# ویا ویزا (Voya Visa) — فرانت‌اند

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · راست‌چین با فونت وزیرمتن

## اجرا

```bash
npm install
cp .env.example .env.local   # مقادیر رو پر کن
npm run dev                  # http://localhost:3000
npm run build && npm start   # نسخه‌ی production
```

نیاز به Node نسخه‌ی ۲۰ یا بالاتر.

## ساختار

```
app/
  page.tsx                  صفحه اصلی
  services/[slug]/          ویزای توریستی، تحصیلی، کاری، تورها
  countries/ , [slug]/      لیست ۲۵ کشور و صفحه‌ی هر کشور
  tours/  about/  contact/  (contact?service=work نوع درخواست رو از قبل انتخاب می‌کنه)
  login/  register/         ورود و ثبت‌نام
  panel/                    «مشاوره‌های من» و بخش درخواست‌ها
  api/consult/route.ts      دریافت فرم مشاوره و ارسال به تلگرام
  layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx
components/
  Header · Footer · Logo · Icon · CountryFlag (پرچم‌ها به‌صورت SVG)
  sections.tsx              بخش‌های صفحه اصلی، قابل استفاده در بقیه‌ی صفحه‌ها
  ui.tsx                    کارت‌ها، عنوان بخش، Slider، دکمه‌ی شناور واتساپ
  ConsultForm.tsx           فرم مشاوره
  login/                    AuthShell · LoginForm · RegisterForm
  panel/RequestCard.tsx     کارت هر درخواست
data/                       همه‌ی محتوا این‌جاست (بعداً به API/DRF وصل می‌شه)
lib/validate.ts             اعتبارسنجی موبایل + تبدیل ارقام فارسی
public/
  three.min.js  globe.js    کره‌ی سه‌بعدی هیرو
  slider.js                 اسلایدر بخش خدمات و مسیر کار
  images/                   عکس کشورها، پرچم‌ها، نقشه‌ی کره
scripts/make-map.mjs        ساخت دوباره‌ی نقشه‌ی کره (معمولاً لازم نیست)
```

## کره‌ی سه‌بعدی

`public/globe.js` با Three.js کره رو می‌سازد: نقشه‌ی جهان روی سطح، نوار «VOYA VISA»
دور آن، و پرچم ۱۲ کشور روی مختصات واقعی. اگر WebGL نباشد، عکس `images/hero.jpg`
سر جایش می‌ماند. سرعت چرخش با `spin` و نمای اولیه با `group.rotation.y` تنظیم می‌شود.

Three.js عمداً از CDN گرفته نمی‌شود و داخل `public/` است، تا از ایران هم بالا بیاید.

## اسلایدر

`public/slider.js` هر چیزی را که `data-slider` داشته باشد اسلایدر می‌کند: دکمه‌های
قبلی/بعدی، نقطه‌ها، کشیدن با موس، کلید جهت‌دار و جلوه‌ی سه‌بعدی هنگام اسکرول.
کامپوننت `Slider` در `components/ui.tsx` مارک‌آپش را می‌سازد. بدون جاوااسکریپت هم
ریل با کشیدن کار می‌کند، و با `prefers-reduced-motion` همه‌ی انیمیشن‌ها خاموش می‌شود.

## فرم مشاوره

- اعتبارسنجی سمت کلاینت و سرور، با پشتیبانی از ارقام فارسی، و یه honeypot ضد اسپم.
- اگر `TELEGRAM_BOT_TOKEN` و `TELEGRAM_CHAT_ID` تنظیم باشد پیام به تلگرام می‌رود،
  وگرنه فقط در کنسول سرور لاگ می‌شود.
- اگر سرور داخل ایران باشد ممکن است `api.telegram.org` بسته باشد. در آن صورت یا
  هاست خارج بگیر یا در `route.ts` به‌جایش ایمیل / پیامک (مثلاً کاوه‌نگار) بگذار.

## ورود، ثبت‌نام و پنل

صفحه‌ها و فرم‌ها آماده‌اند ولی هنوز به بک‌اند وصل نیستند؛ جای اتصال با `TODO` در
`components/login/LoginForm.tsx` و `RegisterForm.tsx` مشخص است (مثلاً
`POST /api/token/` با simplejwt). درخواست‌های صفحه‌ی پنل از `data/requests.ts`
می‌آیند و نمونه‌اند؛ بعد از اتصال، آن فایل و یادداشت بالای لیست حذف می‌شوند و
پنل فقط بعد از ورود باز می‌شود.

## کارهای باقی‌مانده (TODO)

جاهایی که محتوا باید از مشتری گرفته شود با `TODO` یا متن داخل `[...]` مشخص شده‌اند:

- فایل لوگو ← `components/Logo.tsx`
- متن خدمات، مدارک و زمان‌ها ← `data/services.ts`
- توضیح و نوع ویزای هر کشور، و نرخ پذیرش ← `data/countries.ts`
- تورها و جواب سؤالات متداول ← `data/content.ts`
- آیدی تلگرام/اینستاگرام و ساعت کاری ← `data/site.ts`
- نقشه‌ی دفتر ← `ContactSection` در `components/sections.tsx`
- متن صفحه‌ی «درباره ما»
- عکس فنلاند و کویت (بقیه‌ی ۲۳ کشور عکس دارند؛ این دو فعلاً پرچم نشان می‌دهند)

عکس‌های کشورها از Unsplash‌اند؛ لایسنسشان برای استفاده‌ی تجاری آزاد است و ذکر
منبع لازم ندارد.
