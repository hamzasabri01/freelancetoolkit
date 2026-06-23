import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/data/tools";
import { ToolIcon } from "@/components/icons";

const colors = { blue: "bg-blue-50 text-blue-600", green: "bg-emerald-50 text-emerald-600", violet: "bg-violet-50 text-violet-600", amber: "bg-amber-50 text-amber-600" };
const tags = { Income: "bg-blue-50 text-blue-700", Pricing: "bg-violet-50 text-violet-700", Business: "bg-emerald-50 text-emerald-700", "Remote Work": "bg-amber-50 text-amber-700", SaaS: "bg-violet-50 text-violet-700" };

export function ToolCard({ tool }: { tool: Tool }) {
  return <Link href={`/tools/${tool.slug}`} className="group flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.02)] transition duration-200 motion-safe:hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:min-h-[240px] sm:p-6">
    <div className={`grid size-11 place-items-center rounded-xl transition duration-200 group-hover:scale-105 ${colors[tool.color]}`}><ToolIcon name={tool.icon} /></div>
    <div className="mt-5 flex-1"><h3 className="font-display text-[15px] font-bold leading-5 tracking-tight text-ink transition group-hover:text-brand">{tool.title}</h3><p className="mt-2 text-sm leading-6 text-ink-muted">{tool.description}</p></div>
    <div className="mt-5 flex items-center justify-between"><span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${tags[tool.category]}`}>{tool.category}</span><span className="grid size-8 place-items-center rounded-full border border-slate-200 text-ink-muted transition duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white"><ArrowUpRight size={14} aria-hidden="true" /></span></div>
  </Link>;
}
