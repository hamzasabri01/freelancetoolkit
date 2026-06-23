import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Guide } from "@/data/guides";

export function BlogCard({ guide, headingLevel = "h2" }: { guide: Guide; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 motion-safe:hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift">
    <div className="grid h-32 place-items-center bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_60%),linear-gradient(135deg,#f8fafc,#eff6ff)] sm:h-36"><BookOpen size={30} className="text-brand" aria-hidden="true" /></div>
    <div className="p-5"><div className="text-[10px] font-bold uppercase tracking-wider text-brand">{guide.category}</div><Heading className="mt-2 font-display text-base font-bold leading-6 text-ink"><Link href={`/guides/${guide.slug}`} className="rounded-sm transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">{guide.title}</Link></Heading><p className="mt-2 text-sm leading-6 text-ink-muted">{guide.excerpt}</p><div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted"><span>FreelanceToolKit editorial · {guide.readTime}</span><ArrowUpRight size={15} className="transition group-hover:text-brand" aria-hidden="true" /></div></div>
  </article>;
}
