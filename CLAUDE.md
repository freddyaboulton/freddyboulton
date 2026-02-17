# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog for Freddy A. Boulton (freddyboulton.com), built with SvelteKit and statically generated. Blog posts are written as Markdown files with YAML frontmatter, processed by mdsvex into Svelte components at build time.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Build static site to /build
npm run preview   # Preview built site
npm run lint      # Check formatting (Prettier) and linting (ESLint)
npm run format    # Auto-format with Prettier
```

## Architecture

**Static site generation**: SvelteKit with `@sveltejs/adapter-static`. The entire site prerenders to static HTML/CSS/JS — no runtime server.

**Blog post pipeline**: Markdown files in `src/lib/posts/*.md` → mdsvex converts to Svelte components → SvelteKit dynamic routes (`[post]`) prerender each as static HTML. Posts are also served as JSON via API endpoints.

**Key files**:
- `src/lib/config.js` — Site metadata (title, author, URL) and nav items
- `src/lib/assets/js/fetchPosts.js` — Dynamic post fetching using `import.meta.glob()`, with sorting, filtering by category, and pagination
- `src/lib/assets/js/store.js` — Svelte stores for global state (currentPage, isMenuOpen)
- `svelte.config.js` — mdsvex setup, rehype plugins (slug + autolink headings), prerender entries

**Routing** (SvelteKit file-based routing in `src/routes/`):
- `/blog/[post]` — Individual post pages, loaded by dynamically importing the matching `.md` file
- `/blog/category/[category]` — Category-filtered post listings
- `/api/posts.json`, `/api/rss.xml` — JSON and RSS endpoints

**Blog post frontmatter format**:
```yaml
title: "Post Title"
date: "2021-08-23"
updated: "2021-08-23"
categories:
  - "category1"
coverImage: "/images/cover.png"
coverWidth: 1200
coverHeight: 630
excerpt: "Summary for meta tags"
```

**Styling**: Tailwind CSS + global CSS files in `static/css/`. Custom color palette and fonts defined in `tailwind.config.js`. Components use Tailwind utilities rather than scoped styles.

**Preprocessing chain**: `vitePreprocess()` (Tailwind/PostCSS) → `mdsvex` (Markdown to Svelte). Both `.svelte` and `.md` are valid component extensions.
