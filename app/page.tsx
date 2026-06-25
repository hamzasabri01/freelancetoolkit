import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Calculator, Clock3, FileText, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HeroSection } from "@/components/HeroSection";
import { guides } from "@/data/guides";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata(siteConfig.defaultTitle, siteConfig.description, "/");

const startingPoints = [
  {
    title: "I need an hourly rate",
    description: "Estimate a sustainable hourly rate using income goals, expenses, taxes, time off, and billable hours.",
    cta: "Calculate my rate",
    href: "/tools/freelance-hourly-rate-calculator",
    icon: Calculator,
  },
  {
    title: "I need to know my billable time",
    description: "Understand how much of your working time can realistically be billed to clients.",
    cta: "Estimate billable hours",
    href: "/tools/billable-hours-calculator",
    icon: Clock3,
  },
  {
    title: "I want to compare salary and freelance income",
    description: "Convert annual salary into hourly equivalents and compare it with freelance pricing.",
    cta: "Convert salary",
    href: "/tools/salary-to-hourly-calculator",
    icon: WalletCards,
  },
  {
    title: "I need to price a fixed project",
    description: "Estimate project fees using time, scope, expenses, and profit margin.",
    cta: "Price a project",
    href: "/tools/project-pricing-calculator",
    icon: BriefcaseBusiness,
  },
];

const workflowSteps = [
  { title: "Start with your income goal", href: "/tools/freelance-hourly-rate-calculator", cta: "Open calculator" },
  { title: "Add taxes, expenses, and time off", href: "/guides/freelance-hourly-rate-with-taxes-and-expenses", cta: "Read rate guide" },
  { title: "Estimate realistic billable hours", href: "/tools/billable-hours-calculator", cta: "Estimate billable hours" },
  { title: "Compare hourly and project pricing", href: "/guides/hourly-rate-vs-project-pricing", cta: "Compare pricing models" },
  { title: "Review related guides before quoting", href: "/guides/freelance-pricing", cta: "Read pricing guide" },
];

const pricingBasics = [
  {
    title: "Salary shortcuts miss freelance costs",
    copy: "Freelancer pricing is not the same as employee salary. Your rate needs to fund expenses, unpaid time, taxes, and business risk.",
    href: "/guides/how-to-calculate-your-freelance-hourly-rate",
  },
  {
    title: "Not every working hour is billable",
    copy: "Admin work, proposals, sales calls, revisions, and learning reduce the hours you can charge to clients.",
    href: "/guides/how-many-billable-hours-should-a-freelancer-work",
  },
  {
    title: "Taxes and expenses need room",
    copy: "Software, equipment, payment fees, insurance, and tax planning assumptions should be visible before you quote.",
    href: "/guides/freelance-hourly-rate-with-taxes-and-expenses",
  },
  {
    title: "Project pricing works when scope is clear",
    copy: "A fixed project fee can be better than hourly pricing when deliverables, revisions, timeline, and assumptions are defined.",
    href: "/guides/hourly-rate-vs-project-pricing",
  },
];

const guideCards = [
  {
    title: "Freelance Pricing Guide",
    description: "A central guide to rates, billable hours, project pricing, salary comparisons, and invoice-ready payment terms.",
    label: "Pricing hub",
    href: "/guides/freelance-pricing",
  },
  ..."how-much-should-i-charge-as-a-freelancer,how-to-calculate-your-freelance-hourly-rate,how-many-billable-hours-should-a-freelancer-work,billable-hours-vs-non-billable-hours,freelance-hourly-rate-with-taxes-and-expenses,hourly-rate-vs-project-pricing"
    .split(",")
    .map((slug) => {
      const guide = guides.find((item) => item.slug === slug);
      return {
        title: guide?.title ?? slug,
        description: guide?.excerpt ?? "",
        label: guide?.category ?? "Guide",
        href: `/guides/${slug}`,
      };
    }),
];

const trustPoints = [
  ["Free to use", "Use calculators and guides without paying or creating an account."],
  ["No account required", "Get planning estimates quickly without a signup flow."],
  ["Privacy-friendly calculations", "Calculator entries are not stored in an account database."],
  ["Practical formulas", "Each result is paired with explanations and assumptions."],
  ["Built for independent work", "Designed for freelancers, consultants, contractors, and remote workers."],
];

const useCases = ["Freelance developers", "Designers", "Writers", "Consultants", "Marketers", "Virtual assistants", "Remote workers", "Independent contractors"];

