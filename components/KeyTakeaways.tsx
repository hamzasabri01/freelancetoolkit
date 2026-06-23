import { CheckCircle2 } from "lucide-react";

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:p-6">
      <p className="section-kicker text-emerald-700">Key takeaways</p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
