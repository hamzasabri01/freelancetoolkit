import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-brand-soft px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand sm:mb-7 sm:text-[11px]">
          <Sparkles size={13} aria-hidden="true" /> 10 free tools for independent work
        </div>
        <h1 className="font-display text-[2.5rem] font-bold leading-[1.08] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[62px]">
          Stop guessing.
          <br />
          <span className="text-brand">Price your work</span> with confidence.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
          Practical calculators for freelancers, consultants, and remote professionals. Understand your rates, projects, and real income—without creating an account.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
          <Link href="/tools" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_12px_30px_rgba(37,99,235,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0 sm:w-auto">
            Explore all tools <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/guides" className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink-soft transition duration-200 hover:border-brand hover:bg-brand-soft hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto">
            Browse practical guides
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-ink-muted">
          {["No signup", "Private by design", "Instant estimates"].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-emerald-600" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
