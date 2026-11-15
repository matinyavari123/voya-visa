import type { Metadata } from "next";
import { ContactSection, FaqSection } from "@/components/sections";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "تماس و درخواست مشاوره",
  description: "برای مشاوره‌ی ویزا با ویا ویزا تماس بگیرید یا فرم درخواست مشاوره رو پر کنید.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const defaultService = service && getService(service) ? service : undefined;

  return (
    <>
      <ContactSection defaultService={defaultService} />
      <FaqSection />
    </>
  );
}
