import type { CountryCode } from "@/lib/calculators/types";

export const holidayCountryCodes = ["US", "GB", "CA", "AU", "DE", "FR", "ES", "IT", "NL"] as const;
type HolidayCountryCode = (typeof holidayCountryCodes)[number];

export type PublicHoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  counties?: string[] | null;
};

export type PublicHolidayResult = {
  holidays: PublicHoliday[];
  source: "nager-date" | "estimated-fallback";
};

export type HolidayDataByYear = Record<number, Partial<Record<CountryCode, PublicHolidayResult>>>;

export async function getPublicHolidays(year: number, countryCode: HolidayCountryCode): Promise<PublicHolidayResult> {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`, {
      signal: AbortSignal.timeout(4_000),
      next: { revalidate: 86_400 },
    });
    if (!response.ok) throw new Error(`Nager.Date returned ${response.status}`);
    const holidays = await response.json() as PublicHoliday[];
    if (!Array.isArray(holidays)) throw new Error("Nager.Date returned invalid data");
    return { holidays, source: "nager-date" };
  } catch {
    return { holidays: getEstimatedPublicHolidays(year, countryCode), source: "estimated-fallback" };
  }
}

export async function getHolidayData(years: number[]): Promise<HolidayDataByYear> {
  const entries = await Promise.all(years.flatMap((year) => holidayCountryCodes.map(async (countryCode) => ({
    year,
    countryCode,
    result: await getPublicHolidays(year, countryCode),
  }))));

  return entries.reduce<HolidayDataByYear>((calendar, entry) => {
    calendar[entry.year] ??= {};
    calendar[entry.year][entry.countryCode] = entry.result;
    return calendar;
  }, {});
}

export function countWeekdayHolidays(holidays: PublicHoliday[]) {
  const uniqueDates = new Set(holidays.filter((holiday) => holiday.global).map((holiday) => holiday.date));
  return [...uniqueDates].filter((date) => {
    const day = new Date(`${date}T12:00:00Z`).getUTCDay();
    return day >= 1 && day <= 5;
  }).length;
}

function fixedHoliday(year: number, countryCode: HolidayCountryCode, month: number, day: number, name: string): PublicHoliday {
  return {
    date: toIsoDate(year, month, day),
    localName: name,
    name,
    countryCode,
    global: true,
  };
}

function observedFixedHoliday(year: number, countryCode: HolidayCountryCode, month: number, day: number, name: string): PublicHoliday {
  const date = new Date(Date.UTC(year, month - 1, day, 12));
  const weekday = date.getUTCDay();
  if (weekday === 6) date.setUTCDate(date.getUTCDate() - 1);
  if (weekday === 0) date.setUTCDate(date.getUTCDate() + 1);
  return {
    date: date.toISOString().slice(0, 10),
    localName: name,
    name,
    countryCode,
    global: true,
  };
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, occurrence: number) {
  const date = new Date(Date.UTC(year, month - 1, 1, 12));
  const offset = (weekday - date.getUTCDay() + 7) % 7;
  date.setUTCDate(1 + offset + (occurrence - 1) * 7);
  return date.toISOString().slice(0, 10);
}

function lastWeekdayOfMonth(year: number, month: number, weekday: number) {
  const date = new Date(Date.UTC(year, month, 0, 12));
  const offset = (date.getUTCDay() - weekday + 7) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

function relativeToEaster(year: number, dayOffset: number) {
  const date = getEasterSunday(year);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

function getEasterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function estimatedHoliday(countryCode: HolidayCountryCode, date: string, name: string): PublicHoliday {
  return { date, localName: name, name, countryCode, global: true };
}

function toIsoDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 12)).toISOString().slice(0, 10);
}

function getEstimatedPublicHolidays(year: number, countryCode: HolidayCountryCode): PublicHoliday[] {
  const fixed = (month: number, day: number, name: string) => fixedHoliday(year, countryCode, month, day, name);
  const observed = (month: number, day: number, name: string) => observedFixedHoliday(year, countryCode, month, day, name);
  const holiday = (date: string, name: string) => estimatedHoliday(countryCode, date, name);

  switch (countryCode) {
    case "US":
      return [
        observed(1, 1, "New Year's Day"),
        holiday(nthWeekdayOfMonth(year, 1, 1, 3), "Martin Luther King Jr. Day"),
        holiday(nthWeekdayOfMonth(year, 2, 1, 3), "Presidents' Day"),
        holiday(lastWeekdayOfMonth(year, 5, 1), "Memorial Day"),
        observed(6, 19, "Juneteenth"),
        observed(7, 4, "Independence Day"),
        holiday(nthWeekdayOfMonth(year, 9, 1, 1), "Labor Day"),
        holiday(nthWeekdayOfMonth(year, 10, 1, 2), "Columbus Day"),
        observed(11, 11, "Veterans Day"),
        holiday(nthWeekdayOfMonth(year, 11, 4, 4), "Thanksgiving Day"),
        observed(12, 25, "Christmas Day"),
      ];
    case "GB":
      return [
        observed(1, 1, "New Year's Day"),
        holiday(relativeToEaster(year, -2), "Good Friday"),
        holiday(relativeToEaster(year, 1), "Easter Monday"),
        holiday(nthWeekdayOfMonth(year, 5, 1, 1), "Early May Bank Holiday"),
        holiday(lastWeekdayOfMonth(year, 5, 1), "Spring Bank Holiday"),
        holiday(lastWeekdayOfMonth(year, 8, 1), "Summer Bank Holiday"),
        observed(12, 25, "Christmas Day"),
        observed(12, 26, "Boxing Day"),
      ];
    case "CA":
      return [
        observed(1, 1, "New Year's Day"),
        holiday(relativeToEaster(year, -2), "Good Friday"),
        observed(7, 1, "Canada Day"),
        holiday(nthWeekdayOfMonth(year, 9, 1, 1), "Labour Day"),
        holiday(nthWeekdayOfMonth(year, 10, 1, 2), "Thanksgiving Day"),
        observed(12, 25, "Christmas Day"),
      ];
    case "AU":
      return [
        observed(1, 1, "New Year's Day"),
        observed(1, 26, "Australia Day"),
        holiday(relativeToEaster(year, -2), "Good Friday"),
        holiday(relativeToEaster(year, 1), "Easter Monday"),
        observed(4, 25, "Anzac Day"),
        observed(12, 25, "Christmas Day"),
        observed(12, 26, "Boxing Day"),
      ];
    case "DE":
      return [
        fixed(1, 1, "New Year's Day"),
        holiday(relativeToEaster(year, -2), "Good Friday"),
        holiday(relativeToEaster(year, 1), "Easter Monday"),
        fixed(5, 1, "Labour Day"),
        holiday(relativeToEaster(year, 39), "Ascension Day"),
        holiday(relativeToEaster(year, 50), "Whit Monday"),
        fixed(10, 3, "German Unity Day"),
        fixed(12, 25, "Christmas Day"),
        fixed(12, 26, "Second Day of Christmas"),
      ];
    case "FR":
      return [
        fixed(1, 1, "New Year's Day"),
        holiday(relativeToEaster(year, 1), "Easter Monday"),
        fixed(5, 1, "Labour Day"),
        fixed(5, 8, "Victory Day"),
        holiday(relativeToEaster(year, 39), "Ascension Day"),
        holiday(relativeToEaster(year, 50), "Whit Monday"),
        fixed(7, 14, "Bastille Day"),
        fixed(8, 15, "Assumption of Mary"),
        fixed(11, 1, "All Saints' Day"),
        fixed(11, 11, "Armistice Day"),
        fixed(12, 25, "Christmas Day"),
      ];
    case "ES":
      return [
        fixed(1, 1, "New Year's Day"),
        fixed(1, 6, "Epiphany"),
        holiday(relativeToEaster(year, -2), "Good Friday"),
        fixed(5, 1, "Labour Day"),
        fixed(8, 15, "Assumption of Mary"),
        fixed(10, 12, "National Day of Spain"),
        fixed(11, 1, "All Saints' Day"),
        fixed(12, 6, "Constitution Day"),
        fixed(12, 8, "Immaculate Conception"),
        fixed(12, 25, "Christmas Day"),
      ];
    case "IT":
      return [
        fixed(1, 1, "New Year's Day"),
        fixed(1, 6, "Epiphany"),
        holiday(relativeToEaster(year, 1), "Easter Monday"),
        fixed(4, 25, "Liberation Day"),
        fixed(5, 1, "Labour Day"),
        fixed(6, 2, "Republic Day"),
        fixed(8, 15, "Assumption of Mary"),
        fixed(11, 1, "All Saints' Day"),
        fixed(12, 8, "Immaculate Conception"),
        fixed(12, 25, "Christmas Day"),
        fixed(12, 26, "St. Stephen's Day"),
      ];
    case "NL":
      return [
        fixed(1, 1, "New Year's Day"),
        holiday(relativeToEaster(year, -2), "Good Friday"),
        holiday(relativeToEaster(year, 1), "Easter Monday"),
        fixed(4, 27, "King's Day"),
        holiday(relativeToEaster(year, 39), "Ascension Day"),
        holiday(relativeToEaster(year, 50), "Whit Monday"),
        fixed(12, 25, "Christmas Day"),
        fixed(12, 26, "Second Day of Christmas"),
      ];
  }
}
