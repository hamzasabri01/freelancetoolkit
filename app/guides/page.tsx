import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { GuideVisualCard } from "@/components/GuideVisualCard";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/data/guides";
import { tools } from "@/data/tools";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata(
  "Freelance guides",
  "Practical guides to freelance rates, project pricing, invoicing, expenses, billable hours, and independent work.",
  "/guides",
);

const categorySlug = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function GuidesPage() {
  const categories = [...new Set(guides.map((guide) => guide.category))];
  const featuredGuides = guides.slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Knowledge base"
        title="Freelance knowledge, clearly explained"
        description="Practical, carefully structured guides for pricing, income, invoicing, expenses, billable hours, and independent work."
      />

      <section className="section-wrap py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch">
          <div className="rounded-3xl border border-blue-100 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_55%),linear-gradient(135deg,#ffffff,#eff6ff)] p-6 sm:p-8">
            <div className="grid size-12 place-items-center rounded-2xl bg-white text-brand shadow-sm">
              <BookOpen size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">Built for real freelance decisions</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
              These guides are written to help you understand the assumption behind the number: how billable time works, why salary comparisons can mislead, how to protect fixed-price scope, and what costs belong in your planning.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Search size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">Browse by category</h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">Jump to pricing, income, invoicing, remote work, and business cost topics.</p>
              </div>
            </div>
            <nav className="mt-5 flex flex-wrap gap-2" aria-label="Guide categories">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`#${categorySlug(category)}`}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-brand hover:bg-brand-soft hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <section className="mt-14">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Featured guides</p>
              <h2 className="section-title">Start with the big decisions</h2>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-brand">
              Use calculators <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">{featuredGuides.map((guide) => <GuideVisualCard key={guide.slug} guide={guide} />)}</div>
        </section>

        <div className="mt-16 space-y-14">
          {categories.map((category) => {
            const categoryGuides = guides.filter((guide) => guide.category === category);
            return (
              <section key={category} id={categorySlug(category)} className="scroll-mt-24">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <p className="section-kicker">Browse by topic</p>
                    <h2 className="section-title">{category}</h2>
                  </div>
                  <p className="text-xs text-ink-muted">{categoryGuides.length} {categoryGuides.length === 1 ? "guide" : "guides"}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {categoryGuides.map((guide) => {
                    const relatedTool = tools.find((tool) => guide.relatedToolSlugs.includes(tool.slug));
                    return (
                      <div key={guide.slug} className="space-y-3">
                        <GuideVisualCard guide={guide} />
                        {relatedTool && (
                          <Link href={`/tools/${relatedTool.slug}`} className="inline-flex items-center gap-2 rounded-lg text-xs font-bold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                            Related tool: {relatedTool.shortTitle} <ArrowRight size={13} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">Editorial principles</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
            FreelanceToolKit publishes practical educational content. We avoid invented credentials and guarantees, identify estimates clearly, and separate general information from financial, tax, legal, or professional advice.
          </p>
        </div>
      </section>
    </>
  );
}
