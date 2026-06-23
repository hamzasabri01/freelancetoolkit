import type { CurrencyCode } from "@/lib/calculators/types";

const FRANKFURTER_V2_BASE_URL = "https://api.frankfurter.dev/v2";
const supportedQuotes = ["EUR", "GBP", "CAD", "AUD"] as const satisfies readonly CurrencyCode[];
const EXCHANGE_RATE_URL = `${FRANKFURTER_V2_BASE_URL}/rates?base=USD&quotes=${supportedQuotes.join(",")}`;

const fallbackRates: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.52,
};

export type ExchangeRateData = {
  base: "USD";
  rates: Record<CurrencyCode, number>;
  date: string | null;
  source: "frankfurter" | "fallback";
};

type FrankfurterV2Rate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

type FrankfurterV2Response = FrankfurterV2Rate[];

function parseFrankfurterRates(data: unknown) {
  if (!Array.isArray(data)) throw new Error("Frankfurter returned invalid data");

  const records = data as FrankfurterV2Response;
  const rates = { ...fallbackRates };
  const dates: string[] = [];

  for (const quote of supportedQuotes) {
    const record = records.find((item) => item?.base === "USD" && item.quote === quote);
    if (!record || !Number.isFinite(record.rate) || record.rate <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
      throw new Error(`Frankfurter returned an invalid ${quote} rate`);
    }
    rates[quote] = record.rate;
    dates.push(record.date);
  }

  return { rates, date: dates.sort().at(-1) ?? null };
}

export async function getExchangeRates(): Promise<ExchangeRateData> {
  try {
    const response = await fetch(EXCHANGE_RATE_URL, {
      signal: AbortSignal.timeout(4_000),
      next: { revalidate: 21_600 },
    });
    if (!response.ok) throw new Error(`Frankfurter returned ${response.status}`);
    const data: unknown = await response.json();
    const { rates, date } = parseFrankfurterRates(data);
    return { base: "USD", rates, date, source: "frankfurter" };
  } catch {
    return { base: "USD", rates: { ...fallbackRates }, date: null, source: "fallback" };
  }
}
