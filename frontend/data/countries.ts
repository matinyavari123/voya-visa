export type Country = {
  slug: string;
  name: string;
  nameEn: string;
  visaTypes: string[];
  summary: string;
  /** نرخ پذیرش به درصد — TODO: اعداد واقعی رو از مشتری بگیر */
  successRate?: number;
  /** کشورهای پرطرفدار که در صفحه‌ی اصلی نشون داده می‌شن */
  featured?: boolean;
  image?: string; // مسیر عکس داخل public، مثلاً /images/countries/france.jpg
};

// TODO: نوع ویزاها و توضیح هر کشور رو از مشتری بگیر.
// TODO: نرخ پذیرش (successRate) هر کشور رو با عدد واقعی پر کن.
const t = (...types: string[]) => types;

export const countries: Country[] = [
  { slug: "uk", name: "انگلیس", nameEn: "United Kingdom", visaTypes: t("توریستی", "تحصیلی", "کاری"), image: "/images/countries/uk.jpg", summary: "[توضیح کوتاه درباره‌ی ویزای انگلیس]", featured: true },
  { slug: "germany", name: "آلمان", nameEn: "Germany", visaTypes: t("توریستی", "تحصیلی", "کاری"), image: "/images/countries/germany.jpg", summary: "[توضیح کوتاه درباره‌ی ویزای آلمان]", featured: true },
  { slug: "france", name: "فرانسه", nameEn: "France", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/france.jpg", summary: "[توضیح کوتاه درباره‌ی ویزای فرانسه]", featured: true },
  { slug: "italy", name: "ایتالیا", nameEn: "Italy", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/italy.jpg", summary: "[توضیح کوتاه درباره‌ی ویزای ایتالیا]", featured: true },
  { slug: "spain", name: "اسپانیا", nameEn: "Spain", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/spain.jpg", summary: "[توضیح کوتاه درباره‌ی ویزای اسپانیا]", featured: true },
  { slug: "usa", name: "آمریکا", nameEn: "United States", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/usa.jpg", summary: "[توضیح کوتاه درباره‌ی ویزای آمریکا]", featured: true },

  { slug: "netherlands", name: "هلند", nameEn: "Netherlands", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/netherlands.jpg", summary: "[توضیح کوتاه]" },
  { slug: "belgium", name: "بلژیک", nameEn: "Belgium", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/belgium.jpg", summary: "[توضیح کوتاه]" },
  { slug: "switzerland", name: "سوئیس", nameEn: "Switzerland", visaTypes: t("توریستی"), image: "/images/countries/switzerland.jpg", summary: "[توضیح کوتاه]" },
  { slug: "ireland", name: "ایرلند", nameEn: "Ireland", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/ireland.jpg", summary: "[توضیح کوتاه]" },
  { slug: "poland", name: "لهستان", nameEn: "Poland", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/poland.jpg", summary: "[توضیح کوتاه]" },
  { slug: "czechia", name: "چک", nameEn: "Czechia", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/czechia.jpg", summary: "[توضیح کوتاه]" },
  { slug: "sweden", name: "سوئد", nameEn: "Sweden", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/sweden.jpg", summary: "[توضیح کوتاه]" },
  { slug: "norway", name: "نروژ", nameEn: "Norway", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/norway.jpg", summary: "[توضیح کوتاه]" },
  { slug: "denmark", name: "دانمارک", nameEn: "Denmark", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/denmark.jpg", summary: "[توضیح کوتاه]" },
  { slug: "finland", name: "فنلاند", nameEn: "Finland", visaTypes: t("توریستی", "تحصیلی"), summary: "[توضیح کوتاه]" },
  { slug: "russia", name: "روسیه", nameEn: "Russia", visaTypes: t("توریستی", "کاری"), image: "/images/countries/russia.jpg", summary: "[توضیح کوتاه]" },

  { slug: "australia", name: "استرالیا", nameEn: "Australia", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/australia.jpg", summary: "[توضیح کوتاه]" },
  { slug: "new-zealand", name: "نیوزیلند", nameEn: "New Zealand", visaTypes: t("توریستی", "تحصیلی"), image: "/images/countries/new-zealand.jpg", summary: "[توضیح کوتاه]" },

  { slug: "uae", name: "امارات", nameEn: "United Arab Emirates", visaTypes: t("توریستی"), image: "/images/countries/uae.jpg", summary: "[توضیح کوتاه]" },
  { slug: "kuwait", name: "کویت", nameEn: "Kuwait", visaTypes: t("توریستی", "کاری"), summary: "[توضیح کوتاه]" },
  { slug: "india", name: "هند", nameEn: "India", visaTypes: t("توریستی"), image: "/images/countries/india.jpg", summary: "[توضیح کوتاه]" },
  { slug: "singapore", name: "سنگاپور", nameEn: "Singapore", visaTypes: t("توریستی"), image: "/images/countries/singapore.jpg", summary: "[توضیح کوتاه]" },
  { slug: "taiwan", name: "تایوان", nameEn: "Taiwan", visaTypes: t("توریستی"), image: "/images/countries/taiwan.jpg", summary: "[توضیح کوتاه]" },
  { slug: "vietnam", name: "ویتنام", nameEn: "Vietnam", visaTypes: t("توریستی"), image: "/images/countries/vietnam.jpg", summary: "[توضیح کوتاه]" },
];

export const featuredCountries = countries.filter((c) => c.featured);

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
