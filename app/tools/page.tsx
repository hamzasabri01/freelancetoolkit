import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolGrid } from "@/components/ToolGrid";
import { categories, tools, type ToolCategory } from "@/data/tools";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata("Freelance calculators", "Browse free calculators for freelance rates, project pricing, income, invoices, and business costs.", "/tools");

type ToolsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const params = await searchParams;
  const requestedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const categoryNames = categories.map((category) => category.name);
  const isValidCategory = requestedCategory ? categoryNames.includes(requestedCategory as ToolCategory) : false;
  const activeCategory = isValidCategory ? requestedCategory as ToolCategory : null;
  const filteredTools = activeCategory ? tools.filter((tool) => tool.category === activeCategory) : tools;

  return <>
    <section className="border-b border-slate-200 bg-surface-soft py-12 sm:py-16 lg:py-20">
      <div className="section-wrap">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        <p className="section-kicker mt-8">Free calculator library</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Tools for independent work</h1>
        <p className="section-copy">Ten focused calculators for rates, pricing, income, cash flow, and the costs behind your business.</p>
      </div>
    </section>
    <section className="section-wrap py-10 sm:py-14 lg:py-16">
      <nav className="-mx-4 mb-8 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" aria-label="Filter tools by category">
        <Link href="/tools" aria-current={!activeCategory ? "page" : undefined} className={`min-h-10 shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${!activeCategory ? "border-brand bg-brand text-white shadow-sm" : "border-slate-300 bg-white text-ink-soft hover:border-brand hover:bg-brand-soft hover:text-brand"}`}>All tools</Link>
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return <Link key={category.name} href={`/tools?category=${encodeURIComponent(category.name)}`} aria-current={isActive ? "page" : undefined} className={`min-h-10 shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${isActive ? "border-brand bg-brand text-white shadow-sm" : "border-slate-300 bg-white text-ink-soft hover:border-brand hover:bg-brand-soft hover:text-brand"}`}>{category.name}</Link>;
        })}
      </nav>
      {requestedCategory && !isValidCategory && <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">The requested category was not found. Showing all tools.</p>}
      <div className="mb-6 flex items-end justify-between gap-4"><div><p className="section-kicker">{activeCategory ?? "All categories"}</p><h2 className="font-display text-xl font-bold text-ink">{activeCategory ? `${activeCategory} tools` : "All tools"}</h2></div><p className="text-xs font-medium text-ink-muted">{filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}</p></div>
      <ToolGrid items={filteredTools} />
    </section>
  </>;
}
