# Image asset spec

**Status: seven of eight photographs are generated, optimised and wired in.**
The one outstanding is the student support banner, section 5b. The prompts are
kept below so any of them can be re-run if an image needs replacing.

The testimonial section is now disabled, so there are no placeholder images
rendered anywhere on the site. See section 8.

Delivered files, all in `public/images/`:

| File | Size on disk | Dimensions |
| --- | --- | --- |
| `hero-support-specialist.jpg` | 292K | 1122 x 1402 |
| `wismo-tile.jpg` | 392K | 1448 x 1086 |
| `banner-wismo.jpg` | 320K | 1915 x 821 |
| `banner-email-support.jpg` | 336K | 1914 x 822 |
| `banner-live-chat.jpg` | 244K | 1915 x 821 |
| `about-team.jpg` | 292K | 1448 x 1086 |
| `og.jpg` | 144K | 1730 x 909 |

The originals arrived as PNGs totalling 14.7MB. They were converted to JPEG
(2.0MB total, visually identical at these sizes) because `public/` ships to
production. The PNG masters are preserved in `source-images/`, which is
gitignored.

## House style, applied to every prompt

The prompts below already include this, but for reference when you tweak them:

- **Palette.** Cool grey neutrals with a single burnt orange accent (`#ba562c`
  in light mode, `#e78350` in dark). Images should be muted and warm-neutral.
- **Avoid saturated blue, teal, cyan and purple.** They fight the orange accent.
- **Avoid heavy orange too.** It competes with the buttons rather than
  supporting them.
- **The site has a light and a dark theme.** Every image is shown on both
  `#f6f7f8` and `#0c0e12`, so nothing should depend on a white background.
- **No text, logos, or readable brand names anywhere in the image**, including
  on any screen visible in the shot.

---

## 1. Home hero

- **File:** `public/images/hero-support-specialist.jpg`
- **Generate at:** **1600 x 2000** (4:5 portrait)
- **Appears in:** [src/components/home/hero.tsx](src/components/home/hero.tsx)

**Crop warning.** This one is displayed at 4:5 on mobile and desktop but at 5:4
landscape between 640px and 1024px, so the same file gets centre-cropped both
ways. Keep the subject in the middle 60% vertically with clear headroom, or ask
me to drop the tablet aspect change so one crop serves everywhere.

```
Editorial photograph of a single customer support specialist at a clean modern
desk, mid-thirties, wearing a slim headset, looking at a monitor with a calm
focused expression. Shot at 50mm, f/2, shallow depth of field, natural window
light from the left, soft shadows. Subject positioned centre frame with generous
headroom above and below. Muted warm-neutral colour grade: soft greys, pale oak
desk, off-white walls. Background softly out of focus, uncluttered. Quiet
competence, not a call centre. No visible text, no logos, no readable screen
content, no rows of identical desks, no headset-and-thumbs-up stock cliche.
Vertical 4:5 composition.
```

---

## 2. WISMO tile on the home page

- **File:** `public/images/wismo-tile.jpg`
- **Generate at:** **1600 x 1200** (4:3)
- **Appears in:** [src/components/home/services-bento.tsx](src/components/home/services-bento.tsx)

**This one has text over it.** A dark gradient covers the lower half and the
service name, description and link sit on top in white. The **bottom 55% of the
frame must be visually quiet** with no faces and no fine detail, or the text
becomes unreadable. Put the interest in the upper half.

```
Wide editorial photograph looking down a fulfilment warehouse aisle, cardboard
parcels stacked on shelving and moving along a conveyor, receding into soft
focus. Interest concentrated in the upper half of the frame; the lower half is
an open expanse of clean concrete floor in even shadow, deliberately empty and
low in detail. Overcast daylight through high windows, muted warm-neutral grade,
desaturated. Kraft brown, warm grey, pale concrete. No people in the lower half,
no text, no logos, no visible courier branding, no high-vis safety vests, no
lens flare. Horizontal 4:3 composition.
```

---

## 3. WISMO service page banner

