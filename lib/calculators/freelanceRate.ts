import type { CalculatorResult, FreelanceHourlyRateInputs } from "@/lib/calculators/types";

export function calculateFreelanceHourlyRate(input: FreelanceHourlyRateInputs): CalculatorResult {
  const workingWeeks = 52 - input.weeksOff;
  const scheduledHours = workingWeeks * input.hoursWeek;
  const availableHours = Math.max(1, scheduledHours - (input.publicHolidayHours ?? 0));
  const billableHours = availableHours * (input.billableRate / 100);
  const preTaxProfitRequired = input.income / (1 - input.taxRate / 100);
  const annualRevenueTarget = preTaxProfitRequired + input.expenses;
  return { primary: annualRevenueTarget / billableHours, kind: "currency", details: [
    { label: "Annual revenue target", value: annualRevenueTarget, kind: "currency" },
    { label: "Billable hours / year", value: billableHours, kind: "number" },
    { label: "Non-billable hours / year", value: scheduledHours - billableHours, kind: "number" },
  ] };
}
