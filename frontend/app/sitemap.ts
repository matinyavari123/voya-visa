import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { countries } from "@/data/countries";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/countries",
    "/tours",
    "/about",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
    ...countries.map((c) => `/countries/${c.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
