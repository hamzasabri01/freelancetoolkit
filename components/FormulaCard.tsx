export function FormulaCard({ title, formula, description }: { title: string; formula: string; description: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ffffff)] p-5 sm:p-6">
      <p className="section-kicker">Formula</p>
      <h3 className="mt-2 font-display text-lg font-bold text-ink">{title}</h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-blue-100 bg-white px-4 py-3 font-mono text-sm font-semibold text-brand">
        {formula}
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-muted">{description}</p>
    </div>
  );
}
