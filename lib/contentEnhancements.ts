import type { ComparisonTableRow } from "@/components/ComparisonTable";
import type { ProcessStep } from "@/components/ProcessSteps";

export type GuideEnhancement = {
  takeaways: string[];
  scenarioTitle: string;
  scenario: string;
  formula?: { title: string; formula: string; description: string };
  comparison?: { title: string; leftLabel: string; rightLabel: string; rows: ComparisonTableRow[] };
  mistakes: string[];
  actionTips: string[];
  relatedGuideSlugs: string[];
};

export type ToolEnhancement = {
  formula: { title: string; formula: string; description: string };
  mistakes: string[];
  relatedGuideSlugs: string[];
  dataNote?: string;
};

const pricingComparison = {
  title: "Hourly pricing vs fixed project pricing",
  leftLabel: "Hourly",
  rightLabel: "Fixed project",
  rows: [
    { label: "Best fit", left: "Open-ended scope, support, discovery, or changing requirements.", right: "Defined deliverables, clear boundaries, and measurable acceptance criteria." },
    { label: "Main risk", left: "Client may focus on hours instead of outcomes.", right: "Scope creep can consume margin if assumptions are vague." },
    { label: "Control", left: "Easier to adjust as work changes.", right: "Requires stronger scope, change rules, and pricing discipline." },
  ],
};

