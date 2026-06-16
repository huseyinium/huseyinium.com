# Contributing

Thanks for your interest in contributing to `huseyinium.com`. This is a personal portfolio — contributions are welcome for bug fixes, performance improvements, and documentation. Please don't submit unsolicited redesigns.

---

## How to Add a Blog Post

1. Create a new `.mdx` file in `content/blog/`:

   ```
   content/blog/your-post-slug.mdx
   ```

2. Add front matter at the top:

   ```mdx
   ---
   title: 'Your Post Title'
   date: '2026-06-16'
   summary: 'A one-sentence description shown in the blog list.'
   tags: ['engineering', 'ai']
   ---

   Your content starts here. Standard Markdown + JSX components.
   ```

3. The post is automatically listed at `/blog` and gets its own page at `/blog/your-post-slug`. No registration step needed.

4. Run `bun dev` and visit `http://localhost:3000/blog/your-post-slug` to preview.

---

## How to Add a Project Case Study

1. Create `content/projects/your-project-slug.mdx` with the same front matter pattern.
2. Register the project in `content/projects.ts` (add an entry to the array).
3. The case study page is available at `/projects/your-project-slug`.

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/huseyinium/huseyinium.com/issues) with:

- A clear title describing what's broken
- Steps to reproduce
- Expected vs actual behavior
- Browser / device if relevant

---

## Code Style

The project uses **ESLint** and **Prettier** for formatting. A pre-commit hook (via Husky + lint-staged) runs both automatically on `git commit`.

To run manually:

```bash
bun lint       # ESLint
bun format     # Prettier
bun type-check # TypeScript
```

Key rules from `CLAUDE.md`:

- No `any` — TypeScript strict mode
- No inline styles — Tailwind classes only
- Components must be under 200 lines
- No comments unless the _why_ is non-obvious

---

## PR Checklist

Before opening a pull request:

- [ ] `bun build` passes with no errors or warnings
- [ ] `bun run test` passes
- [ ] `bun type-check` passes
- [ ] `bun lint` passes
- [ ] New components are under 200 lines
- [ ] No hardcoded colors — CSS variables (`var(--color-*)`) only
- [ ] Mobile tested (3D scenes reduce particle count by 70% on touch devices)
