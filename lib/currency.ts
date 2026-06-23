import type { CurrencyCode } from "@/lib/calculators/types";

export const currencyOptions = [
  { country: "United States", currency: "USD", locale: "en-US", symbol: "$" },
  { country: "United Kingdom", currency: "GBP", locale: "en-GB", symbol: "£" },
  { country: "Eurozone", currency: "EUR", locale: "en-IE", symbol: "€" },
  { country: "Canada", currency: "CAD", locale: "en-CA", symbol: "CA$" },
  { country: "Australia", currency: "AUD", locale: "en-AU", symbol: "A$" },
] as const;

export type CurrencyOption = (typeof currencyOptions)[number];
export type { CurrencyCode } from "@/lib/calculators/types";

export function getCurrencyOption(currency: CurrencyCode): CurrencyOption {
  return currencyOptions.find((option) => option.currency === currency) ?? currencyOptions[0];
}
