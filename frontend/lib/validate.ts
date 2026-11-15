/** تبدیل ارقام فارسی و عربی به انگلیسی */
export function normalizeDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** موبایل ایران: 09xxxxxxxxx یا +989xxxxxxxxx */
export function isValidMobile(phone: string): boolean {
  return /^(?:\+98|0098|0)?9\d{9}$/.test(phone);
}
