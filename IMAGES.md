# Images

**Nothing outstanding.** Every image the site references exists and is wired
in. Verified by cross-checking every `/images/...` path in `src/` against the
contents of `public/images/`: no broken references, no orphans.

If an image ever needs regenerating, the house style is at the bottom.

## Already done

Eight images, all in `public/images/`, converted to JPEG and sized for the
web. Masters and pre-crop originals are in `source-images/`, gitignored.

| File | Where it appears | Dimensions |
| --- | --- | --- |
| `hero-support-specialist.jpg` | Home hero | 1122 x 1402 |
| `wismo-tile.jpg` | Home services bento, lead tile | 1448 x 1086 |
| `banner-wismo.jpg` | `/services/wismo` | 1915 x 821 |
| `banner-email-support.jpg` | `/services/email-support` | 1914 x 822 |
| `banner-live-chat.jpg` | `/services/live-chat` | 1915 x 821 |
| `about-team.jpg` | About page | 1448 x 1086 |
| `banner-student-support.jpg` | `/services/student-support` | 1463 x 627 |
| `og.jpg` | Open Graph and Twitter cards | 1730 x 909 |

Three constraints worth keeping if any of these are ever replaced:

- **The hero is cropped two ways.** It shows at 4:5 on mobile and desktop but
  at 5:4 landscape between 640px and 1024px, so keep the subject in the middle
  60% vertically with clear headroom.
- **The student support banner arrived letterboxed.** It was 1915 x 821 with
  97px black bars baked into the top and bottom, so the real content was
  3.054:1 rather than 21:9. Dropped into the banner container that renders as
  black stripes. It was cropped to 1463 x 627, a true 21:9, left aligned so
  the figure keeps its position and the empty curtain side is what got
  trimmed. Check any replacement for the same thing.
- **The WISMO tile has text over it.** A dark gradient covers the lower half
  and the service name and description sit on top in white, so the bottom 55%
  of the frame must stay visually quiet or the copy becomes unreadable.

## Not needed

**Testimonial portraits.** The testimonial section is disabled, because the
quotes and the people in them were placeholders. `<Voices />` is not rendered
anywhere. If you bring it back with real, permissioned quotes it will need
three square portraits, and the component and data are still in the repo
ready for them.
