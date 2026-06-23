import type { CountryCode, CurrencyCode } from "@/lib/calculators/types";

export type CountryOption = {
  code: CountryCode;
  name: string;
  currency: CurrencyCode;
  locale: string;
  supportsPublicHolidays: boolean;
};

export const countries: CountryOption[] = [
  { code: "US", name: "United States", currency: "USD", locale: "en-US", supportsPublicHolidays: true },
  { code: "GB", name: "United Kingdom", currency: "GBP", locale: "en-GB", supportsPublicHolidays: true },
  { code: "CA", name: "Canada", currency: "CAD", locale: "en-CA", supportsPublicHolidays: true },
  { code: "AU", name: "Australia", currency: "AUD", locale: "en-AU", supportsPublicHolidays: true },
  { code: "DE", name: "Germany", currency: "EUR", locale: "de-DE", supportsPublicHolidays: true },
  { code: "FR", name: "France", currency: "EUR", locale: "fr-FR", supportsPublicHolidays: true },
  { code: "ES", name: "Spain", currency: "EUR", locale: "es-ES", supportsPublicHolidays: true },
  { code: "IT", name: "Italy", currency: "EUR", locale: "it-IT", supportsPublicHolidays: true },
  { code: "NL", name: "Netherlands", currency: "EUR", locale: "nl-NL", supportsPublicHolidays: true },
  { code: "EU", name: "Generic Europe", currency: "EUR", locale: "en-IE", supportsPublicHolidays: false },
];

export function getCountry(code: CountryCode) {
  return countries.find((country) => country.code === code) ?? countries[0];
}
