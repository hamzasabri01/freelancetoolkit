import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FAQAccordion } from "@/components/FAQAccordion";
import { guides, getGuide } from "@/data/guides";
import { tools } from "@/data/tools";
import { homeFaqs } from "@/app/page";

describe("FAQ content rendering", () => {
  it("renders every homepage FAQ answer into static HTML", () => {
    const markup = renderToStaticMarkup(createElement(FAQAccordion, { items: homeFaqs }));

    for (const faq of homeFaqs) {
      expect(markup).toContain(faq.question);
      expect(markup).toContain(faq.answer);
    }
  });

  it("has question and answer text for every FAQ item", () => {
    const allFaqs = [
      ...homeFaqs,
      ...tools.flatMap((tool) => tool.faqs),
      ...guides.flatMap((guide) => guide.faqs),
    ];

    for (const faq of allFaqs) {
      expect(faq.question.trim().length).toBeGreaterThan(0);
      expect(faq.answer.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("guide generated block visibility", () => {
  it("does not add generated filler blocks to the main freelance pricing guide", () => {
    const guide = getGuide("how-much-should-i-charge-as-a-freelancer");

    expect(guide).toBeDefined();
    expect(guide?.examples).toHaveLength(0);
    expect(guide?.formulaCards).toHaveLength(0);
    expect(guide?.comparisonTables).toHaveLength(0);
    expect(guide?.commonMistakes).toHaveLength(0);
    expect(guide?.actionableTips).toHaveLength(0);
    expect(guide?.tableOfContents.map((item) => item.id)).not.toEqual(
      expect.arrayContaining(["practical-example", "formula", "comparison", "common-mistakes", "next-steps"]),
    );
  });
});
