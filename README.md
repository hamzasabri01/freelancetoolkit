# FreelanceToolKit

A production-oriented Next.js App Router website for practical freelance and independent-work calculators.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS
- Typed calculator configurations in `data/tools.ts`
- Formula modules in `lib/calculators/`
- Static, crawlable calculator and content routes

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so canonical URLs, sitemap entries, and robots metadata use the correct domain.

```bash
npm run typecheck
npm run build
npm start
```

The current calculators run fully in the browser. There is no backend and calculator entries are not persisted.
