# Release Notes

* Added Astro-compatible ESLint setup with Husky pre-commit hook enforcing no semicolons.
* Switched index pages to Astro shorthand title format.

## Next
- Fixed build errors by converting page frontmatter to valid JavaScript and
  adding empty `getStaticPaths()` functions for placeholder dynamic routes.
- Migrated project to pnpm and removed npm lockfile.
- Fixed ESLint script to use existing configuration and updated pre-commit hook.
