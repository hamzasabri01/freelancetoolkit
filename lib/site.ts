import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.freelanceworktools.com");

export const siteConfig = {
  name: "FreelanceToolKit",
  description: "Free, practical calculators for freelancers, contractors, and independent professionals.",
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
  const pageTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;
  const imagePath = path.startsWith("/guides") ? siteConfig.images.guides : path.startsWith("/tools") ? siteConfig.images.tools : siteConfig.images.default;
  const socialImage = {
    url: imagePath,
    width: 1200,
    height: 630,
    alt: "FreelanceToolKit - clear calculators and guides for independent work",
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
