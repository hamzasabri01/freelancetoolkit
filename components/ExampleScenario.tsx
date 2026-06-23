import type { ReactNode } from "react";

export function ExampleScenario({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.02)] sm:p-6">
      <p className="section-kicker">Example scenario</p>
      <h3 className="mt-2 font-display text-lg font-bold text-ink">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-ink-muted">{children}</div>
    </section>
  );
}
