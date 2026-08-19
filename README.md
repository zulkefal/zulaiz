# Zulaiz

Marketing site for Zulaiz, an outsourced customer support team for ecommerce
brands. Next.js 16 App Router, TypeScript, Tailwind v4, Motion.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, all routes prerender
npm run lint
```

## Contact form

The demo request form on `/contact` submits to **Formspree** (form ID
`xoeaporq`) through the official `@formspree/react` `useForm` hook.

Two deliberate choices:

- **The library, not a raw `fetch`.** `@formspree/react` carries Formspree's
  spam and reCAPTCHA tokens. A hand-rolled POST to the endpoint does not, and
  gets filtered.
- **Our own validation runs first.** [src/lib/formspree.ts](src/lib/formspree.ts)
  validates against the zod schema in
  [src/lib/contact.ts](src/lib/contact.ts) before anything leaves the browser,
  so the error copy is ours. Formspree validates again server-side, and
  [demo-form.tsx](src/components/demo-form.tsx) merges those errors onto the
  same inputs via `state.errors.getFieldErrors(field)`.

No environment variables are required. The form ID is committed because
Formspree IDs are public by design, so the form works from a clean clone. See
[.env.example](.env.example) for the two optional overrides (a different form
for staging, or a local stub for tests).

Fields posted: `name`, `email`, `company`, `website`, `volume`, `channels`
(comma joined), `message`, plus `_subject`. The submitter's `email` becomes the
reply-to, so replying from your inbox reaches them directly.

## Where the content lives

Almost all copy is data, not markup. `src/lib/site.ts` holds the services,
pricing plans, metrics, testimonials, FAQ and integration logos. Editing that
file updates the home page, the services pages, pricing, the footer and the
sitemap together.

Service detail pages are generated from the same array. A service with
`featured: true` gets its own page at `/services/<slug>`; the others render as
bolt-on capabilities on `/services` with anchor links.

## Design system

Defined once in `src/app/globals.css`:

- **Palette lock.** Cool grey neutrals plus one accent (burnt orange). Semantic
  tokens (`--surface`, `--text`, `--accent`) swap under `[data-theme="dark"]`.
  There is no second accent anywhere on the site.
- **Radius lock.** Buttons and pills are fully round, cards and tiles are 16px
  (`rounded-card`), inputs are 10px (`rounded-input`).
- **Theme.** Follows `prefers-color-scheme`, with a manual toggle that persists
  to `localStorage`. An inline script in `layout.tsx` sets the attribute before
  paint so there is no flash.
- **Icons.** Phosphor only, `duotone` or `bold`, imported from
  `@phosphor-icons/react/dist/ssr` so they render in server components.
- **Motion.** Motion (`motion/react`), isolated in client leaf components.
  Scroll reveals use `whileInView` and collapse to static under
  `prefers-reduced-motion`. No scroll event listeners.

## Before launch

1. **Replace the placeholder photography.** Every image is a `picsum.photos`
   seed and is marked with a `TODO` comment. Real assets are needed for the
   hero, the WISMO bento tile, the three service page banners, the about page
   team photo, and the three testimonial portraits.
2. **Write the legal pages.** `/privacy` and `/terms` are structural scaffolds
   with a visible notice on them. They carry `robots: { index: false }` until
   real reviewed copy replaces the prompts.
3. **Confirm the numbers.** The rate of $6 an hour is real; the performance
   metrics in `src/lib/site.ts` (41 min first response, 4.8 CSAT, 58% WISMO
   deflection) are still plausible placeholders. Swap them for figures you can
   stand behind.
4. **Set the real domain.** `site.url` in `src/lib/site.ts` feeds
   `metadataBase`, the sitemap and the robots file.
