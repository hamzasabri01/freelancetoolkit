import Link from "next/link";
import { ArrowRight, BarChart3, LockKeyhole, Zap } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ToolGrid } from "@/components/ToolGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { ContentCallout } from "@/components/ContentCallout";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GuideVisualCard } from "@/components/GuideVisualCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { categories, tools } from "@/data/tools";
import { guides } from "@/data/guides";
import { homepageSteps } from "@/lib/contentEnhancements";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata(siteConfig.name, "Free calculators that help freelancers set rates, price projects, compare income, and understand business costs.", "/");
const featuredToolSlugs = [
  "freelance-hourly-rate-calculator",
  "salary-to-hourly-calculator",
  "billable-hours-calculator",
  "project-pricing-calculator",
  "contractor-vs-employee-calculator",
  "invoice-generator",
] as const;
const featuredTools = featuredToolSlugs.map((slug) => tools.find((tool) => tool.slug === slug)).filter((tool): tool is (typeof tools)[number] => Boolean(tool));
export const homeFaqs = [
  { question: "Are all Freelance Work Tools calculators free?", answer: "Yes. Every calculator is free to use and requires no account." },
  { question: "Do the tools save my financial information?", answer: "No. Calculations run locally in your browser. The current site has no account or backend database." },
  { question: "Can I use the results in a client proposal?", answer: "You can use them as planning inputs, but review the assumptions and adapt the result to your project, market, taxes, and agreement." },
];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.icons.icon}`,
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const schemas = [organizationSchema, websiteSchema, faqSchema];
  return <>
    {schemas.map((schema, index) => (
      <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    ))}
    <HeroSection />
    <section className="section-wrap py-14 sm:py-20"><div className="mb-8 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker">Featured calculators</p><h2 className="section-title">Make the next number easier</h2><p className="section-copy">Built for real decisions, from setting your baseline rate to protecting project margins.</p></div><Link href="/tools" className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg px-1 text-sm font-bold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:self-auto">View all tools <ArrowRight size={15} aria-hidden="true" /></Link></div><ToolGrid items={featuredTools} /></section>
    <section className="bg-surface-soft py-16 sm:py-20"><div className="section-wrap"><div className="mb-8"><p className="section-kicker">Browse by focus</p><h2 className="section-title">Find the right starting point</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{categories.map((category) => <CategoryCard key={category.name} {...category} count={tools.filter((tool) => tool.category === category.name).length} />)}</div></div></section>
    <section className="section-wrap py-16 sm:py-20">
      <div className="mb-8 max-w-2xl">
        <p className="section-kicker">How Freelance Work Tools works</p>
        <h2 className="section-title">A calmer workflow for business numbers</h2>
        <p className="section-copy">The site keeps the calculator first, then adds context so you can understand the assumptions instead of blindly copying an output.</p>
      </div>
      <ProcessSteps steps={homepageSteps} />
    </section>
    <section className="section-wrap py-16 sm:py-20"><div className="rounded-3xl bg-ink p-7 text-white sm:p-10"><div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-blue-400">Designed for clarity</p><h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">Useful answers, without the spreadsheet archaeology.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/55">Every tool exposes its assumptions, updates instantly, and gives you a practical estimate you can reason about.</p></div><div className="grid gap-3 sm:grid-cols-3">{[[Zap, "Fast", "Instant browser-side results"], [LockKeyhole, "Private", "No account or server storage"], [BarChart3, "Clear", "Visible inputs and breakdowns"]].map(([Icon, title, copy]) => { const FeatureIcon = Icon as typeof Zap; return <div key={title as string} className="rounded-xl border border-white/10 bg-white/[.04] p-4"><FeatureIcon size={18} className="text-blue-400" /><h3 className="mt-3 text-sm font-bold">{title as string}</h3><p className="mt-1 text-xs leading-5 text-white/45">{copy as string}</p></div>; })}</div></div></div></section>
    <section className="border-y border-slate-200 bg-surface-soft py-14 sm:py-20"><div className="section-wrap"><div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker">Popular guides</p><h2 className="section-title">Understand the number behind the number</h2></div><Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-brand">All guides <ArrowRight size={15} aria-hidden="true" /></Link></div><div className="grid gap-5 md:grid-cols-3">{guides.slice(0, 3).map((guide) => <GuideVisualCard key={guide.slug} guide={guide} />)}</div></div></section>
    <section className="section-wrap py-16 sm:py-20">
      <div className="grid gap-5 lg:grid-cols-3">
        <ContentCallout title="Calculator methodology">
          Every calculator keeps formulas simple, transparent, and reusable. The result is a planning estimate with visible assumptions, not a financial guarantee.
        </ContentCallout>
        <ContentCallout title="Supported countries and currencies">
          Money tools support USD, GBP, EUR, CAD, and AUD, with country labels for the United States, United Kingdom, Canada, Australia, and several European markets.
        </ContentCallout>
        <ContentCallout title="API-powered estimates">
          Exchange-rate references use Frankfurter public market data, and holiday-aware capacity tools use Nager.Date public holiday data with internal fallbacks.
        </ContentCallout>
      </div>
    </section>
    <section className="section-wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[.7fr_1.3fr]"><div><p className="section-kicker">FAQ</p><h2 className="section-title">Straight answers</h2><p className="section-copy">The tools are intentionally simple, transparent, and easy to revisit.</p></div><FAQAccordion items={homeFaqs} /></section>
  </>;
}
