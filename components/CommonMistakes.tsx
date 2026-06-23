import { AlertTriangle } from "lucide-react";

export function CommonMistakes({ items }: { items: string[] }) {
  return (
    <section className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5 sm:p-6">
      <p className="section-kicker text-amber-700">Common mistakes</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
