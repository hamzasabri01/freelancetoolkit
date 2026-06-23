import { afterEach, describe, expect, it, vi } from "vitest";
import { getExchangeRates } from "@/lib/api/exchangeRates";
import { getPublicHolidays } from "@/lib/api/publicHolidays";

describe("API fallbacks", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("maps the Frankfurter v2 rates response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { date: "2026-06-19", base: "USD", quote: "EUR", rate: 0.87 },
        { date: "2026-06-19", base: "USD", quote: "GBP", rate: 0.74 },
        { date: "2026-06-19", base: "USD", quote: "CAD", rate: 1.37 },
        { date: "2026-06-19", base: "USD", quote: "AUD", rate: 1.49 },
      ],
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getExchangeRates();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,GBP,CAD,AUD",
      expect.objectContaining({ next: { revalidate: 21_600 } }),
    );
    expect(result).toEqual({
      base: "USD",
      date: "2026-06-19",
      source: "frankfurter",
      rates: { USD: 1, EUR: 0.87, GBP: 0.74, CAD: 1.37, AUD: 1.49 },
    });
  });

  it("returns safe exchange-rate fallbacks when Frankfurter fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const result = await getExchangeRates();
    expect(result.source).toBe("fallback");
    expect(result.rates.USD).toBe(1);
    expect(result.rates.GBP).toBeGreaterThan(0);
  });

  it("uses the complete fallback when a v2 quote is missing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ date: "2026-06-19", base: "USD", quote: "EUR", rate: 0.87 }],
    }));

    const result = await getExchangeRates();
    expect(result.source).toBe("fallback");
    expect(result.date).toBeNull();
  });

  it("returns estimated public holidays when Nager.Date fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const result = await getPublicHolidays(2026, "US");
    expect(result.source).toBe("estimated-fallback");
    expect(result.holidays.length).toBeGreaterThan(0);
    expect(result.holidays.every((holiday) => holiday.countryCode === "US" && holiday.global)).toBe(true);
  });
});
