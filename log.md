# tuGasREEN Work Log

## 2026-11-26: Brand refresh and local QA

### Repository preparation

- Renamed the local project folder from `tugasreen` to `tuGasREEN`.
- Confirmed the repository remote is `https://github.com/Carelyk/tugasreen.git` on branch `main`.
- Found the local branch one commit behind and synchronized it with `git pull --ff-only`.
- Updated the local base from commit `cf2d765` to `081119e` before making changes.
- Preserved the incoming language switcher, theme controls, dark mode, and accessibility improvements from the latest remote commit.

### Brand identity changes

- Replaced the temporary `TR` letter tiles with the supplied tuGasREEN logo.
- Added the logo asset at `public/tugasreen-logo.jpg`.
- Added reusable component `components/brand-mark.tsx` for consistent logo rendering.
- Added the logo to the site metadata for browser and device icons.
- Standardized the visible brand spelling to `tuGasREEN` across metadata, UI copy, FAQ content, translations, generated ZIP readme content, README, and SQL comments.
- Kept technical identifiers such as the npm package name, domain, repository name, storage keys, and email addresses lowercase where required or conventional.

### Typography changes

- Replaced Inter with Plus Jakarta Sans Variable.
- Added `@fontsource-variable/plus-jakarta-sans` so the font is self-hosted and does not depend on a runtime Google Fonts request.
- Removed `@fontsource-variable/inter`.
- Updated global font tokens, body typography, and font feature settings.
- Preserved readable body sizing and strong heading hierarchy.

### Color system changes

- Aligned the interface palette with the supplied logo:
  - Brand dark: `#004B34`
  - Brand: `#007A53`
  - Accent lime: `#C8FF2F`
  - Background: `#F7FAF4`
  - Foreground: `#10271E`
  - Muted ink: `#587066`
- Applied the new palette consistently to the landing page, login, order flow, order history, and admin interface.
- Updated light and dark theme variables, selection color, grid texture, shadows, buttons, links, focus states, cards, and status accents.

### Responsive and component work

- Updated the landing-page header to use the real logo.
- Separated the mobile primary CTA from language/theme controls so the header remains usable at narrow widths.
- Updated the login brand lockup and landing-page footer to use the same reusable brand mark.
- Verified the primary landing layout at desktop and narrow mobile widths.
- Added a reusable animated `Notice` component for error, success, and informational feedback.
- Replaced plain error and success boxes in login, order creation, order history, admin, and admin actions with the shared feedback component.
- Added smooth entry motion to form steps and FAQ content.
- Added subtle global interaction transitions for links, buttons, fields, selects, text areas, and summaries.
- Added a reduced-motion fallback for visitors who disable interface animation at operating-system level.
- Removed em dashes from all user-facing website copy and metadata.

### Documentation

- Added `design.md` with logo rules, exact color tokens, typography rules, accessibility guidance, interface principles, and responsive behavior.
- Added this `log.md` to maintain a chronological record of takeover work and validation.

### Validation completed

- Local development server: `http://localhost:3000` returned HTTP 200.
- Confirmed the rendered HTML includes the `tuGasREEN` brand and new logo asset.
- Desktop visual QA completed with a 1440 × 1100 headless Edge screenshot.
- Mobile visual QA completed at the browser's reliable 500 px narrow viewport.
- `npm run lint`: passed with no ESLint errors.
- `npm run build`: passed.
  - Production compilation succeeded.
  - TypeScript validation succeeded.
  - All 12 static/partial pages generated successfully.
- `git diff --check`: passed with no whitespace errors.

### Notes

- npm reported 7 moderate dependency vulnerabilities during package installation. No automatic audit fix was run because dependency upgrades were outside this branding task and could introduce unrelated breaking changes.
- Next.js emitted an existing workspace warning about finding a higher-level `package-lock.json` at `C:\Users\User`. The project build still completed successfully.
- Deployment/push status should be recorded below after the validated commit is pushed and Vercel finishes deployment.
