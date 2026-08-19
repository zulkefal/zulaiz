# Brand assets

Exported from [src/components/logo.tsx](../src/components/logo.tsx), which is
the source of truth. The logo lives in code as inline SVG so it can recolour
itself per theme, which is why there was no file to hand over until now. If the
component changes, re-export these.

## Files

| File | Use |
| --- | --- |
| `zulaiz-mark.svg` | The mark, light-theme colours. Vector, scales cleanly. |
| `zulaiz-mark-dark.svg` | The mark, dark-theme colours. |
| `zulaiz-mark-black.svg` | Solid black silhouette, for the squint test. |
| `zulaiz-mark.png` | 1024x1024, transparent background. |
| `zulaiz-mark-on-white.png` | 1024x1024 on white. **Attach this one to an AI tool.** |
| `zulaiz-mark-black-on-white.png` | 1024x1024 silhouette on white. |
| `zulaiz-lockup-light.png` | Mark plus wordmark, light theme, 4x. |
| `zulaiz-lockup-dark.png` | Mark plus wordmark, dark theme, 4x. |

## Colours

| Role | Light | Dark |
| --- | --- | --- |
| Mark background | `#ad4d26` | `#e78350` |
| Mark stroke | `#ffffff` | `#14171c` |
| Wordmark | `#0e1218` | `#eef1f5` |

## Wordmark

Geist Semibold, `-0.02em` letter spacing, set at `1.0625rem` beside a 28px
mark with a 10px gap. It is live type rather than an image, so it stays sharp
at any size and recolours with the theme. The lockup PNGs are captures of the
real thing, for reference only. Do not use them as the logo.

## Attaching to an image generator

Use `zulaiz-mark-on-white.png`. Solid background traces and analyses more
reliably than transparency, and most tools composite transparent PNGs onto
black, which would hide the white Z.

Prompts and direction options are in [../LOGO.md](../LOGO.md).
