import { describe, expect, it } from "vitest";
import { calculateFreelanceHourlyRate } from "@/lib/calculators/freelanceRate";

const input = { income: 75_000, expenses: 12_000, taxRate: 25, weeksOff: 5, hoursWeek: 40, billableRate: 65 };

describe("calculateFreelanceHourlyRate", () => {
  it("includes taxes, expenses, leave, and billable utilization", () => {
    const result = calculateFreelanceHourlyRate(input);
    expect(result.primary).toBeCloseTo(91.65, 2);
    expect(result.details[0].value).toBe(112_000);
    expect(result.details[1].value).toBe(1_222);
  });

  it("reduces capacity when public holiday hours are supplied", () => {
    const result = calculateFreelanceHourlyRate({ ...input, publicHolidayHours: 80 });
    expect(result.primary).toBeCloseTo(95.73, 2);
    expect(result.details[1].value).toBe(1_170);
  });
});
