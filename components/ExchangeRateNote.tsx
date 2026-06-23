import type { ExchangeRateData } from "@/lib/api/exchangeRates";
import type { CurrencyCode } from "@/lib/calculators/types";
import { formatCurrency } from "@/lib/format";

export function ExchangeRateNote({ amount, currency, exchangeRates }: { amount: number; currency: CurrencyCode; exchangeRates: ExchangeRateData }) {
  const usdEquivalent = currency === "USD" ? amount : amount / exchangeRates.rates[currency];
  const isFallback = exchangeRates.source === "fallback";
  return <div className={`mt-4 rounded-xl border p-3 text-xs leading-5 ${isFallback ? "border-amber-200 bg-amber-50 text-amber-950" : "border-blue-100 bg-brand-soft/60 text-blue-900"}`} role="status">
    {currency !== "USD" && <p><span className="font-semibold">Reference conversion:</span> approximately {formatCurrency(usdEquivalent, "USD")}.</p>}
    <p className={currency !== "USD" ? "mt-1" : ""}>{isFallback ? "Live exchange-rate data is temporarily unavailable. Internal fallback reference rates are in use; verify important conversions." : `Exchange rates come from Frankfurter public market data and are estimates.${exchangeRates.date ? ` Latest published date: ${exchangeRates.date}.` : ""}`}</p>
  </div>;
}
