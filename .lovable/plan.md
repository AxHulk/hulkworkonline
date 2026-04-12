

# Fix "Новый" Badge Styling

The badge currently uses `mt-auto w-fit pt-3` which stretches it vertically with extra top padding, making it look ugly. 

## Changes

**File: `src/pages/PortfolioPage.tsx` (line 126)**

Replace the badge line with a cleaner, compact style:
- Remove `pt-3` (causes vertical stretch)
- Add `mt-3` instead of `mt-auto` for consistent spacing below text
- Use a subtle styled badge with primary color accent instead of plain `outline` variant

```tsx
<Badge variant="outline" className="mt-3 w-fit border-primary/30 text-primary">
  <Rocket className="mr-1 h-3 w-3" />Новый
</Badge>
```

This gives a compact, stylish badge with a purple-tinted border that matches the design system, without stretching or floating to the bottom awkwardly.

