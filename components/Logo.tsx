import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" aria-label="Freelance Work Tools home">
      <span className="grid size-9 place-items-center rounded-[10px] bg-brand text-white shadow-sm"><TrendingUp size={19} strokeWidth={2.2} aria-hidden="true" /></span>
      <span className={`font-display text-[15px] font-bold tracking-tight ${inverse ? "text-white" : "text-ink"}`}>Freelance<span className="text-blue-500">Work</span></span>
      <span className={`rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${inverse ? "border-white/15 bg-white/10 text-white/70" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>Free</span>
    </Link>
  );
}
