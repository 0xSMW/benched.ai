# Release Notes

## Next
- Added Astro-compatible ESLint setup with Husky pre-commit hook enforcing no semicolons.
- Switched index pages to Astro shorthand title format.
- Fixed build errors by converting page frontmatter to valid JavaScript and adding empty `getStaticPaths()` functions for placeholder dynamic routes.
- Migrated project to pnpm and removed npm lockfile.
- Added pages listing 32 inference providers.
- Disabled the `no-unused-labels` rule for Astro files and reverted pages to `title:` frontmatter.
- Fixed ESLint script to use existing configuration and updated pre-commit hook.
- Updated ESLint configuration to use flat setup with Astro support.
- Added dynamic pages for over 100 AI models.
- Generated placeholder MDX files for all models.
