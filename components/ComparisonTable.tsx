export type ComparisonTableRow = {
  label: string;
  left: string;
  right: string;
};

export function ComparisonTable({ title, leftLabel, rightLabel, rows }: { title: string; leftLabel: string; rightLabel: string; rows: ComparisonTableRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-surface-soft px-5 py-4">
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-white text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-5 py-3 font-bold">Decision area</th>
              <th className="px-5 py-3 font-bold">{leftLabel}</th>
              <th className="px-5 py-3 font-bold">{rightLabel}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.label}>
                <th className="px-5 py-4 font-semibold text-ink">{row.label}</th>
                <td className="px-5 py-4 leading-6 text-ink-muted">{row.left}</td>
                <td className="px-5 py-4 leading-6 text-ink-muted">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
