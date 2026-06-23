import { describe, expect, it } from "vitest";
import { calculateProjectPricing } from "@/lib/calculators/projectPricing";

describe("calculateProjectPricing", () => {
  it("adds direct costs and contingency before applying margin", () => {
    const result = calculateProjectPricing({ hours: 80, rate: 75, costs: 500, contingency: 15, profit: 20 });
    expect(result.primary).toBeCloseTo(9_343.75, 2);
    expect(result.details[0].value).toBe(6_000);
    expect(result.details[2].value).toBe(975);
  });
});