export const guideEnhancements: Record<string, GuideEnhancement> = {
  "how-much-should-i-charge-as-a-freelancer": {
    takeaways: [
      "Calculate a baseline rate from income goals, business expenses, tax planning buffer, profit buffer, and realistic billable hours.",
      "Use the baseline as a floor, then adjust for skill, demand, urgency, risk, project value, and positioning.",
      "Freelance pricing becomes clearer when you separate hourly rate, day rate, and project pricing decisions.",
    ],
    scenarioTitle: "A $101.25/hour baseline from realistic assumptions",
    scenario: "A freelancer wants $80,000 in desired income, expects $10,000 in annual expenses, adds a 25% tax planning buffer, adds a 10% profit or safety buffer, and estimates 1,200 billable hours per year. The planning revenue target becomes $121,500, which produces a baseline rate of $101.25/hour before market positioning adjustments.",
    formula: { title: "Simple freelance rate formula", formula: "Hourly Rate = (Target Income + Business Expenses + Tax Buffer + Profit Buffer) / Annual Billable Hours", description: "Use this as a planning baseline. It is not tax, legal, or financial advice, and it should be adjusted for positioning, project value, risk, and demand." },
    comparison: {
      title: "Hourly pricing vs project pricing",
      leftLabel: "Hourly pricing",
      rightLabel: "Project pricing",
      rows: [
        { label: "Best fit", left: "Good for uncertain scope, advisory work, support, and exploratory projects.", right: "Good for clear deliverables, defined timelines, and measurable outcomes." },
        { label: "Client clarity", left: "Easy to explain because time maps directly to cost.", right: "Easy to buy when the deliverables and boundaries are clear." },
        { label: "Upside", left: "Can limit upside because faster delivery may reduce billable time.", right: "Can reward efficiency and expertise when scope is controlled." },
        { label: "Main risk", left: "Client may focus on hours instead of value.", right: "Scope creep can reduce margin without change-request rules." },
      ],
    },
    mistakes: ["Copying competitors blindly without knowing their costs, positioning, or utilization.", "Ignoring non-billable time such as sales, admin, learning, and communication.", "Forgetting taxes or treating gross revenue as personal income.", "Not charging or setting boundaries for revisions and extra meetings.", "Pricing every client the same even when risk, urgency, and value differ.", "Reducing rate without reducing scope, timeline pressure, or deliverables.", "Confusing salary with freelance income and ignoring business costs."],
    actionTips: ["Calculate a baseline before checking competitor rates.", "Use the billable-hours calculator to estimate real capacity.", "Set a target hourly rate and a minimum acceptable rate.", "Package services so scope, outcomes, and revision limits are easier to understand.", "Increase rates for new clients first when testing positioning.", "Review rates quarterly using utilization, demand, expenses, and project outcomes."],
    relatedGuideSlugs: ["how-to-calculate-your-freelance-hourly-rate", "how-to-price-a-freelance-project", "what-are-billable-hours"],
  },
  "how-to-calculate-your-freelance-hourly-rate": {
    takeaways: [
      "A freelance hourly rate should be based on revenue needed and realistic billable hours, not salary divided by working hours.",
      "Expenses, tax planning, safety margin, vacation time, admin work, and sales time all affect the rate.",
      "The calculated number is a baseline; market value, project risk, and positioning decide the final client-facing rate.",
    ],
    scenarioTitle: "A $101.86/hour baseline from a step-by-step calculation",
    scenario: "A freelancer wants $75,000 in desired income, expects $8,000 in expenses, adds a 25% tax planning buffer, adds a 10% profit or safety buffer, and estimates 1,100 billable hours. The total annual revenue needed is $112,050, which creates a baseline hourly rate of $101.86 before market and value adjustments.",
    formula: { title: "Freelance hourly rate formula", formula: "Hourly Rate = Total Annual Revenue Needed / Annual Billable Hours", description: "Total Annual Revenue Needed = Desired Income + Expenses + Tax Buffer + Profit Buffer. This is a planning method, not tax, legal, or financial advice." },
    mistakes: ["Using salary divided by 2,080 as the freelance rate.", "Ignoring unpaid work such as proposals, admin, communication, and learning.", "Forgetting expenses or treating gross revenue as personal income.", "Setting rates emotionally instead of using assumptions.", "Not revising rates as skills, demand, and costs change.", "Using one rate for all projects regardless of risk, urgency, or value.", "Not building margin for slow periods, late payments, and reinvestment."],
    actionTips: ["Write down desired income and business expenses before choosing a rate.", "Use conservative billable-hours assumptions.", "Run minimum and target scenarios in the calculator.", "Compare the baseline with project value and market positioning.", "Convert the baseline into a day rate or project price when the work is not best sold hourly.", "Review the rate quarterly as utilization, demand, and expenses change."],
    relatedGuideSlugs: ["how-much-should-i-charge-as-a-freelancer", "common-freelance-expenses", "what-are-billable-hours"],
  },
  "salary-to-hourly-rate-explained": {
    takeaways: [
      "Salary-to-hourly conversion divides annual salary by total paid hours, usually weekly hours multiplied by paid weeks.",
      "The result is a gross hourly equivalent, not take-home pay and not a complete benefits comparison.",
      "Salary hourly rate can provide context, but it should not be copied directly into freelance or contractor pricing.",
    ],
    scenarioTitle: "Three salary-to-hourly examples",
    scenario: "$50,000 at 40 hours/week and 52 weeks equals $24.04/hour. $80,000 at 37.5 hours/week and 52 weeks equals $41.03/hour. $100,000 at 40 hours/week and 48 working weeks equals $52.08/working hour. The formula is simple, but the schedule assumption changes the result.",
    formula: { title: "Salary to hourly", formula: "Annual salary ÷ (weekly hours × paid weeks)", description: "Use paid weeks when salary continues during leave. Use fewer weeks only for unpaid or seasonal arrangements." },
    comparison: {
      title: "Salary hourly equivalent vs freelance hourly rate",
      leftLabel: "Salary equivalent",
      rightLabel: "Freelance rate",
      rows: [
        { label: "Includes", left: "Gross salary divided by paid hours.", right: "Revenue needed to cover pay, costs, taxes, and unpaid business time." },
        { label: "Missing context", left: "Benefits, overtime, and deductions.", right: "Client acquisition, gaps, risk, and scope boundaries." },
        { label: "Best use", left: "Comparing employment offers.", right: "Planning sustainable client pricing." },
      ],
    },
    mistakes: ["Removing paid vacation from paid weeks when salary still continues.", "Comparing gross salary directly with net contractor earnings.", "Ignoring regular overtime when calculating the real hourly equivalent."],
    actionTips: ["Use actual contracted hours where possible.", "Add benefits separately.", "Use the contractor comparison calculator for broader decisions."],
    relatedGuideSlugs: ["contractor-vs-employee", "how-to-calculate-your-freelance-hourly-rate", "what-are-billable-hours"],
  },
  "contractor-vs-employee": {
    takeaways: [
      "Compare annual packages, not only hourly rate versus salary.",
      "Contractor revenue must fund expenses, unpaid time, benefits, and risk.",
      "Legal classification and tax treatment are separate professional questions.",
    ],
    scenarioTitle: "A contract rate that looks higher but carries more cost",
    scenario: "A contractor may bill a higher hourly rate than an employee earns, but fewer billable hours, software costs, insurance, unpaid leave, and gaps between projects can reduce the advantage. A fair comparison annualizes both options before deciding.",
    formula: { title: "Contractor advantage", formula: "(Rate × billable hours - expenses) - (salary + benefits)", description: "This is a simplified value comparison. It intentionally avoids tax and legal classification assumptions." },
    comparison: {
      title: "Contractor vs employee decision context",
      leftLabel: "Contractor",
      rightLabel: "Employee",
      rows: [
        { label: "Income pattern", left: "Often variable and dependent on signed work.", right: "Usually more predictable if employment continues." },
        { label: "Costs", left: "Business tools, insurance, admin, and sales time.", right: "Many tools and benefits may be employer-provided." },
        { label: "Control", left: "Potentially more autonomy over clients and schedule.", right: "Often clearer structure, support, and internal career path." },
      ],
    },
    mistakes: ["Assuming every working hour is billable.", "Overvaluing benefits you would not use.", "Ignoring classification rules and contract terms."],
    actionTips: ["Build a conservative billable-hours estimate.", "Separate personal preference from financial comparison.", "Ask a qualified professional about classification and tax questions."],
    relatedGuideSlugs: ["salary-to-hourly-rate-explained", "common-freelance-expenses", "what-are-billable-hours"],
  },
  "how-to-price-a-freelance-project": {
    takeaways: [
      "A fixed price depends on defined scope, assumptions, and change rules.",
      "Contingency protects against uncertainty; it is not permission for unlimited scope.",
      "Profit margin should be intentional, not whatever remains after delivery gets messy.",
    ],
    scenarioTitle: "Pricing a defined website refresh",
    scenario: "For a defined project, estimate discovery, production, review, project management, and handover hours. Add direct costs, apply contingency for uncertainty, then set a price that leaves margin after delivery. The quote should explain outcomes and boundaries, not just hours.",
    formula: { title: "Fixed project price", formula: "((Hours × internal rate) + direct costs) × contingency factor ÷ (1 - profit margin)", description: "Margin calculated on selling price is different from a simple cost markup. Use the same method consistently." },
    comparison: pricingComparison,
    mistakes: ["Pricing before scope is documented.", "Forgetting review rounds, meetings, or handover.", "Using contingency as a substitute for change-request rules."],
    actionTips: ["Write assumptions into the proposal.", "Separate optional add-ons from base scope.", "Review actual project hours after delivery."],
    relatedGuideSlugs: ["how-much-should-i-charge-as-a-freelancer", "how-to-create-a-professional-invoice", "what-are-billable-hours"],
  },
  "how-to-create-a-professional-invoice": {
    takeaways: [
      "A professional invoice should be easy for a client and finance team to approve.",
      "Line items should connect back to the agreement, deliverable, or approved time period.",
      "Tax and late-fee rules depend on location and contract terms.",
    ],
    scenarioTitle: "A clean invoice for project milestone work",
    scenario: "A freelancer billing a milestone should include the client details, invoice number, issue date, due date, project reference, line-item description, subtotal, discount if any, tax if applicable, and payment instructions. The goal is to reduce back-and-forth and preserve a reliable record.",
    formula: { title: "Invoice total", formula: "(Quantity × rate - discount) × (1 + tax rate)", description: "Only apply tax when it is appropriate for your registration, client, location, and service." },
    comparison: {
      title: "Weak invoice vs professional invoice",
      leftLabel: "Weak invoice",
      rightLabel: "Professional invoice",
      rows: [
        { label: "Details", left: "Vague service description and missing references.", right: "Clear line items tied to scope, period, or deliverables." },
        { label: "Payment", left: "Unclear method, due date, or currency.", right: "Currency, due date, method, and reference instructions included." },
        { label: "Records", left: "Hard to reconcile later.", right: "Consistent numbering and supporting documentation." },
      ],
    },
    mistakes: ["Reusing invoice numbers.", "Adding tax without confirming whether it applies.", "Using late-fee wording that was not in the agreement."],
    actionTips: ["Use a consistent invoice numbering system.", "Keep the agreement and supporting records with the invoice.", "Send polite reminders before escalation."],
    relatedGuideSlugs: ["how-to-price-a-freelance-project", "common-freelance-expenses", "contractor-vs-employee"],
  },
  "common-freelance-expenses": {
    takeaways: [
      "Recurring, annual, and replacement costs all belong in your rate planning.",
      "Mixed-use expenses should be estimated conservatively for planning.",
      "Expense tracking improves pricing decisions even when tax treatment is separate.",
    ],
    scenarioTitle: "The quiet cost of a small freelance stack",
    scenario: "A freelancer may spend on internet share, design software, cloud storage, accounting software, insurance, hardware replacement, payment fees, and training. Each item can seem small monthly, but together they create the operating cost your rates must recover.",
    formula: { title: "Annual expense planning", formula: "(Monthly recurring costs × 12) + annual costs + replacement budget", description: "This is a planning total, not a tax deduction calculation." },
    comparison: {
      title: "Expense planning categories",
      leftLabel: "Recurring",
      rightLabel: "Occasional",
      rows: [
        { label: "Examples", left: "Software, internet share, payment tools, cloud services.", right: "Laptop replacement, training, legal review, equipment." },
        { label: "Risk", left: "Subscription creep and unused seats.", right: "Large purchases forgotten until cash flow is tight." },
        { label: "Planning method", left: "Review monthly or quarterly.", right: "Annualize expected replacement cost." },
      ],
    },
    mistakes: ["Leaving business tools out of rate planning.", "Treating all personal costs as business costs.", "Waiting until renewal dates to review subscriptions."],
    actionTips: ["Keep a simple annual expense register.", "Audit SaaS usage quarterly.", "Separate tax questions from business planning."],
    relatedGuideSlugs: ["how-much-should-i-charge-as-a-freelancer", "contractor-vs-employee", "how-to-create-a-professional-invoice"],
  },
  "what-are-billable-hours": {
    takeaways: [
      "Billable hours are client-chargeable hours defined by the agreement.",
      "Non-billable work is necessary and must be funded through rates or margins.",
      "Utilization turns available capacity into a realistic revenue estimate.",
    ],
    scenarioTitle: "Why a 40-hour week may become 26 billable hours",
    scenario: "A freelancer might work 40 hours in a week, but sales calls, admin, proposal writing, bookkeeping, learning, and internal systems may consume time that cannot be invoiced to a client. Planning around billable utilization makes revenue expectations more realistic.",
    formula: { title: "Billable capacity", formula: "(Available working hours - holiday hours) × billable utilization", description: "Use tracked history when possible. Avoid counting leave and holidays twice." },
    comparison: {
      title: "Billable vs non-billable work",
      leftLabel: "Billable",
      rightLabel: "Non-billable",
      rows: [
        { label: "Typical activities", left: "Approved delivery, client meetings, research, revisions.", right: "Sales, admin, marketing, bookkeeping, internal systems." },
        { label: "Revenue effect", left: "Can usually be charged under the agreement.", right: "Must be funded by pricing and margin." },
        { label: "Management goal", left: "Track accurately and invoice clearly.", right: "Plan honestly and reduce waste where possible." },
      ],
    },
    mistakes: ["Assuming every hour at the desk is billable.", "Not defining billable meeting or revision time.", "Using utilization targets that ignore sales and admin reality."],
    actionTips: ["Track billable and non-billable time separately.", "Clarify billable activities in the agreement.", "Review utilization monthly, not only at year end."],
    relatedGuideSlugs: ["how-to-calculate-your-freelance-hourly-rate", "how-to-price-a-freelance-project", "common-freelance-expenses"],
  },
};

