# Plan: Create placeholder MDX files for all models

## Objective
Generate a `.mdx` content file for every unique model listed in `modelNames`. These placeholder files allow future expansion with richer content.

## Steps
1. Read model names from `src/data/models.ts`.
2. Generate URL slugs using the existing `slugify` logic.
3. For each unique slug, create `src/content/models/<slug>.mdx` containing a heading with the model name.
4. Run `pnpm run lint` and `pnpm run build` to ensure the project compiles.
5. Add a release note summarizing the creation of MDX model files.
