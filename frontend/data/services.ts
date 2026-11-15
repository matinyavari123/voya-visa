import type { IconName } from "@/components/Icon";

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  short: string;
  intro: string;
  documents: string[];
  duration: string;
};

// TODO: متن‌ها، مدارک و زمان‌ها رو با اطلاعات واقعی مشتری جایگزین کن.
export const services: Service[] = [
  {
    slug: "tourist",
    title: "ویزای توریستی",
    icon: "passport",
    short: "[توضیح کوتاه: کشورها، مدت اعتبار و زمان تقریبی صدور]",
    intro:
      "برای سفرهای تفریحی و دیدار از خانواده، شرایطتون رو بررسی می‌کنیم و پرونده‌ای کامل و مرتب برای سفارت آماده می‌کنیم.",
    documents: ["[مدرک ۱]", "[مدرک ۲]", "[مدرک ۳]", "[مدرک ۴]"],
    duration: "[زمان تقریبی صدور]",
  },
  {
    slug: "student",
    title: "ویزای تحصیلی",
    icon: "graduation",
    short: "[توضیح کوتاه: پذیرش، مدارک تحصیلی و تمکن مالی]",
    intro:
      "از انتخاب مسیر و آماده‌سازی مدارک تحصیلی تا ثبت درخواست ویزا، قدم‌به‌قدم کنارتون هستیم.",
    documents: ["[مدرک ۱]", "[مدرک ۲]", "[مدرک ۳]", "[مدرک ۴]"],
    duration: "[زمان تقریبی صدور]",
  },
  {
    slug: "joboffer",
    title: "ویزای کاری",
    icon: "briefcase",
    short: "[توضیح کوتاه: قرارداد کاری، شرایط و مراحل]",
    intro:
      "اگه پیشنهاد یا قرارداد کاری دارید، شرایط پرونده رو بررسی می‌کنیم و مسیر درخواست ویزای کاری رو براتون هموار می‌کنیم.",
    documents: ["[مدرک ۱]", "[مدرک ۲]", "[مدرک ۳]", "[مدرک ۴]"],
    duration: "[زمان تقریبی صدور]",
  },
  {
    slug: "tours",
    title: "تورهای خارجی",
    icon: "plane",
    short: "[توضیح کوتاه: تورهای اروپایی با ویزا، پرواز و هتل]",
    intro:
      "تورهای خارجی با خدمات کامل: ویزا، بلیت، هتل و برنامه‌ی سفر، همه در یک‌جا.",
    documents: ["[مدرک ۱]", "[مدرک ۲]", "[مدرک ۳]"],
    duration: "[زمان لازم برای ثبت‌نام قبل از حرکت]",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
