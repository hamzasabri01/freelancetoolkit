import type { CalculatorResult } from "@/lib/calculators";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { CurrencyCode } from "@/lib/currency";
import { AlertCircle, TrendingUp } from "lucide-react";
import type { ExchangeRateData } from "@/lib/api/exchangeRates";
import { ExchangeRateNote } from "@/components/ExchangeRateNote";

const renderValue = (value: number, kind: "currency" | "number" | "percentage" = "currency", currency: CurrencyCode) => {
  if (kind === "currency") return formatCurrency(value, currency);
  if (kind === "percentage") return `${formatNumber(value)}%`;
  return formatNumber(value);
};

export function ResultCard({ label, result, currency, exchangeRates }: { label: string; result: CalculatorResult | null; currency: CurrencyCode; exchangeRates?: ExchangeRateData }) {
  if (!result) return <div className="grid min-h-64 place-items-center rounded-xl border border-dashed border-red-200 bg-red-50/70 p-6 text-center" role="alert"><div><span className="mx-auto grid size-10 place-items-center rounded-full bg-red-100 text-red-700"><AlertCircle size={20} aria-hidden="true" /></span><p className="mt-3 font-semibold text-red-900">Check your inputs</p><p className="mt-1 text-sm leading-6 text-red-700">Fix the highlighted values to see an estimate.</p></div></div>;
  return <div>
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-brand p-5 text-white shadow-[0_12px_35px_rgba(37,99,235,.23)] sm:p-6"><div className="absolute -right-10 -top-10 size-36 rounded-full border-[24px] border-white/5" /><div className="mb-5 grid size-9 place-items-center rounded-lg bg-white/15"><TrendingUp size={17} aria-hidden="true" /></div><p className="text-[11px] font-bold uppercase tracking-wider text-white/80">{label}</p><output className="mt-2 block break-words font-display text-3xl font-bold tracking-[-.045em] sm:text-4xl" aria-live="polite" aria-atomic="true">{renderValue(result.primary, result.kind, currency)}</output><p className="mt-2 text-xs text-white/75">Based on the values entered{result.kind === "currency" ? ` · ${currency}` : ""}</p></div>
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.03)]">{result.details.map((detail) => <div key={detail.label} className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-3.5 last:border-0 sm:items-center"><span className="text-xs leading-5 text-ink-muted">{detail.label}</span><span className="max-w-[55%] break-words text-right text-sm font-bold leading-5 text-ink">{renderValue(detail.value, detail.kind, currency)}</span></div>)}</div>
    {exchangeRates && result.kind === "currency" && <ExchangeRateNote amount={result.primary} currency={currency} exchangeRates={exchangeRates} />}
  </div>;
}
