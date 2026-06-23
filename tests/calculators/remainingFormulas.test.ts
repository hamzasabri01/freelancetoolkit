import { describe, expect, it } from "vitest";
import { calculateContractorVsEmployee } from "@/lib/calculators/contractorVsEmployee";
import { calculateInvoice } from "@/lib/calculators/invoice";
import { calculateLatePaymentFee } from "@/lib/calculators/latePaymentFee";
import { calculateRemoteWorkExpenses } from "@/lib/calculators/remoteWorkExpenses";
import { calculateSaasCost } from "@/lib/calculators/saasCost";

describe("remaining calculator formulas", () => {
  it("compares contractor value with the employee package", () => {
    const result = calculateContractorVsEmployee({ contractRate: 75, contractHours: 1_400, salary: 90_000, benefits: 18_000, contractExpenses: 10_000 });
    expect(result.primary).toBe(-13_000);
    expect(result.details[3].value).toBeCloseTo(84.29, 2);
  });

  it("calculates an invoice discount before tax", () => {
    const result = calculateInvoice({ quantity: 10, rate: 100, discount: 100, taxRate: 20 });
    expect(result.primary).toBe(1_080);
    expect(result.details[2].value).toBe(180);
  });

  it("annualizes remote-work costs", () => {
    expect(calculateRemoteWorkExpenses({ internet: 50, utilities: 75, software: 60, workspace: 1_200 }).primary).toBe(3_420);
  });

  it("combines monthly and annual SaaS spend", () => {
    const result = calculateSaasCost({ monthly: 240, annual: 500, unusedRate: 15 });
    expect(result.primary).toBe(3_380);
    expect(result.details[1].value).toBe(507);
  });

  it("uses simple daily interest for late fees", () => {
    const result = calculateLatePaymentFee({ invoice: 3_000, annualRate: 8, days: 30 });
    expect(result.primary).toBeCloseTo(19.73, 2);
  });
});
