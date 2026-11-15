import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import "@fontsource/playfair-display/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/ui";
import { site } from "@/data/site";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | اخذ ویزای توریستی، تحصیلی و کاری`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b1f19",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  alternateName: site.nameEn,
  url: site.url,
  telephone: "+98" + site.phone.slice(1),
  address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "تهران", addressCountry: "IR" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-lg focus:bg-cream focus:px-4 focus:py-2 focus:text-deep">
          رفتن به محتوا
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Script src="/three.min.js" strategy="afterInteractive" />
        <Script src="/globe.js" strategy="afterInteractive" />
        <Script src="/slider.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
