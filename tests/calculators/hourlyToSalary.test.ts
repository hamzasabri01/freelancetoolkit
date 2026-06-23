import { describe, expect, it } from "vitest";
import { calculateHourlyToSalary } from "@/lib/calculators/hourlyToSalary";

describe("calculateHourlyToSalary", () => {
  it("multiplies hourly rate by weekly hours and working weeks", () => {
    const result = calculateHourlyToSalary({ hourly: 45, hoursWeek: 40, weeksYear: 50 });
    expect(result.primary).toBe(90_000);
    expect(result.details[1].value).toBe(1_800);
  });
});
