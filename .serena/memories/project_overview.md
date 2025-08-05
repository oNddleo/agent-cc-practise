# Project Overview

## Purpose
This is a Next.js practice project called "agent-cc-practise" designed for learning and experimenting with modern web development technologies. Currently a basic Next.js application starter with TypeScript and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 14.2.5 with App Router
- **Language**: TypeScript 5+ with strict configuration
- **Styling**: Tailwind CSS 3.4.1 with PostCSS
- **Runtime**: React 18+ with Server Components
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration

## Project Structure
```
agent-cc-practise/
├── src/
│   └── app/
│       ├── layout.tsx     # Root layout with Inter font
│       ├── page.tsx       # Home page component
│       └── globals.css    # Global styles with Tailwind and CSS custom properties
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript config with path aliases
├── tailwind.config.ts    # Tailwind configuration
├── next.config.js        # Next.js configuration
├── .eslintrc.json        # ESLint configuration
└── CLAUDE.md            # Development guidelines
```

## Key Features
- App Router architecture (Next.js 13+)
- TypeScript with strict mode and path aliases (@/* → ./src/*)
- Tailwind CSS with dark mode support via CSS custom properties
- Inter font from Google Fonts
- ESLint configuration for code quality