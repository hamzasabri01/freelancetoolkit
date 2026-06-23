export type ContentRoadmapItem = {
  slug: string;
  title: string;
  targetKeyword: string;
  cluster: "Rates" | "Project Pricing" | "Invoicing" | "Capacity" | "Expenses" | "Contracting" | "SaaS";
  intent: "informational" | "calculator-support" | "comparison";
  priority: "high" | "medium" | "low";
  plannedPath: string;
  supportingLinks: string[];
};

export const contentRoadmap: ContentRoadmapItem[] = [
  {
    slug: "freelance-day-rate-calculator-guide",
    title: "How to Calculate a Freelance Day Rate",
    targetKeyword: "freelance day rate calculator",
    cluster: "Rates",
    intent: "calculator-support",
    priority: "high",
    plannedPath: "guides/freelance-day-rate-calculator-guide",
    supportingLinks: ["/tools/freelance-hourly-rate-calculator", "/guides/how-to-calculate-your-freelance-hourly-rate"],
  },
  {
    slug: "retainer-pricing-for-freelancers",
    title: "Retainer Pricing for Freelancers",
    targetKeyword: "freelance retainer pricing",
    cluster: "Project Pricing",
    intent: "informational",
    priority: "high",
    plannedPath: "guides/retainer-pricing-for-freelancers",
    supportingLinks: ["/tools/project-pricing-calculator", "/guides/how-to-price-a-freelance-project"],
  },
  {
    slug: "net-30-invoice-terms-explained",
    title: "Net 30 Invoice Terms Explained",
    targetKeyword: "net 30 invoice terms",
    cluster: "Invoicing",
    intent: "informational",
    priority: "high",
    plannedPath: "guides/net-30-invoice-terms-explained",
    supportingLinks: ["/tools/invoice-generator", "/tools/late-payment-fee-calculator", "/guides/how-to-create-a-professional-invoice"],
  },
  {
    slug: "freelance-proposal-pricing-guide",
    title: "Freelance Proposal Pricing Guide",
    targetKeyword: "freelance proposal pricing",
    cluster: "Project Pricing",
    intent: "informational",
    priority: "medium",
    plannedPath: "guides/freelance-proposal-pricing-guide",
    supportingLinks: ["/tools/project-pricing-calculator", "/guides/how-to-price-a-freelance-project"],
  },
  {
    slug: "utilization-rate-for-consultants",
    title: "Utilization Rate for Consultants",
    targetKeyword: "utilization rate for consultants",
    cluster: "Capacity",
    intent: "calculator-support",
    priority: "medium",
    plannedPath: "guides/utilization-rate-for-consultants",
    supportingLinks: ["/tools/billable-hours-calculator", "/guides/what-are-billable-hours"],
  },
  {
    slug: "contractor-day-rate-vs-hourly-rate",
    title: "Contractor Day Rate vs Hourly Rate",
    targetKeyword: "contractor day rate vs hourly rate",
    cluster: "Contracting",
    intent: "comparison",
    priority: "medium",
    plannedPath: "guides/contractor-day-rate-vs-hourly-rate",
    supportingLinks: ["/tools/contractor-vs-employee-calculator", "/guides/contractor-vs-employee"],
  },
  {
    slug: "remote-work-expense-budget",
    title: "Remote Work Expense Budget for Freelancers",
    targetKeyword: "remote work expense budget",
    cluster: "Expenses",
    intent: "calculator-support",
    priority: "medium",
    plannedPath: "guides/remote-work-expense-budget",
    supportingLinks: ["/tools/remote-work-expense-calculator", "/guides/common-freelance-expenses"],
  },
  {
    slug: "saas-budget-planning-small-business",
    title: "SaaS Budget Planning for Small Businesses",
    targetKeyword: "SaaS budget planning",
    cluster: "SaaS",
    intent: "calculator-support",
    priority: "low",
    plannedPath: "guides/saas-budget-planning-small-business",
    supportingLinks: ["/tools/saas-cost-calculator", "/guides/common-freelance-expenses"],
  },
];

