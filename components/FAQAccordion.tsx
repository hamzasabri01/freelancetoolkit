export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <details key={item.question} open className="group rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
          <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:hidden">
            {item.question}
          </summary>
          <div className="mt-2 text-sm leading-6 text-ink-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
