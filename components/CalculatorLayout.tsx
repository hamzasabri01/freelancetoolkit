import type { Tool } from "@/data/tools";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorForm } from "@/components/CalculatorForm";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { ToolVisual } from "@/components/ToolVisual";
import type { ExchangeRateData } from "@/lib/api/exchangeRates";
import type { HolidayDataByYear } from "@/lib/api/publicHolidays";

export function CalculatorLayout({ tool, exchangeRates, holidayData }: { tool: Tool; exchangeRates?: ExchangeRateData; holidayData?: HolidayDataByYear }) {
  return <>
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-surface-soft shadow-card sm:rounded-2xl">
      <header className="border-b border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-7">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: tool.shortTitle }]} />
        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">{tool.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted sm:text-[15px]">{tool.description}</p>
          </div>
          <ToolVisual tool={tool} />
        </div>
      </header>
      <CalculatorForm tool={tool} exchangeRates={exchangeRates} holidayData={holidayData} />
    </article>
    <div className="mt-5"><DisclaimerBox>This tool provides estimates only and should not be considered financial, tax, legal, or professional advice. {tool.disclaimer}</DisclaimerBox></div>
  </>;
}
