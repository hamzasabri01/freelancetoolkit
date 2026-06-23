"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return <div className="space-y-2">{items.map((item, index) => {
    const expanded = open === index;
    const buttonId = `${baseId}-question-${index}`;
    const panelId = `${baseId}-answer-${index}`;
    return <div key={item.question} className={`overflow-hidden rounded-xl border bg-white transition duration-200 ${expanded ? "border-blue-200 shadow-[0_4px_14px_rgba(37,99,235,.06)]" : "border-slate-200 hover:border-slate-300"}`}>
      <h3><button id={buttonId} type="button" onClick={() => setOpen(expanded ? null : index)} className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-ink transition hover:bg-surface-soft/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:px-5" aria-expanded={expanded} aria-controls={panelId}><span>{item.question}</span><span className={`grid size-7 shrink-0 place-items-center rounded-full transition ${expanded ? "bg-brand text-white" : "bg-surface-soft text-ink-muted"}`}><ChevronDown size={16} className={`transition duration-200 ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></span></button></h3>
      {expanded && <div id={panelId} role="region" aria-labelledby={buttonId} className="px-4 pb-5 text-sm leading-6 text-ink-muted sm:px-5">{item.answer}</div>}
    </div>;
  })}</div>;
}