export const toolEnhancements: Record<string, ToolEnhancement> = {
  "freelance-hourly-rate-calculator": {
    formula: guideEnhancements["how-to-calculate-your-freelance-hourly-rate"].formula!,
    mistakes: ["Entering a desired salary but leaving business expenses at zero.", "Using 100% billable utilization.", "Forgetting leave, holidays, and admin time."],
    relatedGuideSlugs: ["how-to-calculate-your-freelance-hourly-rate", "how-much-should-i-charge-as-a-freelancer"],
    dataNote: "This tool can optionally use Nager.Date public holiday data, with an internal estimate if live data is unavailable.",
  },
  "salary-to-hourly-calculator": {
    formula: guideEnhancements["salary-to-hourly-rate-explained"].formula!,
    mistakes: ["Removing paid vacation even when the salary is paid year-round.", "Ignoring regular overtime.", "Comparing the result directly with freelance rates."],
    relatedGuideSlugs: ["salary-to-hourly-rate-explained", "contractor-vs-employee"],
  },
  "hourly-to-salary-calculator": {
    formula: { title: "Hourly to annual", formula: "Hourly rate × weekly hours × working weeks", description: "This estimates gross annual income before taxes, benefits, and unpaid time adjustments." },
    mistakes: ["Using 52 weeks when the work includes unpaid leave.", "Treating gross annual income as take-home pay.", "Ignoring benefits or business expenses in comparisons."],
    relatedGuideSlugs: ["salary-to-hourly-rate-explained", "contractor-vs-employee"],
  },
  "contractor-vs-employee-calculator": {
    formula: guideEnhancements["contractor-vs-employee"].formula!,
    mistakes: guideEnhancements["contractor-vs-employee"].mistakes,
    relatedGuideSlugs: ["contractor-vs-employee", "common-freelance-expenses"],
  },
  "project-pricing-calculator": {
    formula: guideEnhancements["how-to-price-a-freelance-project"].formula!,
    mistakes: guideEnhancements["how-to-price-a-freelance-project"].mistakes,
    relatedGuideSlugs: ["how-to-price-a-freelance-project", "how-much-should-i-charge-as-a-freelancer"],
  },
  "invoice-generator": {
    formula: guideEnhancements["how-to-create-a-professional-invoice"].formula!,
    mistakes: guideEnhancements["how-to-create-a-professional-invoice"].mistakes,
    relatedGuideSlugs: ["how-to-create-a-professional-invoice", "how-to-price-a-freelance-project"],
  },
  "remote-work-expense-calculator": {
    formula: guideEnhancements["common-freelance-expenses"].formula!,
    mistakes: ["Counting the full personal internet bill instead of a business share.", "Forgetting annual equipment replacement.", "Mixing tax deductibility with planning assumptions."],
    relatedGuideSlugs: ["common-freelance-expenses", "how-much-should-i-charge-as-a-freelancer"],
  },
  "saas-cost-calculator": {
    formula: { title: "Annual SaaS spend", formula: "(Monthly subscriptions × 12) + annual subscriptions", description: "Unused spend is shown as a review signal, not an instruction to cancel critical tools." },
    mistakes: ["Forgetting annual-only plans.", "Keeping duplicate tools for the same workflow.", "Cancelling essential tools without checking usage."],
    relatedGuideSlugs: ["common-freelance-expenses", "how-much-should-i-charge-as-a-freelancer"],
  },
  "billable-hours-calculator": {
    formula: guideEnhancements["what-are-billable-hours"].formula!,
    mistakes: guideEnhancements["what-are-billable-hours"].mistakes,
    relatedGuideSlugs: ["what-are-billable-hours", "how-to-calculate-your-freelance-hourly-rate"],
    dataNote: "This tool can optionally exclude weekday public holidays using Nager.Date data or the internal fallback estimate.",
  },
  "late-payment-fee-calculator": {
    formula: { title: "Simple late fee estimate", formula: "Invoice amount × annual rate ÷ 365 × days overdue", description: "Only use fees permitted by your agreement and applicable law." },
    mistakes: ["Charging a fee that was not agreed in advance.", "Using compound interest when the agreement only allows simple interest.", "Escalating before confirming payment instructions and invoice receipt."],
    relatedGuideSlugs: ["how-to-create-a-professional-invoice", "how-to-price-a-freelance-project"],
  },
};

export const homepageSteps: ProcessStep[] = [
  { title: "Choose a calculator", description: "Start with the decision you need to make: rate, salary comparison, project price, invoice total, expenses, or billable capacity." },
  { title: "Enter realistic assumptions", description: "Use your own costs, hours, time off, utilization, and currency. Results update instantly as assumptions change." },
  { title: "Read the context", description: "Use the methodology, mistakes, and related guides to understand what the number can and cannot tell you." },
];
