# Logo brief

Prompts for generating a Zulaiz logo mark with an AI image tool, plus what to
do with the result.

## Read this first

**Generate the mark only. Never ask for the word "Zulaiz".** Image models cannot
render text reliably. Asking for the brand name returns things like "Zulaız",
"ZULIAZ" or invented glyphs, and the failure is often subtle enough to survive
a quick glance and embarrass you later.

The site already sets the wordmark in live type (Geist Semibold, letter-spaced
`-0.02em`), so it renders razor sharp at every size and in both themes. Keep it
that way. You only need the square mark that sits to its left.

**You will get a PNG, and a logo needs to be an SVG.** Raster logos go soft on
retina screens and cannot be recoloured per theme. After you pick a direction,
the PNG has to be traced to vector. Free options: [vectorizer.ai](https://vectorizer.ai),
Illustrator's Image Trace, or Inkscape's Trace Bitmap. Send me the SVG and I
will wire it in; send me only the PNG and I will tell you it needs tracing.

## Constraints every prompt below already includes

- **2048 x 2048**, square, mark centred with roughly 15% padding.
- **Flat vector style.** Solid shapes, no gradients, no drop shadows, no 3D, no
  bevel, no gloss. Those all die in a trace and look dated besides.
- **One solid colour on plain white.** Easiest to trace cleanly, and the site
  recolours it per theme anyway (`#ad4d26` light, `#e78350` dark).
- **Must survive 16px.** It becomes the favicon. Thin strokes and fine detail
  disappear. Test by shrinking the image to 16px and looking at it.
- **No text of any kind** beyond the single Z letterform where specified.

---

## Direction 1: geometric Z monogram

Closest to what is live now, and the safest bet. A single letterform is the one
piece of lettering an image model can usually manage, though check it carefully.

```
Flat vector logo mark, a bold geometric letter Z constructed from three
straight strokes of even weight, enclosed in a rounded square container.
Single solid burnt orange on a plain white background, no gradient, no shadow,
no 3D, no texture. Strong thick strokes with generously rounded stroke ends.
Confident, modern, corporate software identity. Perfectly centred, symmetrical,
generous padding around the mark. Simple enough to remain legible at 16 pixels.
No text, no lettering other than the single Z, no tagline, no border frame.
Square 2048x2048 composition.
```

## Direction 2: Z as a reply

The Z doubles as a message thread turning back on itself. More distinctive than
a plain monogram, still reads as a Z.

```
Flat vector logo mark, an abstract letter Z where the lower stroke extends and
curls into a rounded arrow returning to the left, so the letter reads as a
message being answered. Single continuous path of even thick weight with
rounded caps. Single solid burnt orange on a plain white background, no
gradient, no shadow, no 3D. Geometric, confident, modern software identity.
Centred with generous padding, legible at 16 pixels. No text, no lettering
other than the single Z, no speech bubble outline, no chat dots.
Square 2048x2048 composition.
```

## Direction 3: Z cut from a parcel

Leans on the WISMO and order-tracking half of the business.

```
Flat vector logo mark, a simple geometric cube seen in isometric view with a
bold letter Z cut out of the front face as negative space. Single solid burnt
orange on a plain white background, no gradient, no shadow, no realistic
lighting, no texture. Clean straight edges, even line weight, minimal
geometric construction. Modern logistics software identity. Centred with
generous padding, legible at 16 pixels. No text, no lettering other than the
cut-out Z, no packing tape, no delivery truck.
Square 2048x2048 composition.
```

## Direction 4: abstract, no letterform

**The safest option if you want zero risk of mangled lettering.** No letters at
all, so nothing can come out misspelled.

```
Flat vector logo mark, two rounded rectangular bars of equal weight stacked at
offset angles so they suggest a fast forward motion and a conversation
exchanging turns. Purely abstract, geometric, no letters and no figurative
objects. Single solid burnt orange on a plain white background, no gradient, no
shadow, no 3D. Balanced, calm and confident rather than energetic. Centred with
generous padding, legible at 16 pixels. No text, no speech bubbles, no arrows,
no globe, no headset.
Square 2048x2048 composition.
```

---

## Clichés worth avoiding

If a generation comes back looking like one of these, run it again. Every
support company on the internet already uses them:

- A speech bubble with three dots in it.
- A headset, on its own or worn by an abstract figure.
- A globe with orbiting rings.
- Two overlapping chat bubbles.
- A smiling face made of geometric shapes.
- Anything with a swoosh.

## How to judge what comes back

1. **Shrink it to 16px.** If it turns to mush, it fails as a favicon.
2. **Fill it solid black.** A good mark works as a pure silhouette. If it only
   reads because of internal detail, it is too fussy.
3. **Look at it next to the wordmark.** It sits left of "Zulaiz" at 28px with a
   10px gap. It should feel like a peer, not a decoration.
4. **Check the stroke weights match.** Uneven weights are the usual tell that a
   generated mark will not hold up.

## What I will do with it

Send me the traced SVG and I will:

- Replace the inline mark in [src/components/logo.tsx](src/components/logo.tsx),
  keeping it theme-aware via `var(--accent)` so it recolours automatically.
- Generate a proper favicon set from it and drop the default Next.js icon still
  sitting at `src/app/favicon.ico`.
- Check it at 28px in the header, at 16px as a favicon, and in both themes.

## Worth saying

The mark currently on the site is a clean geometric Z in a rounded square. It is
not embarrassing, and a logo is one of the few things where a human designer
earns their fee over a generator. If this is a brand you intend to keep, it is
worth a few hundred dollars once. The prompts above are the right move if you
want something in the next ten minutes.
