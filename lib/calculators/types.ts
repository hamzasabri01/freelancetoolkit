export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD";
export type CountryCode = "US" | "GB" | "CA" | "AU" | "DE" | "FR" | "ES" | "IT" | "NL" | "EU";
export type CalculatorInput = Record<string, number>;
export type CalculatorNumericValues = CalculatorInput;
export type CalculatorFormValues = Record<string, string>;
export type ResultValueKind = "currency" | "number" | "percentage";

export type MoneyAmount = { amount: number; currency: CurrencyCode };
export type ValidationError = { field: string; message: string };

export type CalculatorResultItem = {
  label: string;
  value: number;
  kind?: ResultValueKind;
};

export type CalculatorResult = {
  primary: number;
  kind: ResultValueKind;
  details: CalculatorResultItem[];
};

export type FreelanceHourlyRateInputs = {
  income: number;
  expenses: number;
  taxRate: number;
  weeksOff: number;
  hoursWeek: number;
  billableRate: number;
  publicHolidayHours?: number;
};

export type SalaryToHourlyInputs = { salary: number; hoursWeek: number; weeksYear: number };
export type HourlyToSalaryInputs = { hourly: number; hoursWeek: number; weeksYear: number };
export type ContractorVsEmployeeInputs = { contractRate: number; contractHours: number; salary: number; benefits: number; contractExpenses: number };
export type ProjectPricingInputs = { hours: number; rate: number; costs: number; contingency: number; profit: number };
export type InvoiceInputs = { quantity: number; rate: number; taxRate: number; discount: number };
export type RemoteWorkExpenseInputs = { internet: number; utilities: number; software: number; workspace: number };
export type SaasCostInputs = { monthly: number; annual: number; unusedRate: number };
export type BillableHoursInputs = { hoursWeek: number; weeksOff: number; billableRate: number; publicHolidayHours?: number };
export type LatePaymentFeeInputs = { invoice: number; annualRate: number; days: number };
