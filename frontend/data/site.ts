export const site = {
  name: "ویا ویزا",
  nameEn: "Voya Visa",
  tagline: "مسیر سفرت هموارتره!",
  slogan: "Your Journey, Our Priority",
  description:
    "ویا ویزا؛ اخذ ویزای توریستی، تحصیلی و کاری و برگزاری تورهای خارجی. از مشاوره‌ی تخصصی و بررسی مدارک تا دریافت ویزا همراهتون هستیم.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://voyavisa.ir",
  phone: "09365231745",
  phoneDisplay: "0936 523 1745",
  whatsapp: "https://wa.me/989365231745",
  // TODO: آیدی تلگرام و اینستاگرام رو از مشتری بگیر
  telegram: "",
  instagram: "",
  address: "تهران، اقدسیه، خیابان موحد دانش",
  // TODO: ساعت کاری دفتر
  hours: "[ساعت کاری دفتر]",
};

export const nav = [
  { href: "/#services", label: "خدمات" },
  { href: "/countries", label: "کشورها" },
  { href: "/tours", label: "تورهای خارجی" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];
