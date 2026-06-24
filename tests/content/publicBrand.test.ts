import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const publicSourceRoots = ["app", "components", "data", "lib", "public"];
const kit = String.fromCharCode(84, 111, 111, 108, 75, 105, 116);
const oldPublicBrandPatterns = [
  `Freelance${kit}`,
  `Freelance ${kit}`,
  kit,
];

function collectFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);
    return stat.isDirectory() ? collectFiles(path) : [path];
  });
}

describe("public brand references", () => {
  it("does not expose the old public brand in UI, SEO, schema, or public assets", () => {
    const files = publicSourceRoots.flatMap((root) => collectFiles(root));
    const matches = files.flatMap((file) => {
      const content = readFileSync(file, "utf8");
      return oldPublicBrandPatterns
        .filter((pattern) => content.includes(pattern))
        .map((pattern) => `${relative(process.cwd(), file)} contains ${pattern}`);
    });

    expect(matches).toEqual([]);
  });
});
