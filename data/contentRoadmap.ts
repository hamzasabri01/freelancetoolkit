export type ContentRoadmapPriority = "high" | "medium" | "low";

export type ContentRoadmapItem = {
  title: string;
  slug: string;
  targetKeyword: string;
  searchIntent: string;
  priority: ContentRoadmapPriority;
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
  suggestedSections: string[];
  notes: string;
};

export const contentRoadmap: ContentRoadmapItem[] = [
  {
    title: "Freelance Hourly Rate by Country: What Beginners Should Consider",
    slug: "freelance-hourly-rate-by-country",
    targetKeyword: "freelance hourly rate by country",
    searchIntent: "Country-aware informational research before using a rate calculator.",
    priority: "high",
    relatedToolSlugs: ["freelance-hourly-rate-calculator", "billable-hours-calculator"],
    relatedGuideSlugs: ["how-to-calculate-your-freelance-hourly-rate", "freelance-hourly-rate-with-taxes-and-expenses"],
    suggestedSections: ["Quick answer", "Why country changes rate planning", "Taxes and benefits context", "Expenses and currency", "Common mistakes", "Calculator workflow"],
    notes: "Create as a broad hub first, then add country-specific pages only when each page has enough unique local context.",
  },
  {
    title: "Freelance Hourly Rate in Canada: Taxes, Expenses, and Billable Hours",
    slug: "freelance-hourly-rate-canada",
    targetKeyword: "freelance hourly rate Canada",
    searchIntent: "Country-specific pricing planning for Canadian freelancers.",
    priority: "high",
    relatedToolSlugs: ["freelance-hourly-rate-calculator", "remote-work-expense-calculator"],
    relatedGuideSlugs: ["freelance-hourly-rate-with-taxes-and-expenses", "common-freelance-expenses"],
    suggestedSections: ["Quick answer", "Tax planning caveat", "Business expenses", "Billable hours", "Currency and client location", "FAQ"],
    notes: "Avoid pretending to give tax advice. Use careful language and encourage qualified local advice.",
  },
  {
    title: "Freelance Hourly Rate in the United States: Beginner Guide",
    slug: "freelance-hourly-rate-united-states",
    targetKeyword: "freelance hourly rate United States",
    searchIntent: "Country-specific beginner rate planning for US freelancers.",
    priority: "high",
    relatedToolSlugs: ["freelance-hourly-rate-calculator", "billable-hours-calculator"],
    relatedGuideSlugs: ["how-to-calculate-your-freelance-hourly-rate", "how-many-billable-hours-should-a-freelancer-work"],
    suggestedSections: ["Quick answer", "Self-employment planning caveat", "Expenses", "Billable capacity", "Hourly vs project pricing", "FAQ"],
    notes: "Keep legal and tax claims general unless verified and cited later.",
  },
  {
    title: "Freelance Hourly Rate in France: Expenses, Taxes, and Pricing",
    slug: "freelance-hourly-rate-france",
    targetKeyword: "freelance hourly rate France",
    searchIntent: "Country-specific freelance rate planning for France.",
    priority: "high",
    relatedToolSlugs: ["freelance-hourly-rate-calculator", "salary-to-hourly-calculator"],
    relatedGuideSlugs: ["freelance-hourly-rate-with-taxes-and-expenses", "salary-to-hourly-rate-explained"],
    suggestedSections: ["Quick answer", "Tax and contribution caveat", "Expenses", "Billable hours", "Pricing examples", "FAQ"],
    notes: "Needs careful localization and no unsupported tax specifics.",
  },
  {
    title: "Freelance Hourly Rate in Germany: What to Include",
    slug: "freelance-hourly-rate-germany",
    targetKeyword: "freelance hourly rate Germany",
    searchIntent: "Country-specific freelance rate planning for Germany.",
    priority: "high",
    relatedToolSlugs: ["freelance-hourly-rate-calculator", "remote-work-expense-calculator"],
    relatedGuideSlugs: ["freelance-hourly-rate-with-taxes-and-expenses", "common-freelance-expenses"],
    suggestedSections: ["Quick answer", "Business cost categories", "Tax planning caveat", "Billable hours", "Client pricing", "FAQ"],
    notes: "Avoid thin localization. Add only if enough unique guidance exists.",
  },
  {
    title: "Freelance Invoice Payment Terms Explained",
    slug: "freelance-invoice-payment-terms",
    targetKeyword: "freelance invoice payment terms",
    searchIntent: "Informational guide for due dates, deposits, milestone payments, and late follow-up.",
    priority: "high",
    relatedToolSlugs: ["invoice-generator", "late-payment-fee-calculator"],
    relatedGuideSlugs: ["how-to-create-a-professional-invoice", "how-to-price-a-freelance-project"],
    suggestedSections: ["Quick answer", "Net terms", "Deposits", "Milestones", "Late fees caveat", "Common mistakes", "FAQ"],
    notes: "Strong internal link target for invoice generator and project pricing guide.",
  },
  {
    title: "How to Avoid Underpricing as a Beginner Freelancer",
    slug: "how-to-avoid-underpricing-as-a-beginner-freelancer",
    targetKeyword: "how to avoid underpricing as a freelancer",
    searchIntent: "Beginner-friendly pricing advice with calculator support.",
    priority: "high",
    relatedToolSlugs: ["freelance-hourly-rate-calculator", "project-pricing-calculator"],
    relatedGuideSlugs: ["how-much-should-i-charge-as-a-freelancer", "hourly-rate-vs-project-pricing"],
    suggestedSections: ["Quick answer", "Underpricing signals", "Baseline rate", "Scope reduction", "Positioning", "FAQ"],
    notes: "Useful for LinkedIn and Quora answer support without direct link dropping.",
  },
  {
    title: "Hourly Rate vs Project Pricing: Which Is Better for Freelancers?",
    slug: "hourly-rate-vs-project-pricing",
    targetKeyword: "hourly rate vs project pricing",
    searchIntent: "Comparison search intent for pricing model selection.",
    priority: "medium",
    relatedToolSlugs: ["project-pricing-calculator", "freelance-hourly-rate-calculator"],
    relatedGuideSlugs: ["how-to-price-a-freelance-project", "how-much-should-i-charge-as-a-freelancer"],
    suggestedSections: ["Quick answer", "Hourly pricing", "Project pricing", "Comparison", "Mistakes", "FAQ"],
    notes: "Already created; keep roadmap item for future refreshes and country-specific internal linking.",
  },
  {
    title: "Billable Hours vs Non-Billable Hours for Freelancers",
    slug: "billable-hours-vs-non-billable-hours",
    targetKeyword: "billable hours vs non billable hours",
    searchIntent: "Informational comparison with examples.",
    priority: "medium",
    relatedToolSlugs: ["billable-hours-calculator", "project-pricing-calculator"],
    relatedGuideSlugs: ["what-are-billable-hours", "how-many-billable-hours-should-a-freelancer-work"],
    suggestedSections: ["Quick answer", "Billable examples", "Non-billable examples", "Tracking", "Pricing impact", "FAQ"],
    notes: "Already created; revisit with screenshots or examples after more calculator pages are live.",
  },
  {
    title: "How Many Billable Hours Should a Freelancer Work Per Week?",
    slug: "how-many-billable-hours-should-a-freelancer-work",
    targetKeyword: "how many billable hours should a freelancer work",
    searchIntent: "Capacity planning and pricing support.",
    priority: "medium",
    relatedToolSlugs: ["billable-hours-calculator", "freelance-hourly-rate-calculator"],
    relatedGuideSlugs: ["what-are-billable-hours", "billable-hours-vs-non-billable-hours"],
    suggestedSections: ["Quick answer", "Why 40 billable hours is unrealistic", "Weekly examples", "Annual capacity", "Mistakes", "FAQ"],
    notes: "Already created; add country public-holiday examples later only if they remain general and accurate.",
  },
];
