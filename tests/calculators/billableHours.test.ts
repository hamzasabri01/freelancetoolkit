import { describe, expect, it } from "vitest";
import { calculateBillableHours } from "@/lib/calculators/billableHours";

describe("calculateBillableHours", () => {
  it("applies utilization to available annual hours", () => {
    const result = calculateBillableHours({ hoursWeek: 40, weeksOff: 5, billableRate: 65 });
    expect(result.primary).toBe(1_222);
  });

  it("subtracts public holiday hours before utilization", () => {
    const result = calculateBillableHours({ hoursWeek: 40, weeksOff: 5, billableRate: 65, publicHolidayHours: 40 });
    expect(result.primary).toBe(1_196);
    expect(result.details[2].value).toBe(1_840);
  });
});
