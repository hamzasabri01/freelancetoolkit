import { describe, expect, it } from "vitest";
import { calculateSalaryToHourly } from "@/lib/calculators/salaryToHourly";

describe("calculateSalaryToHourly", () => {
  it("divides annual salary by paid annual hours", () => {
    const result = calculateSalaryToHourly({ salary: 80_000, hoursWeek: 40, weeksYear: 52 });
    expect(result.primary).toBeCloseTo(38.46, 2);
    expect(result.details[2].value).toBe(2_080);
  });
});
