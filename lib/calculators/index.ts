import {
  calculateBillableHours,
  calculateContractorVsEmployee,
  calculateFreelanceHourlyRate,
  calculateHourlyToSalary,
  calculateInvoice,
  calculateLatePaymentFee,
  calculateProjectPricing,
  calculateRemoteWorkExpenses,
  calculateSaasCost,
  calculateSalaryToHourly,
} from "@/lib/calculators/formulas";
import type {
  BillableHoursInputs,
  CalculatorNumericValues,
  CalculatorResult,
  ContractorVsEmployeeInputs,
  FreelanceHourlyRateInputs,
  HourlyToSalaryInputs,
  InvoiceInputs,
  LatePaymentFeeInputs,
  ProjectPricingInputs,
  RemoteWorkExpenseInputs,
  SaasCostInputs,
  SalaryToHourlyInputs,
} from "@/lib/calculators/types";

export * from "@/lib/calculators/formulas";
export * from "@/lib/calculators/types";

export function calculate(slug: string, values: CalculatorNumericValues): CalculatorResult {
  switch (slug) {
    case "freelance-hourly-rate-calculator": return calculateFreelanceHourlyRate(values as FreelanceHourlyRateInputs);
    case "salary-to-hourly-calculator": return calculateSalaryToHourly(values as SalaryToHourlyInputs);
    case "hourly-to-salary-calculator": return calculateHourlyToSalary(values as HourlyToSalaryInputs);
    case "contractor-vs-employee-calculator": return calculateContractorVsEmployee(values as ContractorVsEmployeeInputs);
    case "project-pricing-calculator": return calculateProjectPricing(values as ProjectPricingInputs);
    case "invoice-generator": return calculateInvoice(values as InvoiceInputs);
    case "remote-work-expense-calculator": return calculateRemoteWorkExpenses(values as RemoteWorkExpenseInputs);
    case "saas-cost-calculator": return calculateSaasCost(values as SaasCostInputs);
    case "billable-hours-calculator": return calculateBillableHours(values as BillableHoursInputs);
    case "late-payment-fee-calculator": return calculateLatePaymentFee(values as LatePaymentFeeInputs);
    default: throw new Error(`Unknown calculator: ${slug}`);
  }
}
