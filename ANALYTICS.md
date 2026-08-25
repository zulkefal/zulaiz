# Analytics

Umami is wired in but switched off. It stays off until you set a website id,
and until then the site emits no tracking script at all.

## What it can and cannot tell you

**Can:** how many people visited, which pages, where they came from (including
which email campaign), country, device, and which pages they left from.

**Cannot:** who they were. No web analytics identifies individual visitors by
name or company, and this one deliberately stores no personal data. If a
prospect visits after your email, you will see the visit and that it came from
that campaign. You will not see that it was that prospect.

That limit is also the reason Umami needs no cookie banner. It sets no
cookies and collects no personal data, so the consent rules that force banners
in the EU and UK do not apply.

## Turning it on

### 1. Get a website id

Sign up at [cloud.umami.is](https://cloud.umami.is) (the free tier is
generous), add `zulaiz.com` as a website, and copy the **Website ID** from
Settings > Websites. It looks like `4f1a2b3c-...`.

Self-hosting works too. Only the script URL changes.

### 2. Add it to GitHub

**Settings > Secrets and variables > Actions > Variables > New repository
variable.**

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | the id you copied |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | only if self-hosting |

A **variable**, not a secret. Both values are public: the script runs in every
visitor's browser and the id travels with each request, so hiding them buys
nothing and secrets are awkward to read in a build.

This matters because the site is a static export. `NEXT_PUBLIC_` values are
inlined when the site is built, so a `.env.local` on your machine has no
effect on what GitHub Pages serves. The value has to exist in CI.

### 3. Redeploy

Actions > Deploy to GitHub Pages > Run workflow. Or just push anything.

### 4. Check it

Load `https://zulaiz.com` and view source. You should see one line:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="..."></script>
```

Your visit should appear in the Umami dashboard within about 30 seconds.

## Tracking your daily emails

This is the part that answers "is the outreach working". Umami reads UTM
parameters from the URL, so tag every link you send.

Instead of:

```
https://zulaiz.com
```

send:

```
https://zulaiz.com/?utm_source=email&utm_medium=outreach&utm_campaign=2026-08-cold
```

- `utm_source` where it came from: `email`, `linkedin`, `upwork`
- `utm_medium` the kind of send: `outreach`, `newsletter`, `followup`
- `utm_campaign` which batch, so dated names are easiest to compare later

In Umami these show under Referrers and campaign breakdowns, so you can see
which batch produced visits and which produced none.

Two habits worth keeping:

- **Use a consistent naming scheme.** `2026-08-cold` and `Aug Cold Outreach`
  will be counted as two different campaigns.
- **Tag the deep link, not just the homepage.** If the email pitches WISMO,
  send them to `/services/wismo/?utm_...`. You then learn which pitch pulls.

## Measuring the thing that actually matters

Visits are a weak signal. The number worth watching is demo requests.

Umami can count a click as an event. To track the "Book a demo" button, add
`data-umami-event` to it:

```tsx
<ButtonLink href={CTA.primaryHref} data-umami-event="book-demo-click">
```

Not wired up yet, because it is worth deciding first whether you want events
on every CTA or only the hero. Ask and I will add it.

## Verified

- With no website id set, the build emits zero references to umami. The site
  is byte-for-byte what it is today.
- With an id set, exactly one script tag appears, once per page, across the
  home page, pricing, service pages and contact.
- Setting `NEXT_PUBLIC_UMAMI_SCRIPT_URL` correctly swaps the cloud script for
  a self-hosted one.
