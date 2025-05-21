# Plan: Add assistant pages

## Objective
Create a list of AI assistant pages on the site similar to the providers section. Each assistant should have its own page generated from data.

## Steps
1. Create `src/data/assistants.ts` containing slug and name for each assistant.
2. Update `src/pages/assistants/index.astro` to import this data and list assistants with links.
3. Add placeholder Markdown files under `src/content/assistants` for each assistant.
4. Update `src/pages/assistants/[assistant].astro` to load these Markdown files when available.
5. Run `pnpm run lint` and `pnpm run build` to verify the site compiles.
6. Update `release-notes.md` with a short summary of the new assistant pages.