- **File:** `public/images/banner-wismo.jpg`
- **Generate at:** **2560 x 1097** (21:9 ultrawide)
- **Appears in:** [src/app/services/\[slug\]/page.tsx](src/app/services/[slug]/page.tsx) for `/services/wismo`

**If your generator cannot do 21:9**, generate **2560 x 1440** (16:9) and crop
the centre band down to 2560 x 1097. Keep the subject vertically centred so that
crop is safe.

```
Ultra-wide cinematic photograph of parcels in transit, a long shallow-focus row
of cardboard boxes on a sorting conveyor crossing the frame horizontally.
Subject band centred vertically with clean empty space above and below. Soft
overcast industrial daylight, muted warm-neutral colour grade, heavily
desaturated with kraft brown and cool concrete grey. Calm and orderly rather
than busy or chaotic. No people in the foreground, no text, no logos, no courier
branding, no motion blur streaks. Very wide 21:9 letterbox composition.
```

---

## 4. Email support service page banner

- **File:** `public/images/banner-email-support.jpg`
- **Generate at:** **2560 x 1097** (21:9). Same 16:9-and-crop fallback as above.
- **Appears in:** `/services/email-support`

```
Ultra-wide cinematic photograph of a quiet open-plan workspace early in the
morning, two or three support specialists at spaced desks working through email,
seen from a low wide angle. Figures small in frame and centred vertically, lots
of calm negative space. Warm low-angle morning light raking across the room,
muted warm-neutral grade, desaturated greys and pale wood. Unhurried and
focused. No text, no logos, no readable screen content, no crowded rows of
desks, no stock-photo eye contact with camera. Very wide 21:9 letterbox
composition.
```

---

## 5. Live chat service page banner

- **File:** `public/images/banner-live-chat.jpg`
- **Generate at:** **2560 x 1097** (21:9). Same 16:9-and-crop fallback as above.
- **Appears in:** `/services/live-chat`

```
Ultra-wide cinematic photograph of a person's hands holding a phone mid-purchase
at a kitchen counter, shot close and low across the surface so the hands and
phone sit centred with wide empty counter either side. Screen is glowing but its
content is indistinct and unreadable. Soft evening domestic light, muted
warm-neutral grade, desaturated. Pale stone counter, warm shadows. Intimate and
ordinary, a real shopper at home rather than a product advert. No face, no text,
no logos, no readable UI, no shopping bags or gift props. Very wide 21:9
letterbox composition.
```

---

## 5b. Student support service page banner

**Not yet generated.** This is the one service page without a banner, so it
looks lighter than its three siblings.

- **File:** `public/images/banner-student-support.jpg`
- **Generate at:** **2560 x 1097** (21:9). Same 16:9-and-crop fallback as above.
- **Appears in:** `/services/student-support`
- **Then tell me** and I will wire it into the `student-support` entry in
  `src/lib/site.ts`, which is the only change needed.

```
Ultra-wide cinematic photograph of one person partway through an online
course at a kitchen table at night, seen from behind and to the side so the
laptop screen is visible but its content is indistinct. Notebook and a cooling
mug beside them. Figure positioned left of centre with wide empty space to the
right, everything centred vertically so a 21:9 crop is safe. Warm low lamp
light against a dim room, muted warm-neutral grade, desaturated. Studious and
calm rather than stressed or triumphant. No face toward camera, no text, no
logos, no readable screen content, no lecture hall, no stock-photo graduation
imagery, no stacks of books. Very wide 21:9 letterbox composition.
```

---

## 6. About page team photo

- **File:** `public/images/about-team.jpg`
- **Generate at:** **1600 x 1200** (4:3)
- **Appears in:** [src/app/about/page.tsx](src/app/about/page.tsx)

```
Candid documentary photograph of a small team of four gathered around one end of
a table mid-discussion, one person gesturing at a laptop, others listening.
Shot at 35mm from slightly outside the group so it reads as observed rather than
posed. Natural daylight from a window behind camera-left, muted warm-neutral
colour grade, desaturated. Plain modern room, pale walls, minimal props. Warm
and unglamorous. No eye contact with the camera, no posed lineup, no crossed
arms, no text, no logos, no whiteboard covered in writing. Horizontal 4:3
composition.
```

