const toolIllustrations: Record<string, string> = {
  "freelance-hourly-rate-calculator": "/illustrations/freelance-rate.svg",
  "salary-to-hourly-calculator": "/illustrations/salary-hourly.svg",
  "hourly-to-salary-calculator": "/illustrations/salary-hourly.svg",
  "contractor-vs-employee-calculator": "/illustrations/contractor-employee.svg",
  "project-pricing-calculator": "/illustrations/project-pricing.svg",
  "invoice-generator": "/illustrations/invoice-generator.svg",
  "remote-work-expense-calculator": "/illustrations/remote-work-expenses.svg",
  "saas-cost-calculator": "/illustrations/saas-cost.svg",
  "billable-hours-calculator": "/illustrations/billable-hours.svg",
  "late-payment-fee-calculator": "/illustrations/late-payment.svg",
};

const guideIllustrations: Record<string, string> = {
  "how-much-should-i-charge-as-a-freelancer": "/illustrations/guide-pricing.svg",
  "how-to-calculate-your-freelance-hourly-rate": "/illustrations/freelance-rate.svg",
  "salary-to-hourly-rate-explained": "/illustrations/salary-hourly.svg",
  "contractor-vs-employee": "/illustrations/contractor-employee.svg",
  "how-to-price-a-freelance-project": "/illustrations/project-pricing.svg",
  "how-to-create-a-professional-invoice": "/illustrations/guide-invoice.svg",
  "common-freelance-expenses": "/illustrations/guide-expenses.svg",
  "what-are-billable-hours": "/illustrations/billable-hours.svg",
};

export function getToolIllustration(slug: string) {
  return {
    src: toolIllustrations[slug] ?? "/illustrations/freelance-rate.svg",
    alt: `${slug.replace(/-/g, " ")} illustration`,
  };
}

export function getGuideIllustration(slug: string) {
  return {
    src: guideIllustrations[slug] ?? "/illustrations/guide-pricing.svg",
    alt: `${slug.replace(/-/g, " ")} guide illustration`,
  };
}
