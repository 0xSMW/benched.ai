# Plan: Add AI Model Pages

## Objective
Create individual pages for all AI models listed in the user request. Pages will be generated dynamically using a models data file and slugify helper. The index page will link to each model.

## Steps
1. **Create data file** `src/data/models.ts`
   - Export `modelNames` array with all provided model names.
   - Export `slugify(name: string)` helper to generate URL-friendly slugs.

2. **Update dynamic page** `src/pages/models/[model].astro`
   - Import `modelNames` and `slugify`.
   - Implement `getStaticPaths()` to return paths for every model slug.
   - Find model name by slug and display placeholder content.

3. **Update models index** `src/pages/models/index.astro`
   - Import data file.
   - List all models linking to their detail pages.

4. **Update release notes** with a summary bullet.

5. **Run `pnpm run lint` and `pnpm run build`** to ensure code quality and build success.

