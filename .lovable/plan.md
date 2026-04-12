

# Fix Unreadable Button in Open Source Section

The GitHub button in the dark Open Source section uses `border-white/20 text-white` which makes it nearly invisible against the dark background, and `hover:bg-white/10` doesn't improve readability on hover.

## Changes

**File: `src/pages/PortfolioPage.tsx` (line ~191)**

Replace the button styling with a solid, high-contrast design:

```tsx
<Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
  <Github className="mr-2 h-4 w-4" />
  Открыть на GitHub
</Button>
```

This uses green (matching the "Open Source" badge visible in the screenshot) for both border and text, with a solid green fill on hover — readable in both states against the dark background.

