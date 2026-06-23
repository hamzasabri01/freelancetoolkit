import { getCurrencyOption, type CurrencyCode } from "@/lib/currency";

export function formatCurrency(value: number, currency: CurrencyCode = "USD", maximumFractionDigits?: number) {
  const { locale } = getCurrencyOption(currency);
  const absoluteValue = Math.abs(value);
  const digits = maximumFractionDigits ?? (absoluteValue > 0 && absoluteValue < 100 ? 2 : 0);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(Number.isFinite(value) ? value : 0);
}
