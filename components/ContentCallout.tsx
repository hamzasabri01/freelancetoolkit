import { Info } from "lucide-react";
import type { ReactNode } from "react";

export function ContentCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm">
          <Info size={17} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-ink">{title}</h3>
          <div className="mt-2 text-sm leading-6 text-ink-muted">{children}</div>
        </div>
      </div>
    </aside>
  );
}
