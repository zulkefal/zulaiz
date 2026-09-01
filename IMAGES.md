# Images still needed

**One image is missing.** Everything else the site references exists and is
wired in. Verified by cross-checking every `/images/...` path in `src/`
against the contents of `public/images/`: no broken references, no orphans.

---

## Student support service page banner

`/services/student-support` is the only service page without a banner, so it
reads lighter than WISMO, email support and live chat.

- **File:** `public/images/banner-student-support.jpg`
- **Generate at:** **2560 x 1097** (21:9 ultrawide)
- **Fallback if your generator cannot do 21:9:** generate 2560 x 1440 (16:9)
  and crop the centre band down. Keep the subject vertically centred so that
  crop is safe.
- **Send it to me** and I will wire it in. It is a single field on the
  `student-support` entry in `src/lib/site.ts`, plus alt text.

```
Ultra-wide cinematic photograph of one person partway through an online
course at a kitchen table at night, seen from behind and to the side so the
laptop screen is visible but its content is indistinct. Notebook and a cooling
mug beside them. Figure positioned left of centre with wide empty space to the
right, everything centred vertically so a 21:9 crop is safe. Warm low lamp
light against a dim room, muted warm-neutral colour grade, desaturated.
Studious and calm rather than stressed or triumphant. No face toward camera,
no text, no logos, no readable screen content, no lecture hall, no
stock-photo graduation imagery, no stacks of books. Very wide 21:9 letterbox
composition.
```

### House style, in case you tweak the prompt

- **Palette.** Cool grey neutrals with a single burnt orange accent: `#ad4d26`
  in light mode, `#e78350` in dark. Images should be muted and warm-neutral.
- **Avoid saturated blue, teal, cyan and purple.** They fight the accent.
- **Avoid heavy orange too.** It competes with the buttons rather than
  supporting them.
- **Both themes.** Every image appears on `#f1f3f5` and on `#0a0d12`, so
  nothing should depend on a light background.
- **No text or logos anywhere in the frame**, including on any screen in shot.

---

## Already done

Seven images, all in `public/images/`, converted to JPEG and sized for the
web. The PNG masters are in `source-images/`, which is gitignored.

| File | Where it appears | Dimensions |
| --- | --- | --- |
| `hero-support-specialist.jpg` | Home hero | 1122 x 1402 |
| `wismo-tile.jpg` | Home services bento, lead tile | 1448 x 1086 |
| `banner-wismo.jpg` | `/services/wismo` | 1915 x 821 |
| `banner-email-support.jpg` | `/services/email-support` | 1914 x 822 |
| `banner-live-chat.jpg` | `/services/live-chat` | 1915 x 821 |
| `about-team.jpg` | About page | 1448 x 1086 |
| `og.jpg` | Open Graph and Twitter cards | 1730 x 909 |

Two constraints worth keeping if any of these are ever replaced:

- **The hero is cropped two ways.** It shows at 4:5 on mobile and desktop but
  at 5:4 landscape between 640px and 1024px, so keep the subject in the middle
  60% vertically with clear headroom.
- **The WISMO tile has text over it.** A dark gradient covers the lower half
  and the service name and description sit on top in white, so the bottom 55%
  of the frame must stay visually quiet or the copy becomes unreadable.

## Not needed

**Testimonial portraits.** The testimonial section is disabled, because the
quotes and the people in them were placeholders. `<Voices />` is not rendered
anywhere. If you bring it back with real, permissioned quotes it will need
three square portraits, and the component and data are still in the repo
ready for them.
