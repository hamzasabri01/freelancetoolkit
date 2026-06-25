import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";

const columns = [
  { title: "Calculators", links: [["Hourly rate", "/tools/freelance-hourly-rate-calculator"], ["Project pricing", "/tools/project-pricing-calculator"], ["Invoice generator", "/tools/invoice-generator"], ["All tools", "/tools"]] },
  { title: "Categories", links: [["Income", "/tools?category=Income"], ["Pricing", "/tools?category=Pricing"], ["Business", "/tools?category=Business"], ["Remote Work", "/tools?category=Remote%20Work"], ["SaaS", "/tools?category=SaaS"]] },
  { title: "Company", links: [["About", "/about"], ["Guides", "/guides"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Privacy", "/privacy-policy"], ["Terms", "/terms"], ["Disclaimer", "/disclaimer"]] },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink px-4 pb-8 pt-12 text-white/65 sm:px-6 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-x-8 gap-y-10 border-b border-white/10 pb-10 sm:grid-cols-2 sm:pb-12 lg:grid-cols-3 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo inverse />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Clear calculators and guides that help independent professionals make better business decisions.</p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title.toLowerCase()}`}>
              <h2 id={`footer-${column.title.toLowerCase()}`} className="mb-4 text-xs font-bold uppercase tracking-widest text-white">{column.title}</h2>
              <ul className="space-y-2.5">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="rounded-sm text-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-4 pt-6 text-xs sm:pt-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p>Copyright {new Date().getFullYear()} Freelance Work Tools. All rights reserved.</p>
            <p className="mt-1 max-w-2xl leading-5 text-white/50">Calculators provide estimates for educational and planning purposes, not financial, tax, or legal advice.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacy-policy" className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">Your privacy matters</Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
