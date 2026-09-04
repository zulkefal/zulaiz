# Images

**Nothing outstanding.** Every image the site references exists and is wired
in. Verified by cross-checking every `/images/...` path in `src/` against the
contents of `public/images/`: no broken references, no orphans.

If an image ever needs regenerating, the house style is at the bottom.

## Already done

Eleven images, all in `public/images/`, converted to JPEG and sized for the
web. The two newest arrived as 1.8 MB PNGs and were converted with sips at
quality 84, which brought them under 300 KB each. Masters and pre-crop originals are in `source-images/`, gitignored.

| File | Where it appears | Dimensions |
| --- | --- | --- |
| `hero-support-specialist.jpg` | Home hero | 1122 x 1402 |
| `wismo-tile.jpg` | Home services bento, lead tile | 1448 x 1086 |
| `banner-wismo.jpg` | `/services/wismo` | 1915 x 821 |
| `banner-email-support.jpg` | `/services/email-support` | 1914 x 822 |
| `banner-live-chat.jpg` | `/services/live-chat` | 1915 x 821 |
| `about-team.jpg` | About page | 1448 x 1086 |
| `banner-student-support.jpg` | `/services/student-support` | 1463 x 627 |
| `banner-virtual-assistance.jpg` | `/services/virtual-assistance` | 1915 x 821 |
| `banner-ecommerce-support.jpg` | `/services/ecommerce-support` | 1915 x 821 |
| `banner-guest-communication.jpg` | `/services/guest-communication` | 1915 x 821 |
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

## Tool logos

Thirty-two brand marks in `public/images/tools/`: one per chip on the
services page orbit, plus nine that only appear in the homepage strip, which
uses the same white chips. Each is the vendor's own mark, used as-is to say "we
work in this tool". None were redrawn or recoloured beyond what is noted.

| File | Source |
| --- | --- |
| `zendesk`, `helpscout`, `gmail`, `aftership`, `circle`, `calendly`, `discord`, `whatsapp` (svg) | Simple Icons, in each brand's own colour |
| `shopify`, `woo`, `bigcommerce`, `etsy`, `intercom`, `airbnb`, `bookingdotcom`, `expedia`, `trustpilot` (svg) | Simple Icons, in each brand's own colour. Homepage strip only. `woo` is the Woo bubble rather than the WooCommerce wordmark, which is unreadable at chip size. `intercom` is filled near-black, as on intercom.com, because Simple Icons' pale cyan disappears on white |
| `zoom.svg` | svgl.app collection, Zoom app icon |
| `slack.svg` | gilbarbara/logos collection, Slack icon |
| `outlook.svg` | microsoft.com, Outlook-Icon-FY26 |
| `freshdesk.svg` | freshdesk.com, product icon |
| `lodgify.svg` | lodgify.com, favicon-light |
| `gorgias`, `kajabi`, `guesty`, `thinkific`, `skool` (svg) | Each vendor's header logo, cropped to the mark (Skool to the "sk") |
| `parcelpanel.svg` | parcelpanel.com header logo, cropped to the ring and filled near-black. The Shopify App Store icon confirms this ring is the product's current mark |
| `hostaway.png` | hostaway.com apple-touch-icon, 192px, transparent |
| `hospitable.png` | hospitable.com apple-touch-icon, 541px, rounded tile |
| `teachable.png` | teachable.com favicon, 256px, corners rounded to match its app icon |
| `smoobu.png` | smoobu.com favicon; the white S lifted off the blue tile and recoloured in that blue, 109px |

Two rules the component relies on: chips are white in both themes because
these marks are drawn for white, and files render at 22px on desktop and
16px on phones, so anything above roughly 70px is enough resolution.

The eight tools not on the orbit (Richpanel, Re:amaze, Tawk.to, Track123,
17Track, Kross Booking, Podia, Lark) are not displayed anywhere and have no
files.

## Not needed

**Testimonial portraits.** The testimonial section is disabled, because the
quotes and the people in them were placeholders. `<Voices />` is not rendered
anywhere. If you bring it back with real, permissioned quotes it will need
three square portraits, and the component and data are still in the repo
ready for them.
