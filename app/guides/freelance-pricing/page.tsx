import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideVisualCard } from "@/components/GuideVisualCard";
import { ToolCard } from "@/components/ToolCard";
import { guides } from "@/data/guides";
import { tools } from "@/data/tools";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata(
  "Freelance Pricing Guide",
  "Learn how to calculate freelance rates, billable hours, project pricing, taxes, expenses, and payment terms with free tools and practical guides.",
  "/guides/freelance-pricing",
);

const pricingToolSlugs = [
  "freelance-hourly-rate-calculator",
  "project-pricing-calculator",
  "billable-hours-calculator",
  "salary-to-hourly-calculator",
  "invoice-generator",
] as const;

const pricingGuideSlugs = [
  "how-much-should-i-charge-as-a-freelancer",
  "how-to-calculate-your-freelance-hourly-rate",
  "freelance-hourly-rate-with-taxes-and-expenses",
  "how-many-billable-hours-should-a-freelancer-work",
  "billable-hours-vs-non-billable-hours",
  "hourly-rate-vs-project-pricing",
  "how-to-price-a-freelance-project",
  "how-to-create-a-professional-invoice",
] as const;

const topics = [
  {
    title: "Hourly rate",
    copy: "Start with the revenue your business needs, then divide it by realistic billable hours instead of total working hours.",
    href: "/guides/how-to-calculate-your-freelance-hourly-rate",
  },
  {
    title: "Project pricing",
    copy: "Turn a baseline rate into a fixed quote by adding scope, direct costs, risk, margin, revision limits, and payment terms.",
    href: "/guides/how-to-price-a-freelance-project",
  },
  {
    title: "Billable hours",
    copy: "Estimate how much client-chargeable time you can realistically work after admin, sales, revisions, learning, and leave.",
    href: "/guides/how-many-billable-hours-should-a-freelancer-work",
  },
  {
    title: "Salary comparison",
    copy: "Use salary-to-hourly comparisons for context, then adjust for freelance expenses, unpaid time, risk, and benefits.",
    href: "/guides/salary-to-hourly-rate-explained",
  },
  {
    title: "Invoice and payment terms",
    copy: "Connect pricing to clear invoices, due dates, deposits, milestone payments, and professional follow-up.",
    href: "/guides/how-to-create-a-professional-invoice",
  },
];

export default function FreelancePricingHubPage() {
  const featuredTools = pricingToolSlugs.map((slug) => tools.find((tool) => tool.slug === slug)).filter((tool): tool is (typeof tools)[number] => Boolean(tool));
  const featuredGuides = pricingGuideSlugs.map((slug) => guides.find((guide) => guide.slug === slug)).filter((guide): guide is (typeof guides)[number] => Boolean(guide));
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Freelance Pricing Guide",
    description: "Learn how to calculate freelance rates, billable hours, project pricing, taxes, expenses, and payment terms with free tools and practical guides.",
    url: `${siteConfig.url}/guides/freelance-pricing`,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
      { "@type": "ListItem", position: 3, name: "Freelance Pricing Guide", item: `${siteConfig.url}/guides/freelance-pricing` },
    ],
  };

  return (
    <>
      {[collectionSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}

      <header className="border-b border-slate-200 bg-surface-soft py-12 sm:py-16">
        <div className="section-wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "Freelance Pricing Guide" }]} />
          <p className="section-kicker mt-8">Pricing hub</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">Freelance Pricing Guide</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-ink-muted">
            A central starting point for calculating rates, estimating billable hours, comparing salary context, pricing fixed projects, and turning pricing into clearer invoices.
          </p>
        </div>
      </header>

      <section className="section-wrap py-12 sm:py-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {topics.map((topic) => (
            <Link key={topic.href} href={topic.href} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              <h2 className="font-display text-lg font-bold text-ink">{topic.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{topic.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand">Read guide <ArrowRight size={13} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-blue-100 bg-brand-soft/60 p-6 sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="section-kicker">Spreadsheet asset</p>
              <h2 className="font-display text-xl font-bold text-ink">Need a spreadsheet version?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
                Download the free freelance rate calculator spreadsheet to organize income goals, expenses, billable hours, time off, tax planning, and project pricing assumptions.
              </p>
            </div>
            <Link href="/guides/free-freelance-rate-spreadsheet" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Download the free spreadsheet <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-7">
            <p className="section-kicker">Calculators</p>
            <h2 className="section-title">Tools for pricing decisions</h2>
            <p className="section-copy">Use these calculators to test the assumptions behind rates, project quotes, capacity, salary comparisons, and invoice totals.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featuredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
        </section>

        <section className="mt-14">
          <div className="mb-7">
            <p className="section-kicker">Guides</p>
            <h2 className="section-title">Pricing topics to read next</h2>
            <p className="section-copy">These guides explain the context behind the calculators so you can avoid underpricing, vague scope, and unrealistic billable-hour assumptions.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{featuredGuides.map((guide) => <GuideVisualCard key={guide.slug} guide={guide} />)}</div>
        </section>
      </section>
    </>
  );
}
