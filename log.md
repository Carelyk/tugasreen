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
### Deployment

- Committed the validated implementation as `155eaa9` with message `feat: refresh tuGasREEN brand and interactions`.
- Pushed commit `155eaa9` to `origin/main` successfully.
- Confirmed `https://tugasreen.vercel.app` returned HTTP 200 after Vercel updated the production deployment.
- Confirmed the live HTML contains the new `tuGasREEN | Brief rapi` title and `tugasreen-logo.jpg` asset.
- Confirmed the previous uppercase title containing an em dash is no longer served in production.

## 2026-11-26: Reactive character counter fix

- Reproduced the description counter remaining at `0 characters` while the textarea contained text.
- Traced the issue to the global translation `MutationObserver`, which restored the counter text node to its initially recorded value after every React update.
- Excluded the live counter from DOM text mutation with `data-no-translate`.
- Connected the counter directly to the active preference language so it renders `karakter` in Indonesian and `characters` in English.
- Kept the numeric value driven by `form.deskripsi.length`, allowing it to update immediately on every textarea change.
- Verified the fix in Edge headless through the Chrome DevTools Protocol with real `input` events.
- Browser assertions passed for `0 karakter`, `8 karakter`, `8 characters`, and `14 characters` after successive text and language changes.
- Committed the fix as `3c9eea9` with message `fix: keep character counter reactive` and pushed it to `origin/main`.
- Confirmed the production `/order/new` route returned HTTP 200 and included the new `data-no-translate` counter marker after Vercel deployed the commit.

## 2026-11-26: Favicon replacement

- Created a favicon-ready version of the supplied tuGasREEN logo with ImageGen.
- Preserved the original symbol and brand colors while removing the large white outer margin and making the outside area transparent.
- Added `app/icon.png` at 64 × 64 px for browser tabs and bookmarks.
- Added `app/apple-icon.png` at 180 × 180 px for Apple touch surfaces.
- Removed the old `app/favicon.ico` so it can no longer override the new App Router icon metadata.
- Removed the manual metadata icon URLs from `app/layout.tsx` and delegated icon tags to the Next.js 16 file convention.
- Optimized the final PNG files from 846 KB each to approximately 3 KB and 10 KB without changing the design.
- Committed the favicon replacement as `3cb8d1b` and pushed it to `origin/main`.
- Confirmed the production home page returned HTTP 200 with the new `/icon.png` and `/apple-icon.png` routes, and no longer referenced the old JPG icon metadata.

## 2026-11-26: Public account removal

- Removed the public `Masuk` link from the landing-page navigation.
- Removed public footer links to order history and the admin panel.
- Replaced `/login` with a redirect to the public home page, removing sign-in, create-account, and Google OAuth controls from public access.
- Preserved administrator access through the unlisted `/admin-login` route with email and password only.
- Updated the protected admin redirect and OAuth failure fallback to use `/admin-login`.
- Redirected the legacy `/order/new` and `/orders` public routes to the contact section.
- Added a public contact section with configurable WhatsApp, Instagram, and X destinations.
- Removed the fake WhatsApp placeholder and made all unconfigured contact channels display a safe unavailable state.
- Replaced public order CTAs with links to the contact section.
- Updated file-handling copy to state that submission instructions are provided after consultation.
- Confirmed the existing PDF and attachment implementation uses the private Supabase Storage bucket `task-files`; Google Drive remains unconfigured.
- Committed the account-free contact flow as `d09b073` and pushed it to `origin/main`.
- Confirmed production returned HTTP 200 with the contact section, no public login link, `/login` redirecting to `/`, `/order/new` redirecting to `/#kontak`, and `/admin-login` remaining available for internal access.
