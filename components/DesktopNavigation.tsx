"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/data/navigation";

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNavigation() {
  const pathname = usePathname();

  return <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
    {primaryNavigation.map((link) => {
      const active = isCurrentRoute(pathname, link.href);
      return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "bg-brand-soft text-brand" : ""}`}>{link.label}</Link>;
    })}
    <Link href="/tools/freelance-hourly-rate-calculator" className="ml-3 inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0">Try a calculator <ArrowRight size={14} aria-hidden="true" /></Link>
  </nav>;
}
