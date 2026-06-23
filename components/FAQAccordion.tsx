export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <section key={item.question} className="rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
          <h3 className="text-sm font-semibold text-ink">{item.question}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{item.answer}</p>
        </section>
      ))}
    </div>
  );
}
