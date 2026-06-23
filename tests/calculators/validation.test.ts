import { describe, expect, it } from "vitest";
import { getTool } from "@/data/tools";
import { validateCalculatorValues } from "@/lib/calculators/validation";

const valuesFor = (slug: string) => {
  const tool = getTool(slug);
  if (!tool) throw new Error(`Missing test tool: ${slug}`);
  return { tool, values: Object.fromEntries(tool.fields.map((field) => [field.id, String(field.defaultValue)])) };
};

describe("validateCalculatorValues", () => {
  it("accepts valid configured defaults", () => {
    const { tool, values } = valuesFor("freelance-hourly-rate-calculator");
    expect(validateCalculatorValues(tool, values).errors).toEqual({});
  });

  it("rejects empty, negative, and above-maximum values", () => {
    const { tool, values } = valuesFor("freelance-hourly-rate-calculator");
    expect(validateCalculatorValues(tool, { ...values, income: "" }).errors.income).toContain("required");
    expect(validateCalculatorValues(tool, { ...values, expenses: "-1" }).errors.expenses).toContain("Negative");
    expect(validateCalculatorValues(tool, { ...values, taxRate: "75" }).errors.taxRate).toContain("70");
    expect(validateCalculatorValues(tool, { ...values, hoursWeek: "101" }).errors.hoursWeek).toContain("100");
  });

  it("rejects a discount above the invoice subtotal", () => {
    const { tool, values } = valuesFor("invoice-generator");
    const result = validateCalculatorValues(tool, { ...values, quantity: "1", rate: "100", discount: "101" });
    expect(result.errors.discount).toContain("subtotal");
    expect(result.numericValues).toBeNull();
  });

  it("rejects zero where a positive late-payment value is required", () => {
    const { tool, values } = valuesFor("late-payment-fee-calculator");
    expect(validateCalculatorValues(tool, { ...values, days: "0" }).errors.days).toContain("at least 1");
  });
});
