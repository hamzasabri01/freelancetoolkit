import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: siteConfig.category,
  icons: { icon: [{ url: siteConfig.icons.icon, type: "image/svg+xml" }], shortcut: siteConfig.icons.icon },
  openGraph: { siteName: siteConfig.name, type: "website", locale: siteConfig.locale },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">Skip to main content</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><CookieConsent /></body></html>;
}
