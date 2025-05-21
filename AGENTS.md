This repository hosts the Benched.ai Astro site.
`pnpm install` was already run so you don't need to run it again.

## Development Workflow

- `pnpm run lint` to check for errors. `pnpm run dev` for local development. Run `pnpm run build` to ensure the site compiles before pushing changes.
- Keep the codebase minimal and follow the existing project structure under `src/` and `public/`.
- Prefer creating reusable components in `src/components/` when adding UI elements.
- Use `title:` frontmatter for page titles instead of `export const title` on Astro pages.

## Planning and Documentation

- For larger changes, always write a plan in the `plan/` directory with detailed steps that you can review to follow your tasks, and instructions so you can review it as you work.
- Review `release-notes.md` to understand prior work. After each pull request, append a concise 1–2 sentence summary of the new capabilities or fixes to that file.

## Pull Requests

- Keep pull requests focused and include relevant context in the description.
- Ensure the project builds (`pnpm run build`) before submitting a PR.
