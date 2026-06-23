import type { Tool } from "@/data/tools";
import type { CalculatorFormValues, CalculatorNumericValues } from "@/lib/calculators/types";

export type CalculatorErrors = Record<string, string>;

export type ValidationResult = {
  errors: CalculatorErrors;
  numericValues: CalculatorNumericValues | null;
};

const MAX_MONEY_VALUE = 1_000_000_000;
const MAX_GENERIC_VALUE = 1_000_000;

export function validateCalculatorValues(tool: Tool, values: CalculatorFormValues): ValidationResult {
  const errors: CalculatorErrors = {};
  const numericValues: CalculatorNumericValues = {};

  for (const field of tool.fields) {
    const rawValue = values[field.id]?.trim() ?? "";
    if (rawValue === "") {
      errors[field.id] = `${field.label} is required.`;
      continue;
    }

    const value = Number(rawValue);
    if (!Number.isFinite(value)) {
      errors[field.id] = "Enter a valid number.";
      continue;
    }
    if (value < 0) {
      errors[field.id] = "Negative values are not allowed.";
      continue;
    }
    if (field.min !== undefined && value < field.min) {
      errors[field.id] = field.min > 0 ? `Enter at least ${field.min}.` : "Enter zero or a positive value.";
      continue;
    }
    if (field.max !== undefined && value > field.max) {
      errors[field.id] = `Enter no more than ${field.max}.`;
      continue;
    }

    const realisticMaximum = field.kind === "currency" ? MAX_MONEY_VALUE : MAX_GENERIC_VALUE;
    if (value > realisticMaximum) {
      errors[field.id] = field.kind === "currency"
        ? "Enter an amount below 1 billion."
        : "This value is unrealistically high. Enter 1,000,000 or less.";
      continue;
    }
    numericValues[field.id] = value;
  }

  if (tool.slug === "invoice-generator" && !errors.discount && !errors.quantity && !errors.rate) {
    const subtotal = numericValues.quantity * numericValues.rate;
    if (numericValues.discount > subtotal) {
      errors.discount = "Discount cannot be greater than the invoice subtotal.";
    }
  }

  return {
    errors,
    numericValues: Object.keys(errors).length === 0 ? numericValues : null,
  };
}
