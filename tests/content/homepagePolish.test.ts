import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { homeFaqs } from "@/app/page";

const homepageSource = readFileSync("app/page.tsx", "utf8");
const toolPageSource = readFileSync("app/tools/[slug]/page.tsx", "utf8");

describe("homepage polish regressions", () => {
  it("does not render Free as part of the public logo brand", () => {
    const logo = renderToStaticMarkup(createElement(Logo));
    const inverseLogo = renderToStaticMarkup(createElement(Logo, { inverse: true }));

    expect(logo).toContain("Freelance");
    expect(logo).toContain("Work Tools");
    expect(logo).not.toContain(">Free<");
    expect(logo).not.toContain("Freelance Work Tools Free");
    expect(inverseLogo).not.toContain(">Free<");
  });

  it("does not place free copy next to the footer brand", () => {
    const footer = renderToStaticMarkup(createElement(Footer));

    expect(footer).toContain("Freelance");
    expect(footer).toContain("Work Tools");
    expect(footer).not.toContain("Freelance Work Tools Free");
    expect(footer).not.toContain("Clear, free tools");
  });

  it("keeps homepage FAQ copy user-facing", () => {
    expect(homepageSource).toContain("Quick answers about how the calculators work, privacy, and how to use the estimates.");
    expect(homepageSource).not.toContain("Every FAQ answer is rendered in the HTML");
    expect(homeFaqs.every((faq) => faq.question.trim() && faq.answer.trim())).toBe(true);
  });

  it("uses contextual workflow CTA labels", () => {
    expect(homepageSource).toContain('cta: "Open calculator"');
    expect(homepageSource).toContain('cta: "Estimate billable hours"');
    expect(homepageSource).toContain('cta: "Compare pricing models"');
    expect(homepageSource).toContain('cta: "Read pricing guide"');
    expect(homepageSource).not.toContain("Open next step");
  });

  it("renders clean how-to-use step numbers on tool pages", () => {
    expect(toolPageSource).toContain('number: "01"');
    expect(toolPageSource).toContain('number: "02"');
    expect(toolPageSource).toContain('number: "03"');
    expect(toolPageSource).not.toContain("0{index + 1}");
    expect(toolPageSource).not.toContain('AdSlot position="sidebar"');
  });
});
