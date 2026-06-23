"use client";

import { useMemo, useState } from "react";
import type { CalculatorField, Tool } from "@/data/tools";
import { countries, getCountry } from "@/data/countries";
import { calculate, type CalculatorFormValues, type CountryCode } from "@/lib/calculators";
import { validateCalculatorValues } from "@/lib/calculators/validation";
import { getCurrencyOption } from "@/lib/currency";
import { countWeekdayHolidays, type HolidayDataByYear } from "@/lib/api/publicHolidays";
import type { ExchangeRateData } from "@/lib/api/exchangeRates";
import { ResultCard } from "@/components/ResultCard";

function createInitialValues(fields: CalculatorField[]): CalculatorFormValues {
  return Object.fromEntries(fields.map((field) => [field.id, String(field.defaultValue)]));
}

export function CalculatorForm({
  tool,
  exchangeRates,
  holidayData,
}: {
  tool: Tool;
  exchangeRates?: ExchangeRateData;
  holidayData?: HolidayDataByYear;
}) {
  const defaults = useMemo(() => createInitialValues(tool.fields), [tool.fields]);
  const availableHolidayYears = useMemo(() => Object.keys(holidayData ?? {}).map(Number).sort(), [holidayData]);
  const [values, setValues] = useState<CalculatorFormValues>(defaults);
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [holidayYear, setHolidayYear] = useState(availableHolidayYears[0] ?? new Date().getFullYear());
  const [excludePublicHolidays, setExcludePublicHolidays] = useState(false);

  const country = getCountry(countryCode);
  const currency = country.currency;
  const currencyOption = getCurrencyOption(currency);
  const { errors, numericValues } = useMemo(() => validateCalculatorValues(tool, values), [tool, values]);
  const holidayResult = holidayData?.[holidayYear]?.[countryCode];
  const weekdayHolidayCount = holidayResult ? countWeekdayHolidays(holidayResult.holidays) : 0;
  const holidayDataAvailable = country.supportsPublicHolidays && weekdayHolidayCount > 0;
  const holidayNote = !country.supportsPublicHolidays
    ? "Generic Europe has no single public-holiday calendar. Select a specific country to exclude holidays."
    : holidayResult?.source === "nager-date"
      ? `${weekdayHolidayCount} nationwide weekday public holidays found. Public holiday data is used to estimate working days. Local rules may vary.`
      : holidayDataAvailable
        ? `${weekdayHolidayCount} estimated weekday public holidays are available while live holiday data is temporarily unavailable. Local rules may vary.`
        : "Public holiday data is temporarily unavailable, and no safe estimate is available for this selection.";

  const calculationValues = useMemo(() => {
    if (!numericValues) return null;
    if (!tool.usesPublicHolidays || !excludePublicHolidays || !holidayDataAvailable) return numericValues;
    const dailyHours = Math.min(24, (numericValues.hoursWeek ?? 0) / 5);
    return { ...numericValues, publicHolidayHours: weekdayHolidayCount * dailyHours };
  }, [numericValues, tool.usesPublicHolidays, excludePublicHolidays, holidayDataAvailable, weekdayHolidayCount]);
  const result = useMemo(() => calculationValues ? calculate(tool.slug, calculationValues) : null, [tool.slug, calculationValues]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_390px]">
      <form
        className="border-b border-slate-200 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8"
        onSubmit={(event) => event.preventDefault()}
        noValidate
        aria-label={`${tool.title} inputs`}
      >
        <fieldset>
          <legend className="mb-5 w-full border-b border-slate-200 pb-3 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            Your numbers
          </legend>

          {(tool.usesCurrency || tool.usesPublicHolidays) && (
            <div className="mb-6 rounded-xl border border-blue-100 bg-brand-soft/60 p-4">
              <label htmlFor="calculator-country" className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                {tool.usesCurrency ? "Country / currency" : "Country"}
              </label>
              <select
                id="calculator-country"
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value as CountryCode)}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition duration-200 hover:border-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100"
              >
                {countries.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                    {tool.usesCurrency ? ` — ${option.currency}` : ""}
                  </option>
                ))}
              </select>

              {tool.usesCurrency && (
                <p className="mt-1.5 text-xs leading-5 text-ink-muted">
                  Money fields and results use {currency}. Reference conversions use cached public exchange-rate data.
                </p>
              )}

              {tool.usesPublicHolidays && (
                <div className="mt-4 border-t border-blue-100 pt-4">
                  <div className="grid gap-3 sm:grid-cols-[1fr_130px] sm:items-end">
                    <label
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-blue-100 bg-white px-3 py-2 text-sm font-semibold text-ink-soft"
                      htmlFor="exclude-public-holidays"
                    >
                      <input
                        id="exclude-public-holidays"
                        type="checkbox"
                        checked={excludePublicHolidays}
                        disabled={!holidayDataAvailable}
                        onChange={(event) => setExcludePublicHolidays(event.target.checked)}
                        className="size-4 rounded border-slate-300 text-brand focus:ring-brand disabled:cursor-not-allowed"
                      />
                      Exclude public holidays
                    </label>
                    <div>
                      <label htmlFor="holiday-year" className="mb-1 block text-xs font-semibold text-ink-soft">
                        Holiday year
                      </label>
                      <select
                        id="holiday-year"
                        value={holidayYear}
                        onChange={(event) => setHolidayYear(Number(event.target.value))}
                        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink outline-none focus:border-brand focus:ring-4 focus:ring-blue-100"
                      >
                        {availableHolidayYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-ink-muted">{holidayNote}</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            {tool.fields.map((field) => {
              const error = errors[field.id];
              const prefix = field.kind === "currency" ? (field.prefix ?? currencyOption.symbol) : field.prefix;
              const suffix = field.kind === "percent" ? (field.suffix ?? "%") : field.suffix;
              const label = field.kind === "currency" ? `${field.label} (${currency})` : field.label;

              return (
                <div className="mb-5" key={field.id}>
                  <label htmlFor={field.id} className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                    {label}
                  </label>
                  <div className="relative">
                    {prefix && (
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-muted">
                        {prefix}
                      </span>
                    )}
                    <input
                      id={field.id}
                      type="number"
                      inputMode="decimal"
                      value={values[field.id]}
                      min={field.min}
                      max={field.max}
                      step={field.step ?? "any"}
                      required
                      onChange={(event) => setValues((current) => ({ ...current, [field.id]: event.target.value }))}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${field.id}-error` : field.hint ? `${field.id}-hint` : undefined}
                      className={`h-11 w-full rounded-lg border bg-white text-sm text-ink outline-none transition duration-200 hover:border-slate-400 focus:border-brand focus:ring-4 focus:ring-blue-100 ${prefix ? "pl-10" : "pl-3"} ${suffix ? "pr-9" : "pr-3"} ${error ? "border-red-400 bg-red-50/30" : "border-slate-300"}`}
                    />
                    {suffix && (
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-muted">
                        {suffix}
                      </span>
                    )}
                  </div>
                  {error ? (
                    <p id={`${field.id}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
                      {error}
                    </p>
                  ) : field.hint ? (
                    <p id={`${field.id}-hint`} className="mt-1.5 text-xs leading-5 text-ink-muted">
                      {field.hint}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-1 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={() => setValues(defaults)}
              className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft transition duration-200 hover:border-brand hover:bg-brand-soft hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:bg-blue-100"
            >
              Reset values
            </button>
            <span className="text-xs text-ink-muted">Results update automatically</span>
          </div>
        </fieldset>
      </form>

      <div className="min-w-0 bg-white p-5 sm:p-7 lg:p-8">
        <ResultCard label={tool.resultLabel} result={result} currency={currency} exchangeRates={exchangeRates} />
      </div>
    </div>
  );
}
