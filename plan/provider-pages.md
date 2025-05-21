# Plan: Provider detail pages

## Goal
Create a template for provider pages with predefined sections and add Markdown
files for each provider so content can be expanded later.

## Steps
1. Update `src/pages/providers/[provider].astro`.
   - Load provider info from `providers.ts`.
   - Dynamically import Markdown from `src/content/providers/{slug}.md` using
     `import.meta.glob`.
   - Render the Markdown if it exists followed by section headings:
     "Intelligence Evaluations", "Context Window", "JSON Mode & Function Calling",
     "Pricing", "Performance Summary", "Speed", "Latency",
     "End-to-End Response Time".
   - Provide placeholder paragraphs for now.
2. Generate Markdown files for every provider listed in `providers.ts` in the
   `src/content/providers/` directory. Each file should have a top-level heading
   with the provider name and a short placeholder sentence.
3. Run `pnpm run lint` and `pnpm run build` to ensure the site compiles.
4. Update `release-notes.md` with a summary of the new provider pages.
