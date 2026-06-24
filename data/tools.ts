export type ToolCategory = "Income" | "Pricing" | "Business" | "Remote Work" | "SaaS";

export type CalculatorField = {
  id: string;
  label: string;
  kind: "currency" | "number" | "percent";
  prefix?: string;
  suffix?: string;
  defaultValue: number | string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
};

export type Tool = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  category: ToolCategory;
  icon: "trend" | "wallet" | "compare" | "clock" | "briefcase" | "invoice" | "home" | "cloud" | "calendar" | "receipt";
  color: "blue" | "green" | "violet" | "amber";
  usesCurrency: boolean;
  usesPublicHolidays?: boolean;
  fields: CalculatorField[];
  resultLabel: string;
  intro: string;
  methodology: string;
  example: string;
  tips: string[];
  disclaimer: string;
  faqs: { question: string; answer: string }[];
};

const commonFaqs = (name: string) => [
  { question: `Is the ${name} free?`, answer: "Yes. It is free to use, requires no account, and your entries stay in your browser." },
  { question: "How accurate is this estimate?", answer: "The result is a planning estimate based on the values you provide. Taxes, local rules, and individual circumstances can change the real outcome." },
  { question: "Does Freelance Work Tools store my financial data?", answer: "No. This calculator runs in your browser and does not send your entries to a server." },
];

