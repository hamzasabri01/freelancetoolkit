import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArticleHeroVisual } from "@/components/ArticleHeroVisual";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommonMistakes } from "@/components/CommonMistakes";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ContentCallout } from "@/components/ContentCallout";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { ExampleScenario } from "@/components/ExampleScenario";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FormulaCard } from "@/components/FormulaCard";
import { GuideVisualCard } from "@/components/GuideVisualCard";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { ToolCard } from "@/components/ToolCard";
import { getGuide, guides } from "@/data/guides";
import { tools } from "@/data/tools";
import { createMetadata, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  return guide ? createMetadata(guide.metaTitle, guide.metaDescription, `/guides/${slug}`) : {};
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedTools = guide.relatedTools
    .map((toolSlug) => tools.find((tool) => tool.slug === toolSlug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  const relatedGuides = guide.relatedGuides
    .map((guideSlug) => guides.find((relatedGuide) => relatedGuide.slug === guideSlug))
    .filter((relatedGuide): relatedGuide is NonNullable<typeof relatedGuide> => Boolean(relatedGuide));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.lastUpdated,
    image: `${siteConfig.url}${guide.schemaImage}`,
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords],
    audience: guide.audience,
    inLanguage: "en",
    author: { "@type": "Organization", name: `${siteConfig.name} editorial`, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.icons.icon}` },
    },
    mainEntityOfPage: `${siteConfig.url}/guides/${guide.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${siteConfig.url}/guides/${guide.slug}` },
    ],
  };
  const faqSchema = guide.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;
  const schemas = [articleSchema, breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}

      <header className="border-b border-slate-200 bg-surface-soft py-12 sm:py-16">
        <div className="section-wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]} />
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div>
              <p className="section-kicker">{guide.category}</p>
              <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-ink-muted">{guide.excerpt}</p>
              <p className="mt-5 text-xs font-medium text-ink-muted">
                Freelance Work Tools editorial · {guide.readingTime} · Updated {guide.lastUpdated}
              </p>
            </div>
            <ArticleHeroVisual src={guide.heroVisual.src} alt={guide.heroVisual.alt} />
          </div>
        </div>
      </header>

      <div className="section-wrap grid gap-10 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-16">
        <aside>
          <nav className="rounded-xl border border-slate-200 bg-white p-4 lg:sticky lg:top-24" aria-label="Table of contents">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink">On this page</h2>
            <ol className="mt-3 space-y-2">
              {guide.tableOfContents.map((item) => (
                <li key={item.id}>
                  <Link href={`#${item.id}`} className="block rounded-md py-1 text-xs leading-5 text-ink-muted transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <div id="key-takeaways" className="scroll-mt-24">
            <KeyTakeaways items={guide.keyTakeaways} />
          </div>

          <div className="mt-8">
            <ContentCallout title="How to use this guide">
              Read the explanation first, then test the related calculator with your own assumptions. The goal is not to create a perfect forecast; it is to make the important trade-offs visible before you quote, compare, invoice, or plan capacity.
            </ContentCallout>
          </div>

          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-slate-200 pb-9 pt-9 first:pt-10 last:border-0">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[15px] leading-7 text-ink-muted">{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-muted">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.links && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {section.links.map((link) => (
                    <Link key={link.href} href={link.href} className="inline-flex min-h-10 items-center rounded-full border border-blue-100 bg-brand-soft px-4 py-2 text-xs font-bold text-brand transition hover:border-brand hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}

          {guide.examples.length > 0 && (
            <div id="practical-example" className="scroll-mt-24 pt-8">
              {guide.examples.map((example) => (
                <ExampleScenario key={example.title} title={example.title}>
                  <p>{example.body}</p>
                </ExampleScenario>
              ))}
            </div>
          )}

          {guide.formulaCards.length > 0 && (
            <div id="formula" className="mt-6 scroll-mt-24 space-y-6">
              {guide.formulaCards.map((formula) => <FormulaCard key={formula.title} {...formula} />)}
            </div>
          )}

          {guide.comparisonTables.length > 0 && (
            <div id="comparison" className="mt-6 scroll-mt-24 space-y-6">
              {guide.comparisonTables.map((table) => <ComparisonTable key={table.title} {...table} />)}
            </div>
          )}

          {guide.commonMistakes.length > 0 && (
            <div id="common-mistakes" className="scroll-mt-24 pt-8">
              <CommonMistakes items={guide.commonMistakes} />
            </div>
          )}

          {guide.actionableTips.length > 0 && (
            <section id="next-steps" className="scroll-mt-24 pt-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <p className="section-kicker">Actionable tips</p>
                <h2 className="mt-2 font-display text-xl font-bold text-ink">What to do next</h2>
                <ul className="mt-4 grid gap-3">
                  {guide.actionableTips.map((tip) => <li key={tip} className="rounded-xl bg-surface-soft p-4 text-sm leading-6 text-ink-soft">{tip}</li>)}
                </ul>
              </div>
            </section>
          )}

          <div className="mt-10">
            <DisclaimerBox>{guide.disclaimer}</DisclaimerBox>
          </div>
        </article>
      </div>

      <section className="border-y border-slate-200 bg-surface-soft py-14">
        <div className="section-wrap">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Useful next step</p>
              <h2 className="section-title">Related calculators</h2>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-brand">
              All tools <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{relatedTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
        </div>
      </section>

      <section className="section-wrap py-14">
        <div className="mb-7">
          <p className="section-kicker">Keep reading</p>
          <h2 className="section-title">Related guides</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">{relatedGuides.map((relatedGuide) => <GuideVisualCard key={relatedGuide.slug} guide={relatedGuide} />)}</div>
      </section>

      {guide.faqs.length > 0 && (
        <section id="faq" className="section-wrap grid scroll-mt-24 gap-8 py-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="section-kicker">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <FAQAccordion items={guide.faqs} />
        </section>
      )}
    </>
  );
}
