# Rannel Portfolio - Project Context

## Overview
**Brand:** Rannel  
**Owner:** Jenel Esteron  
**Profession:** Security-First AI Developer & Penetration Tester  
**Tech Stack:** Next.js 15.3.1 (App Router), React, TypeScript, Tailwind CSS

## Design System

### Aesthetic
High-End Editorial / Boutique Tech Agency - Premium feel similar to architecture or law firm websites, but for secure software development.

### Color Palette
| Purpose | Color | Tailwind Class |
|---------|-------|----------------|
| Main Background | `#FAF7F2` | `bg-[#FAF7F2]` |
| Cards/Sections | `#EBE6DF` | `bg-[#EBE6DF]` |
| Headings Text | `#1A1A1A` | `text-[#1A1A1A]` |
| Body Text | `#4A4A4A` | `text-[#4A4A4A]` |
| Primary Accent | `#B84A39` | `bg-[#B84A39]` / `text-[#B84A39]` |
| Borders | `#D1CCC5` | `border-[#D1CCC5]` |

### Typography
- **Headings (Brand Font):** Playfair Display (Google Font) as serif - used for brand name, hero headline, section titles
- **Body Text (UI Font):** DM Sans (Google Font) as sans-serif - used for paragraphs, buttons, navigation
- **Technical Font:** JetBrains Mono (Google Font) as monospace - used for tech stacks, security highlights, code
- Font variables defined in globals.css using @theme directive
- Falls back to system fonts if Google Fonts unavailable

### Styling Principles
- Minimalist design with lots of padding (`py-24`, `py-40`)
- No heavy drop shadows - use subtle borders for separation
- Rounded-none for buttons (sharp edges)
- Minimal icons in services section

## Project Structure
```
rannel-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main homepage assembling all sections
│   ├── globals.css         # Global styles with CSS variables
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx          # Sticky top navigation
│   ├── Hero.tsx            # Landing section with headline
│   └── ProjectCard.tsx     # Reusable project card component
├── data/
│   └── portfolio.ts        # Project data (TypeScript interfaces & mock data)
├── public/
│   └── Rannel.png         # Brand logo
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript config with path aliases
└── package.json
```

## Key Files

### `/data/portfolio.ts`
Defines the `Project` interface and exports `projects` array with 3 industry-level projects:
- Zero-Trust Patient Portal (Healthcare/HIPAA Focus)
- Fraud-Resistant Payment API (FinTech Focus)
- Automated Code Auditor CLI (DevSecOps Focus)

Each project includes: `title`, `description`, `techStack`, `securityFeatures`, `githubUrl`, `liveUrl`, `problem`, `architecture`, `buildProcess`, `securityAudit`

### `/components/Navbar.tsx`
- Sticky navigation with backdrop blur
- Brand name "Rannel" in serif font (left)
- Navigation links + "Book a Call" button (right)
- Uses `#B84A39` accent color for CTA
- "Book a Call" opens modal popup with form (email, time, description)

### `/components/Hero.tsx`
- Massive padding (`py-40 md:py-48`)
- Large serif headline: "AI-Speed Development. Enterprise-Grade Security."
- Body text with OWASP Top 10 mention
- Two CTAs: "Book a Discovery Call" (solid) + "View the Vault" (outline)
- "Book a Discovery Call" opens modal popup with form

### `/components/ProjectCard.tsx`
- Background: `#EBE6DF` with `#D1CCC5` border
- Tech stack displayed with monospace font
- "Security Highlights" section with left border accent (`#B84A39`)
- Links to GitHub and Live Demo
- Expandable "View Details" section showing: Problem, Architecture, Security Audit
- Uses CSS variables for theming (var(--color-bg-card), etc.)

### `/components/BookCallModal.tsx`
- Modal popup for "Book a Call" functionality
- Form fields: Email, Available Time, Request Description
- Submits via mailto to jenelesteron01@gmail.com with [Rannel] label
- Closes on ESC key or clicking outside
- Form validation for required fields

### `/app/page.tsx`
Assembles all sections:
1. Navbar
2. Hero Section
3. Services (3 columns: Secure MVP Build, Codebase Rescue, Pentesting)
4. Featured Projects (maps over `projects` data)
5. Footer with Rannel.png logo

## Path Aliases
Configured in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```
Usage: `import Navbar from "@/components/Navbar"`

## Scripts
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Notes
- Next.js version upgraded from 15.2.4 to 15.3.1 for stability
- Uses Turbopack for faster builds
- Static site generation (prerendered as static content)
- ESLint rule: `react/no-unescaped-entities` - use `&apos;` for apostrophes
- Logo: `Rannel Small Logo.png` copied to `public/Rannel.png`
- Typography stack: Playfair Display (headings), DM Sans (body), JetBrains Mono (tech/code)
- Dark mode properly implemented for Tailwind CSS v4 with `@custom-variant dark (&:where(.dark, .dark *));`
- CSS variables for theming: `:root` and `.dark` classes define colors, components use `var(--color-*)`
- Smooth transitions: global CSS transitions on background-color, border-color, color
- Smooth scrolling enabled via CSS `scroll-behavior: smooth` on html element
- Framer Motion animations: Navbar slide-in, hover/tap effects, Hero fade-in with stagger
- "Book a Call" buttons open modal popup with form (email, time, description)
- Form submits via mailto to jenelesteron01@gmail.com with [Rannel] label in subject
- Vault section features 3 industry-level projects with expandable details (Problem, Architecture, Security Audit)
- Hydration error fixed: removed client-side only state changes during render

## Future Enhancements
- Add "Process" section (referenced in Navbar)
- Implement actual security audit reports in "View the Vault"
- Add animation on scroll (Framer Motion)
- Dark mode toggle available (ThemeProviderWrapper + next-themes integrated)
