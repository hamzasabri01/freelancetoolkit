import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { tools } from "@/data/tools";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tools", "/guides", "/guides/freelance-pricing", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...tools.map((tool) => ({ url: `${siteConfig.url}/tools/${tool.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 })),
    ...guides.map((guide) => ({ url: `${siteConfig.url}/guides/${guide.slug}`, lastModified: new Date(guide.publishedAt), changeFrequency: "monthly" as const, priority: .75 })),
  ];
}
