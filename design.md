# tuGasREEN Design System

## Brand direction

tuGasREEN should feel structured, dependable, modern, and approachable. The visual language combines a deep forest green foundation with a vivid lime accent taken directly from the supplied leaf-shaped logo.

## Logo

- Primary asset: `public/tugasreen-logo.jpg`
- Use the complete mark; do not recreate it with initials.
- Keep the mark square with rounded corners and a subtle border on light surfaces.
- Minimum digital size: 32 × 32 px.
- Pair the mark with the display name `tuGasREEN` using the exact capitalization.
- Browser favicon: `app/icon.png`, 64 × 64 px with transparent outer padding.
- Apple touch icon: `app/apple-icon.png`, 180 × 180 px with transparent outer padding.

## Color palette

| Token | Value | Usage |
| --- | --- | --- |
| Brand dark | `#004B34` | Navigation, dark sections, primary contrast |
| Brand | `#007A53` | Primary actions, links, active controls |
| Accent | `#C8FF2F` | Highlights, badges, focused moments |
| Background | `#F7FAF4` | Main light background |
| Foreground | `#10271E` | Primary text |
| Surface | `#FFFFFF` | Cards and form surfaces |
| Muted ink | `#587066` | Secondary text |

Use white text on Brand or Brand dark. Use Brand dark text on Accent. Accent is not a body-text color.

## Typography

- Primary family: Plus Jakarta Sans Variable.
- The font is self-hosted through `@fontsource-variable/plus-jakarta-sans`.
- Headings: weight 700–800 with slightly tight tracking.
- Body: weight 400–500, minimum 16 px.
- Labels and controls: weight 600–700, normally 14 px or larger.
- Keep generous line height for paragraphs and avoid all-caps for long text.

## Interface principles

- Prefer clear hierarchy, short labels, and direct calls to action.
- Use rounded surfaces consistently without making every element a pill.
- Reserve lime for emphasis; green carries the main interaction system.
- Preserve strong focus states, readable contrast, and at least 44 px touch targets for primary controls.
- Support both light and dark themes without changing the brand identity.
- Do not use em dashes in user-facing copy. Prefer a period, comma, colon, or a shorter sentence.
- Feedback panels should enter with a short fade and vertical motion, while respecting reduced-motion preferences.
- Error and success feedback should use the shared `Notice` component for consistent icons, contrast, spacing, and accessibility announcements.

## Responsive behavior

- Start from a 320 px minimum viewport.
- Stack major actions on narrow screens.
- Keep the logo and primary action visible while allowing preference controls to wrap.
- Avoid horizontal scrolling in forms, dashboards, and landing-page sections.
