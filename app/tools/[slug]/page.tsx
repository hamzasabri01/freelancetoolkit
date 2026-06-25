import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CommonMistakes } from "@/components/CommonMistakes";
import { ContentCallout } from "@/components/ContentCallout";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FormulaCard } from "@/components/FormulaCard";
import { GuideVisualCard } from "@/components/GuideVisualCard";
import { RelatedTools } from "@/components/RelatedTools";
import { guides } from "@/data/guides";
import { getTool, tools } from "@/data/tools";
import { getExchangeRates } from "@/lib/api/exchangeRates";
import { getHolidayData } from "@/lib/api/publicHolidays";
import { toolEnhancements } from "@/lib/contentEnhancements";
import { createMetadata, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
const spreadsheetAssetToolSlugs = new Set(["freelance-hourly-rate-calculator", "billable-hours-calculator"]);

export function generateStaticParams() { return tools.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  return tool ? createMetadata(tool.title, tool.metaDescription, `/tools/${slug}`) : {};
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const enhancement = toolEnhancements[tool.slug];
  const relatedGuides = enhancement.relatedGuideSlugs.map((guideSlug) => guides.find((guide) => guide.slug === guideSlug)).filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));

  const currentYear = new Date().getFullYear();
  const [exchangeRates, holidayData] = await Promise.all([
    tool.usesCurrency ? getExchangeRates() : Promise.resolve(undefined),
    tool.usesPublicHolidays ? getHolidayData([currentYear, currentYear + 1]) : Promise.resolve(undefined),
  ]);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: tool.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
    { "@type": "ListItem", position: 3, name: tool.title, item: `${siteConfig.url}/tools/${tool.slug}` },
  ] };
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.metaDescription,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    inLanguage: "en",
    mainEntityOfPage: `${siteConfig.url}/tools/${tool.slug}`,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const schemas = [softwareApplicationSchema, breadcrumbSchema, faqSchema];
  const useSteps = [
    { number: "01", title: "Enter your figures", copy: "Use realistic values from your own work and records." },
    { number: "02", title: "Review the estimate", copy: "Read the supporting breakdown, not only the headline." },
    { number: "03", title: "Adjust your assumptions", copy: "Test a conservative and an optimistic scenario." },
  ];
  const showSpreadsheetAsset = spreadsheetAssetToolSlugs.has(tool.slug);

  return <>
    {schemas.map((schema, index) => (
      <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    ))}
    <div className="bg-surface-soft py-6 sm:py-10 lg:py-12"><div className="section-wrap"><CalculatorLayout tool={tool} exchangeRates={exchangeRates} holidayData={holidayData} /></div></div>
    <section className="section-wrap py-12 sm:py-16 lg:py-20">
      <article>
        <p className="section-kicker">How to use it</p><h2 className="section-title">A useful estimate starts with honest inputs</h2><p className="section-copy">{tool.intro}</p>
        <div className="mt-7 grid items-stretch gap-4 md:grid-cols-3">{useSteps.map((step) => <div key={step.number} className="flex min-h-[178px] flex-col rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-blue-200 hover:shadow-card"><span className="font-display text-3xl font-bold tabular-nums text-blue-100" aria-hidden="true">{step.number}</span><h3 className="mt-3 text-sm font-bold text-ink">{step.title}</h3><p className="mt-2 text-xs leading-5 text-ink-muted">{step.copy}</p></div>)}</div>
      </article>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"><p className="section-kicker">Methodology</p><h2 className="font-display text-xl font-bold text-ink">How the calculation works</h2><p className="mt-3 text-sm leading-7 text-ink-muted">{tool.methodology}</p></section>
        <section className="rounded-2xl border border-blue-100 bg-brand-soft/50 p-6 sm:p-7"><p className="section-kicker">Practical example</p><h2 className="font-display text-xl font-bold text-ink">Putting the estimate in context</h2><p className="mt-3 text-sm leading-7 text-ink-muted">{tool.example}</p></section>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.9fr]">
        <FormulaCard {...enhancement.formula} />
        <CommonMistakes items={enhancement.mistakes} />
      </div>

      {enhancement.dataNote && <div className="mt-5"><ContentCallout title="API data note">{enhancement.dataNote}</ContentCallout></div>}

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"><p className="section-kicker">Better inputs</p><h2 className="font-display text-xl font-bold text-ink">Tips for a more useful result</h2><ul className="mt-4 grid gap-3 md:grid-cols-3">{tool.tips.map((tip) => <li key={tip} className="rounded-xl bg-surface-soft p-4 text-sm leading-6 text-ink-soft">{tip}</li>)}</ul></section>

      {showSpreadsheetAsset && (
        <section className="mt-5 rounded-2xl border border-blue-100 bg-brand-soft/60 p-6 sm:p-7">
          <p className="section-kicker">Spreadsheet version</p>
          <h2 className="font-display text-xl font-bold text-ink">Need a spreadsheet version?</h2>
          <p className="mt-3 text-sm leading-7 text-ink-muted">Download the free freelance rate calculator spreadsheet to plan income, expenses, time off, billable hours, and project pricing assumptions offline.</p>
          <Link href="/guides/free-freelance-rate-spreadsheet" className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            Download the free spreadsheet
          </Link>
        </section>
      )}

      <section className="mt-14">
        <div className="mb-7"><p className="section-kicker">Learn the context</p><h2 className="section-title">Related guides</h2></div>
        <div className="grid gap-5 md:grid-cols-2">{relatedGuides.map((guide) => <GuideVisualCard key={guide.slug} guide={guide} />)}</div>
      </section>
      <div className="mt-14 grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-10"><div><p className="section-kicker">Common questions</p><h2 className="section-title">About this calculator</h2></div><FAQAccordion items={tool.faqs} /></div>
      <RelatedTools currentSlug={tool.slug} category={tool.category} />
      <div className="mt-10 sm:mt-12"><AdSlot position="bottom" /></div>
    </section>
  </>;
}
