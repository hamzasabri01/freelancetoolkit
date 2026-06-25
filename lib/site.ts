import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.freelanceworktools.com");

export const siteConfig = {
  name: "Freelance Work Tools",
  defaultTitle: "Freelance Work Tools | Free Calculators for Freelancers",
  description: "Free calculators and practical guides for freelancers, consultants, and remote professionals. Estimate hourly rates, project prices, billable hours, invoices, and real income.",
  url: siteUrl.replace(/\/$/, ""),
  locale: "en_US",
  category: "business",
  images: {
    default: "/og-image.svg",
    guides: "/og-guides.svg",
    tools: "/og-tools.svg",
  },
  icons: {
    icon: "/logo-mark.svg",
  },
} as const;

export function createMetadata(title: string, description: string, path = ""): Metadata {
  const pageTitle = title === siteConfig.name || title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;
  const imagePath = path.startsWith("/guides") ? siteConfig.images.guides : path.startsWith("/tools") ? siteConfig.images.tools : siteConfig.images.default;
  const socialImage = {
    url: new URL(imagePath, siteConfig.url).toString(),
    width: 1200,
    height: 630,
    alt: "Freelance Work Tools - clear calculators and guides for independent work",
  };

  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [socialImage],
    },
  };
}
