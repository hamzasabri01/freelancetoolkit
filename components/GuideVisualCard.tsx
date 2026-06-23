import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Guide } from "@/data/guides";
import { getGuideIllustration } from "@/lib/visuals";

export function GuideVisualCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  const illustration = getGuideIllustration(guide.slug);

  return (
    <Link
      href={`/guides/${guide.slug}`}
      aria-label={`Read guide: ${guide.title}`}
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.02)] transition duration-200 motion-safe:hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${featured ? "lg:grid lg:grid-cols-[.9fr_1.1fr]" : ""}`}
    >
      <div className="grid min-h-44 place-items-center bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_60%),linear-gradient(135deg,#f8fafc,#eff6ff)] p-5">
        <Image src={illustration.src} alt={illustration.alt} width={420} height={260} className="h-auto w-full max-w-xs" />
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <div className="text-[10px] font-bold uppercase tracking-wider text-brand">{guide.category}</div>
        <h3 className="mt-2 font-display text-lg font-bold leading-6 text-ink transition group-hover:text-brand">{guide.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{guide.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
          <span>{guide.readTime} · Updated {guide.publishedAt}</span>
          <span className="inline-flex items-center gap-1 font-bold text-brand">
            Read guide <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
