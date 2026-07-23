# Theme

## Compact Token Summary

- Framework: Tailwind CSS 4 imported from `src/index.css`
- Primary canvas: `#ffffff`
- Muted canvas: `#f8fafc`
- Header / high contrast: `#0f172a`
- Primary action: `#2563eb`
- Body text: `#1e293b`
- Muted text: slate 400-600
- Borders: `#e2e8f0`
- Success / warning / danger: green 600 / amber 600 / red 600
- Font: General Sans, Satoshi, Inter, sans-serif
- Corners: 4-8px for controls and cards; avoid oversized pills
- Shadows: subtle, reserved for sticky surfaces and hover elevation
- Layout: full-width bands with constrained `max-w-7xl` inner containers
- Responsive breakpoints: Tailwind defaults (`md`, `lg`, `xl`)

## Raw Source

```css
@import "tailwindcss";

:root {
  --academic-dark: #0f172a;
  --academic-blue: #2563eb;
  --academic-slate: #f8fafc;
  --academic-border: #e2e8f0;
}

body {
  font-family: 'General Sans', 'Satoshi', 'Inter', sans-serif;
  background-color: #ffffff;
  color: #1e293b;
  -webkit-font-smoothing: antialiased;
  margin: 0;
}

#root { min-height: 100vh; }
.grid-pattern {
  background-image: radial-gradient(#cbd5e1 0.5px, transparent 0.5px);
  background-size: 24px 24px;
}
```

