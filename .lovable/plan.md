

## Plan: Blog Hero Restyle + Full Article Pages

### Task 1 — Blog Hero Section Restyle

Current blog hero uses a full-bleed background image with overlay. The "About" page hero uses a two-column grid layout with `bg-[#1A0A2E]`, image on the right, and a decorative blur circle.

**Changes to `src/components/blog/HeroSection.tsx`:**
- Switch from full-bleed background image to two-column grid layout matching About page style
- Use `bg-[#1A0A2E]` background
- Place blog hero image on the right side in a rounded container
- Add decorative blur circle element
- Keep existing text content

### Task 2 — Full Article Pages

Currently articles have no `content` field and no detail page exists. Clicking "Читать" does nothing.

**Step-by-step:**

1. **Add `content` field to `BlogArticle` interface** in `src/data/blogArticles.ts` — store full HTML/markdown text for each article parsed from the 5 uploaded documents (all 50 articles).

2. **Create `src/pages/BlogArticlePage.tsx`** — a page component that:
   - Takes article `id` from URL params (`/blog/:id`)
   - Looks up article from `blogArticles` by id
   - Renders full article text with proper typography
   - Shows category badge, read time, date
   - Has a "Back to blog" link
   - Uses the same `Layout` wrapper

3. **Add route** in `App.tsx`: `<Route path="/blog/:id" element={<BlogArticlePage />} />`

4. **Make cards clickable** — wrap article cards in `ArticleGrid.tsx` and `FeaturedSection.tsx` with `<Link to={/blog/${article.id}}>` so clicking anywhere on the card navigates to the full article.

### Technical Notes

- The full article content from all 5 documents will be stored as string fields in `blogArticles.ts`. This will make the file large (~50 articles × ~2000 words each) but keeps the architecture simple without requiring a database.
- Article content will be stored as plain text with paragraph breaks, rendered with proper typography classes.
- The article detail page will follow the site's existing dark theme and layout patterns.

### Files to Create/Edit
- `src/components/blog/HeroSection.tsx` — restyle
- `src/data/blogArticles.ts` — add `content` field to all 50 articles
- `src/pages/BlogArticlePage.tsx` — new page
- `src/App.tsx` — add route
- `src/components/blog/ArticleGrid.tsx` — wrap cards with Link
- `src/components/blog/FeaturedSection.tsx` — wrap cards with Link