---

## 7. Social share image

- **File:** `public/images/og.jpg`
- **Generate at:** **1200 x 630**
- **Wired in:** [src/app/layout.tsx](src/app/layout.tsx), on both the
  `openGraph` and `twitter` metadata blocks.

The image carries no text, which is correct: Slack, LinkedIn and iMessage render
the `title` and `description` from the metadata alongside it, so the words come
from there and stay editable. The empty left two thirds is there so a wordmark
could be composed over it later. If you want that, the right approach is a
`src/app/opengraph-image.tsx` route using Next's `ImageResponse`, which draws
crisp text over the background at build time rather than baking in generated
lettering. Say the word.

```
Wide abstract background image for a social share card. Softly out-of-focus
cardboard parcels and warehouse shelving receding into deep shadow on the right
third of the frame, fading to a large clean expanse of dark near-black space on
the left two thirds. Very dark, very low contrast, deliberately empty on the
left so text can be laid over it. Muted warm-neutral grade with a faint warm
amber glow in the far background. Almost monochrome. No text, no logos, no
people, no bright highlights. Horizontal 1200x630 composition.
```

---

## 8. Testimonial portraits: read this before generating

- **Appears in:** [src/components/home/voices.tsx](src/components/home/voices.tsx)
- **Would be:** 3 files at **400 x 400** square, displayed as 96px circles

**The section is now switched off**, so nothing needs generating unless you
bring it back. `<Voices />` was removed from the home page on 19 August 2026;
the component and the data are kept intact and commented so it can return.

**Here is why it was fake.** The three testimonials on the
home page are placeholders I wrote. Priya Raghunathan, Marcus Delaney and Noor
Haddad do not exist, and neither do Marden Supply, Halstead Goods or Vessel
Skincare. Attaching photorealistic faces to invented quotes presents fabricated
social proof as real customer endorsement. That is the kind of thing that costs
a support company its credibility if a prospect ever checks, and in some
markets it is straightforwardly unlawful advertising.

Three honest options:

1. **Use real customers.** Get a quote and a photo with written permission. This
   is the only version that is actually worth having on the page.
2. **Keep the layout, drop the faces.** I can swap the portraits for initials in
   an accent-coloured circle. The quotes still need to be real.
3. **Remove the section** until you have real testimonials, and let the metrics
   and services carry the page.

Say which and I will make the change. If you do get real portraits, they want to
be **400 x 400**, square, head and shoulders, centred, shot against a plain
background, with a consistent look across all three.

---

## Not a placeholder, leave it alone

The logo strip under the hero
([src/components/home/integration-strip.tsx](src/components/home/integration-strip.tsx))
pulls real brand marks live from `cdn.simpleicons.org` (Shopify, Zendesk,
Intercom, Help Scout and so on). Those are correct as they are and need nothing
generated. Do not replace them with generated logos.

## Also worth doing

- **Favicon** is still the default Next.js icon at `src/app/favicon.ico`. Your
  logo mark is a burnt orange rounded square with a white `Z`, which makes a
  clean favicon. I can generate the `.ico` from an SVG if you want.
- **`public/` still holds five unused Next.js starter SVGs** (`file.svg`,
  `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Safe to delete.

## Verified after wiring

- Every `<img>` on the home page and all three service pages decodes with real
  pixels. No failed requests.
- Lighthouse on a production build, desktop preset: performance,
  accessibility, best practices and SEO all 100 on `/`, `/services/wismo` and
  `/about`. LCP 0.7 to 0.8s, CLS 0, TBT 0ms.
- The hero was checked at 800px wide, where it re-crops to 5:4 landscape. The
  subject survives the crop with headroom intact.
- The WISMO tile was checked with its gradient and text overlay in place. The
  copy sits on the empty concrete floor and stays legible.