export const homeFaqs = [
  { question: "Are Freelance Work Tools calculators free?", answer: "Yes. The calculators are free to use and do not require an account." },
  { question: "Do the calculators save my financial information?", answer: "No. Calculator entries are processed for estimates and are not stored in an account database." },
  { question: "Which calculator should I start with?", answer: "If you are setting rates, start with the Freelance Hourly Rate Calculator. If you already know your rate but need capacity or project pricing, use the Billable Hours Calculator or Project Pricing Calculator." },
  { question: "Can I use the results in a client proposal?", answer: "You can use the results as planning inputs, but review the assumptions and adapt them to your scope, market, taxes, and client agreement." },
  { question: "Are these calculators financial or tax advice?", answer: "No. They provide educational planning estimates only and are not financial, legal, accounting, employment, or tax advice." },
];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.icons.icon}`,
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const schemas = [organizationSchema, websiteSchema, faqSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}

      <HeroSection />

      <section className="section-wrap py-14 sm:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="section-kicker">Choose your starting point</p>
          <h2 className="section-title">Different freelance pricing questions need different tools</h2>
          <p className="section-copy">Start with the calculator that matches your situation, then use the related guides to understand the assumptions before you quote.</p>
        </div>
        <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          {startingPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} style={{ animationDelay: `${index * 70}ms` }} className="home-rise group flex min-h-[276px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.03)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                <div className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand transition group-hover:scale-105 group-hover:bg-brand group-hover:text-white">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold leading-6 text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-brand">{item.cta} <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-surface-soft py-14 sm:py-20">
        <div className="section-wrap">
          <div className="mb-8 max-w-3xl">
            <p className="section-kicker">Pricing workflow</p>
            <h2 className="section-title">A simple workflow for better freelance pricing</h2>
            <p className="section-copy">Move from raw assumptions to a clearer quote by checking income, costs, capacity, pricing model, and guide context in order.</p>
          </div>
          <div className="relative grid items-stretch gap-4 lg:grid-cols-5">
            <div className="absolute left-6 right-6 top-8 hidden h-px bg-blue-100 lg:block" aria-hidden="true" />
            {workflowSteps.map((step, index) => (
              <Link key={step.href} href={step.href} className="group relative flex min-h-[190px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-5 min-h-12 font-display text-base font-bold leading-6 text-ink group-hover:text-brand">{step.title}</h3>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-brand">{step.cta} <ArrowRight size={13} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-kicker">Freelance pricing basics</p>
            <h2 className="section-title">Beginners often miss the costs behind the rate</h2>
            <p className="section-copy">Freelance pricing is a business model in miniature. You are not only replacing a salary; you are funding operations, sales time, admin, revisions, unpaid leave, and risk.</p>
            <Link href="/guides/freelance-pricing" className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg px-1 text-sm font-bold text-brand transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
              Read the full pricing guide <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid items-stretch gap-4 sm:grid-cols-2">
            {pricingBasics.map((item) => (
              <Link key={item.href} href={item.href} className="group flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{item.copy}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-brand">Read guide <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-surface-soft py-14 sm:py-20">
        <div className="section-wrap">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Popular guides</p>
              <h2 className="section-title">Popular guides for smarter freelance pricing</h2>
              <p className="section-copy">Short paths into the topics that usually change the final number: rates, billable hours, expenses, taxes, and pricing model.</p>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-brand">All guides <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guideCards.map((guide) => (
              <Link key={guide.href} href={guide.href} className="group flex min-h-[286px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                <span className="self-start rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">{guide.label}</span>
                <h3 className="mt-4 font-display text-lg font-bold leading-6 text-ink group-hover:text-brand">{guide.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{guide.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-brand">Read guide <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap py-14 sm:py-20">
        <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#172554)] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,.18)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.16em] text-blue-300">Trust and privacy</p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">Built for practical estimates, not fake precision</h2>
              <p className="mt-4 text-sm leading-6 text-white/60">These tools provide planning estimates only. They are not financial, legal, accounting, employment, or tax advice.</p>
            </div>
            <div className="grid items-stretch gap-3 sm:grid-cols-2">
              {trustPoints.map(([title, copy]) => (
                <div key={title} className="flex min-h-[142px] flex-col rounded-2xl border border-white/10 bg-white/[.05] p-4">
                  <ShieldCheck size={18} className="text-blue-300" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/50">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap py-10 sm:py-14">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles size={18} className="text-brand" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-ink">Useful for</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {useCases.map((useCase) => (
            <span key={useCase} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink-soft shadow-sm">{useCase}</span>
          ))}
        </div>
      </section>

      <section className="section-wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title">Straight answers</h2>
          <p className="section-copy">Quick answers about how the calculators work, privacy, and how to use the estimates.</p>
        </div>
        <FAQAccordion items={homeFaqs} />
      </section>

      <section className="section-wrap pb-16 sm:pb-20">
        <div className="rounded-[1.75rem] border border-blue-100 bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_55%),linear-gradient(135deg,#ffffff,#eff6ff)] p-7 text-center shadow-sm sm:p-10">
          <FileText className="mx-auto text-brand" size={28} aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Start with one clear estimate</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink-muted">Choose a calculator, enter your assumptions, and use the result as a starting point for smarter freelance pricing.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/tools/freelance-hourly-rate-calculator" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,.24)] transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Start with hourly rate calculator <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/guides" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-ink-soft transition hover:border-brand hover:bg-brand-soft hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Browse all guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
