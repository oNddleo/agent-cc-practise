# Code Style and Conventions

## TypeScript Conventions
- **Strict Mode**: Enabled with strict: true
- **Type Definitions**: Use explicit types where beneficial
- **Path Aliases**: Use @/* for imports from src/ directory
- **File Extensions**: .tsx for React components, .ts for utilities
- **Naming**: PascalCase for components, camelCase for variables/functions

## React/Next.js Patterns
- **App Router**: Use Next.js 13+ App Router patterns in src/app/
- **Components**: Export default function components
- **Layouts**: Use layout.tsx files for shared layouts
- **Server Components**: Prefer Server Components by default
- **Metadata**: Export metadata objects for SEO

## Styling Conventions
- **Tailwind CSS**: Use utility-first approach
- **CSS Custom Properties**: Define theme colors as CSS variables
- **Dark Mode**: Support via prefers-color-scheme media query
- **Responsive**: Mobile-first approach with Tailwind breakpoints
- **Font**: Inter font family loaded from Google Fonts

## File Organization
```
src/
├── app/                 # App Router pages and layouts
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
└── components/         # Reusable components (when created)
```

## Import Order
1. React and Next.js imports
2. Third-party libraries
3. Internal utilities and types
4. Relative imports
5. CSS imports last

## Example Component Structure
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};

export default function ComponentName() {
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  );
}
```