export const tools: Tool[] = [
  {
    slug: "freelance-hourly-rate-calculator", title: "Freelance Hourly Rate Calculator", shortTitle: "Hourly Rate Calculator",
    description: "Find a sustainable hourly rate from your income goal, costs, taxes, and realistic billable time.",
    metaDescription: "Calculate a sustainable freelance hourly rate based on income goals, expenses, taxes, time off, and billable hours.",
    category: "Income", icon: "trend", color: "blue", usesCurrency: true, usesPublicHolidays: true, resultLabel: "Recommended hourly rate",
    fields: [
      { id: "income", label: "Target annual take-home income", kind: "currency", defaultValue: 75000, min: 1 },
      { id: "expenses", label: "Annual business expenses", kind: "currency", defaultValue: 12000, min: 0 },
      { id: "taxRate", label: "Estimated tax rate", kind: "percent", suffix: "%", defaultValue: 25, min: 0, max: 70 },
      { id: "weeksOff", label: "Weeks off per year", kind: "number", defaultValue: 5, min: 0, max: 30 },
      { id: "hoursWeek", label: "Working hours per week", kind: "number", defaultValue: 40, min: 1, max: 100 },
      { id: "billableRate", label: "Billable time", kind: "percent", suffix: "%", defaultValue: 65, min: 1, max: 100, hint: "The rest covers admin, sales, and operations." },
    ],
    intro: "A good freelance rate pays for far more than the hours on a client call. It also covers taxes, software, sales time, leave, and the gaps between projects.",
    methodology: "The calculator estimates the revenue needed to cover your take-home target, taxes, and business expenses, then divides it by realistic billable hours after time off, utilization, and optional public holidays.",
    example: "A freelancer targeting 75,000 in take-home income, with 12,000 in expenses and 25% estimated tax, needs a higher revenue target than salary alone suggests. Reducing available time to realistic billable hours produces a sustainable hourly rate.",
    tips: ["Use tracked billable utilization rather than an optimistic guess.", "Include software, insurance, equipment, and professional fees.", "Review the rate whenever expenses, taxes, or available time change."],
    disclaimer: "This estimate is for planning only. Consider local taxes and professional advice before making financial decisions.",
    faqs: commonFaqs("hourly rate calculator"),
  },
  {
    slug: "salary-to-hourly-calculator", title: "Salary to Hourly Calculator", shortTitle: "Salary to Hourly",
    description: "Convert an annual salary into comparable hourly, daily, weekly, and monthly earnings.", metaDescription: "Convert annual salary to hourly pay with adjustments for weekly hours and paid weeks.",
    category: "Income", icon: "wallet", color: "green", usesCurrency: true, resultLabel: "Equivalent hourly pay",
    fields: [{ id: "salary", label: "Annual salary", kind: "currency", defaultValue: 80000, min: 1 }, { id: "hoursWeek", label: "Hours per week", kind: "number", defaultValue: 40, min: 1, max: 100 }, { id: "weeksYear", label: "Paid weeks per year", kind: "number", defaultValue: 52, min: 1, max: 52 }],
    intro: "Compare salaried compensation with hourly opportunities on a consistent basis.", disclaimer: "Benefits, bonuses, paid leave, and taxes are not included unless you account for them separately.", faqs: commonFaqs("salary to hourly calculator"),
    methodology: "Annual salary is divided by total paid hours, calculated as weekly hours multiplied by paid weeks per year.", example: "An 80,000 annual salary over 40 hours a week and 52 paid weeks represents about 38.46 per paid hour before tax and benefits.", tips: ["Compare gross values before comparing taxes.", "Add benefits separately when comparing employment offers.", "Use actual contracted weekly hours when available."],
  },
  {
    slug: "hourly-to-salary-calculator", title: "Hourly to Salary Calculator", shortTitle: "Hourly to Salary",
    description: "Translate an hourly rate into annual, monthly, and weekly gross income.", metaDescription: "Convert hourly pay to an estimated annual salary using your hours and working weeks.",
    category: "Income", icon: "clock", color: "amber", usesCurrency: true, resultLabel: "Estimated annual salary",
    fields: [{ id: "hourly", label: "Hourly rate", kind: "currency", defaultValue: 45, min: 0.01 }, { id: "hoursWeek", label: "Hours per week", kind: "number", defaultValue: 40, min: 1, max: 100 }, { id: "weeksYear", label: "Working weeks per year", kind: "number", defaultValue: 50, min: 1, max: 52 }],
    intro: "See what an hourly contract may represent over a full working year.", disclaimer: "This is gross income and does not include unpaid time, taxes, benefits, or business costs.", faqs: commonFaqs("hourly to salary calculator"),
    methodology: "Hourly pay is multiplied by weekly working hours and then by working weeks per year to estimate gross annual income.", example: "At 45 per hour, 40 hours per week, and 50 working weeks, estimated annual gross income is 90,000.", tips: ["Reduce working weeks for unpaid leave.", "Do not treat gross income as take-home pay.", "Compare benefits and business costs separately."],
  },
  {
    slug: "contractor-vs-employee-calculator", title: "Contractor vs Employee Calculator", shortTitle: "Contractor vs Employee",
    description: "Compare contract revenue with the full value of salary and employer-provided benefits.", metaDescription: "Compare contractor income with employee salary and benefits using an equivalent annual value.",
    category: "Business", icon: "compare", color: "violet", usesCurrency: true, resultLabel: "Contractor advantage",
    fields: [{ id: "contractRate", label: "Contractor hourly rate", kind: "currency", defaultValue: 75, min: 0.01 }, { id: "contractHours", label: "Billable hours per year", kind: "number", defaultValue: 1400, min: 1, max: 8760 }, { id: "salary", label: "Employee salary", kind: "currency", defaultValue: 90000, min: 1 }, { id: "benefits", label: "Benefits value", kind: "currency", defaultValue: 18000, min: 0 }, { id: "contractExpenses", label: "Contractor expenses", kind: "currency", defaultValue: 10000, min: 0 }],
    intro: "A salary and a contract rate are not directly comparable. Include benefits and operating costs to see a more useful difference.", disclaimer: "Employment classification has legal and tax implications. This tool compares values only and is not legal advice.", faqs: commonFaqs("contractor vs employee calculator"),
    methodology: "Contractor revenue is reduced by business expenses and compared with employee salary plus the estimated value of benefits. The break-even rate shows the contract rate needed to match that package.", example: "A contractor billing 75 for 1,400 hours earns 105,000 before expenses. After 10,000 in costs, that value can be compared with a 90,000 salary plus 18,000 in benefits.", tips: ["Estimate benefits conservatively.", "Include unpaid sales and administration time.", "Check employment classification rules in your jurisdiction."],
  },
  {
    slug: "project-pricing-calculator", title: "Project Pricing Calculator", shortTitle: "Project Pricing",
    description: "Build a fixed project price from time, costs, contingency, and target profit.", metaDescription: "Estimate a profitable fixed project price using hours, rate, expenses, contingency, and margin.",
    category: "Pricing", icon: "briefcase", color: "blue", usesCurrency: true, resultLabel: "Suggested project price",
    fields: [{ id: "hours", label: "Estimated project hours", kind: "number", defaultValue: 80, min: 1, max: 100000 }, { id: "rate", label: "Internal hourly rate", kind: "currency", defaultValue: 75, min: 0.01 }, { id: "costs", label: "Direct project costs", kind: "currency", defaultValue: 500, min: 0 }, { id: "contingency", label: "Contingency", kind: "percent", suffix: "%", defaultValue: 15, min: 0, max: 100 }, { id: "profit", label: "Profit margin", kind: "percent", suffix: "%", defaultValue: 20, min: 0, max: 90 }],
    intro: "Fixed-price work needs room for uncertainty, direct costs, and profit—not just delivery hours.", disclaimer: "Validate scope, assumptions, and change-request terms in your client agreement.", faqs: commonFaqs("project pricing calculator"),
    methodology: "The calculator combines labor and direct costs, adds a contingency allowance, then applies profit margin to the final selling price rather than simply marking up cost.", example: "An 80-hour project at an internal rate of 75 has 6,000 in labor cost. Adding direct costs, contingency, and margin produces a price that protects delivery and profit.", tips: ["Write scope assumptions into the proposal.", "Use contingency for uncertainty, not hidden scope.", "Price change requests separately."],
  },
  {
    slug: "invoice-generator", title: "Invoice Generator", shortTitle: "Invoice Generator",
    description: "Draft a clean invoice total with tax, discount, and payment terms.", metaDescription: "Create a quick invoice estimate with quantity, rate, tax, and discount.",
    category: "Business", icon: "invoice", color: "green", usesCurrency: true, resultLabel: "Invoice total",
    fields: [{ id: "quantity", label: "Hours or quantity", kind: "number", defaultValue: 40, min: 0.01, max: 1000000 }, { id: "rate", label: "Rate per unit", kind: "currency", defaultValue: 100, min: 0.01 }, { id: "taxRate", label: "Tax rate", kind: "percent", suffix: "%", defaultValue: 0, min: 0, max: 100 }, { id: "discount", label: "Discount", kind: "currency", defaultValue: 0, min: 0 }],
    intro: "Quickly calculate a professional invoice total before transferring the details to your accounting workflow.", disclaimer: "This foundation calculates invoice totals; it does not create a tax document or retain customer data.", faqs: commonFaqs("invoice generator"),
    methodology: "Quantity is multiplied by rate to produce the subtotal. Any discount is deducted before the selected tax percentage is applied.", example: "Forty hours at 100 creates a 4,000 subtotal. With no discount or tax, the invoice total remains 4,000.", tips: ["Confirm whether tax applies before invoicing.", "Use clear payment terms and a due date.", "Keep invoice numbers and client records in an accounting system."],
  },
  {
    slug: "remote-work-expense-calculator", title: "Remote Work Expense Calculator", shortTitle: "Remote Work Expenses",
    description: "Understand the monthly and annual cost of working from home.", metaDescription: "Estimate annual remote work costs across internet, utilities, software, equipment, and workspace.",
    category: "Remote Work", icon: "home", color: "amber", usesCurrency: true, resultLabel: "Annual remote work cost",
    fields: [{ id: "internet", label: "Monthly internet share", kind: "currency", defaultValue: 50, min: 0 }, { id: "utilities", label: "Monthly utilities share", kind: "currency", defaultValue: 75, min: 0 }, { id: "software", label: "Monthly software", kind: "currency", defaultValue: 60, min: 0 }, { id: "workspace", label: "Annual workspace & equipment", kind: "currency", defaultValue: 1200, min: 0 }],
    intro: "Small recurring costs add up. Capture a realistic annual view of your remote setup.", disclaimer: "Tax deductibility varies by location and employment status. Keep records and consult local guidance.", faqs: commonFaqs("remote work expense calculator"),
    methodology: "Monthly internet, utility, and software shares are annualized, then combined with yearly workspace and equipment costs.", example: "Monthly remote costs of 185 total 2,220 per year. Adding 1,200 for equipment produces an estimated annual remote-work cost of 3,420.", tips: ["Use only the business share of mixed expenses.", "Separate recurring costs from equipment purchases.", "Keep receipts if you may claim deductions."],
  },
  {
    slug: "saas-cost-calculator", title: "SaaS Cost Calculator", shortTitle: "SaaS Cost",
    description: "See the true annual cost of your software stack and unused seats.", metaDescription: "Calculate monthly and annual SaaS spend, including potentially unused subscriptions.",
    category: "SaaS", icon: "cloud", color: "violet", usesCurrency: true, resultLabel: "Annual SaaS spend",
    fields: [{ id: "monthly", label: "Monthly subscriptions", kind: "currency", defaultValue: 240, min: 0 }, { id: "annual", label: "Annual-only subscriptions", kind: "currency", defaultValue: 500, min: 0 }, { id: "unusedRate", label: "Estimated unused spend", kind: "percent", suffix: "%", defaultValue: 15, min: 0, max: 100 }],
    intro: "A compact software stack can quietly become a major operating expense. Make the annual total visible.", disclaimer: "The unused-spend figure is an estimate; audit actual usage before cancelling essential services.", faqs: commonFaqs("SaaS cost calculator"),
    methodology: "Monthly subscriptions are multiplied by twelve and combined with annual plans. The estimated unused percentage highlights a potential optimization amount.", example: "A 240 monthly stack plus 500 in annual subscriptions costs 3,380 per year. At 15% estimated waste, about 507 may deserve review.", tips: ["Audit usage quarterly.", "Check for duplicate tools and unused seats.", "Compare annual discounts with cancellation flexibility."],
  },
  {
    slug: "billable-hours-calculator", title: "Billable Hours Calculator", shortTitle: "Billable Hours",
    description: "Estimate realistic annual billable capacity after leave, admin, and sales work.", metaDescription: "Estimate monthly and annual billable hours from your schedule and utilization rate.",
    category: "Business", icon: "calendar", color: "blue", usesCurrency: false, usesPublicHolidays: true, resultLabel: "Annual billable hours",
    fields: [{ id: "hoursWeek", label: "Working hours per week", kind: "number", defaultValue: 40, min: 1, max: 100 }, { id: "weeksOff", label: "Weeks off", kind: "number", defaultValue: 5, min: 0, max: 51 }, { id: "billableRate", label: "Billable utilization", kind: "percent", suffix: "%", defaultValue: 65, min: 1, max: 100 }],
    intro: "Not every working hour is billable. Plan capacity around the time your business actually needs.", disclaimer: "Use this as a capacity target and review it against your tracked time each month.", faqs: commonFaqs("billable hours calculator"),
    methodology: "Working weeks and weekly hours establish scheduled capacity. Optional weekday public holidays are removed before the billable utilization percentage is applied.", example: "At 40 hours a week, five weeks off, and 65% billable utilization, scheduled capacity becomes a smaller and more realistic billable-hours target.", tips: ["Track utilization monthly.", "Leave room for sales, administration, and learning.", "Avoid counting public holidays again if they are already included in time off."],
  },
  {
    slug: "late-payment-fee-calculator", title: "Late Payment Fee Calculator", shortTitle: "Late Payment Fee",
    description: "Estimate a transparent late fee based on the overdue amount, rate, and delay.", metaDescription: "Estimate a late payment fee based on invoice value, annual rate, and days overdue.",
    category: "Business", icon: "receipt", color: "green", usesCurrency: true, resultLabel: "Estimated late fee",
    fields: [{ id: "invoice", label: "Overdue invoice amount", kind: "currency", defaultValue: 3000, min: 0.01 }, { id: "annualRate", label: "Annual late interest rate", kind: "percent", suffix: "%", defaultValue: 8, min: 0.01, max: 100 }, { id: "days", label: "Days overdue", kind: "number", defaultValue: 30, min: 1, max: 3650 }],
    intro: "Calculate a proportional late fee that you can explain clearly to a client.", disclaimer: "Only charge fees permitted by your signed agreement and applicable law. This is not legal advice.", faqs: commonFaqs("late payment fee calculator"),
    methodology: "The tool uses simple daily interest: invoice amount multiplied by the annual rate, divided by 365, then multiplied by days overdue.", example: "A 3,000 invoice at 8% annual simple interest for 30 days produces an estimated fee of about 19.73.", tips: ["Only use rates allowed by the signed agreement and law.", "State late-payment terms before work begins.", "Communicate with the client before escalating collection."],
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
export const categories = [
  { name: "Income", description: "Rates and earnings", color: "blue" },
  { name: "Pricing", description: "Profitable proposals", color: "violet" },
  { name: "Business", description: "Operations and cash flow", color: "green" },
  { name: "Remote Work", description: "Home-office costs", color: "amber" },
  { name: "SaaS", description: "Software spend", color: "violet" },
] as const;
