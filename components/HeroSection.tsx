import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

const previewRows = [
  ["Income goal", "$75,000"],
  ["Expenses", "$12,000"],
  ["Billable hours", "1,160"],
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#eef6ff_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="home-hero-glow left-[8%] top-10 bg-blue-300/30" aria-hidden="true" />
      <div className="home-hero-glow right-[6%] top-28 bg-emerald-200/35 [animation-delay:1.6s]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:40px_40px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,.78fr)] lg:items-center">
        <div className="home-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand shadow-sm backdrop-blur sm:text-[11px]">
            <Sparkles size={13} aria-hidden="true" /> Free freelance pricing calculators
          </div>
          <h1 className="max-w-4xl font-display text-[2.65rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
            Price freelance work with clearer numbers, not guesswork
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
            Use free calculators and practical guides to estimate hourly rates, billable hours, project prices, invoices, and real freelance income.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/tools/freelance-hourly-rate-calculator" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(37,99,235,.26)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_18px_42px_rgba(37,99,235,.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:translate-y-0">
              Start with hourly rate calculator <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/tools" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white/85 px-6 py-3 text-sm font-semibold text-ink-soft shadow-sm transition duration-200 hover:border-brand hover:bg-white hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Explore all tools
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-ink-muted">
            {["No account required", "Free to use", "Privacy-friendly calculations"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="home-rise [animation-delay:.12s]">
          <div className="relative mx-auto max-w-md rounded-[1.75rem] border border-blue-100 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,.14)] backdrop-blur">
            <div className="rounded-[1.35rem] border border-slate-200 bg-surface-soft p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em] text-brand">Example estimate</p>
                  <h2 className="mt-1 font-display text-xl font-bold text-ink">Hourly rate preview</h2>
                </div>
                <div className="grid size-11 place-items-center rounded-2xl bg-brand text-white">
                  <ShieldCheck size={20} aria-hidden="true" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {previewRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <span className="text-sm text-ink-muted">{label}</span>
                    <span className="font-display text-sm font-bold text-ink">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-ink p-5 text-white">
                <p className="text-xs font-medium text-white/55">Estimated hourly rate</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <strong className="font-display text-4xl tracking-tight">$96</strong>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-100">Planning input</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-ink-muted">
                Static demo UI. Your result depends on your own income goal, costs, taxes, time off, and billable capacity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
