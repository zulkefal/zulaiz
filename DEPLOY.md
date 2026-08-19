# Deploying to GitHub Pages

The site is a fully static export. Nothing here needs a server: the contact
form posts straight to Formspree from the browser, and there are no route
handlers, server actions or middleware.

Repo: `zulkefal/zulaiz` · Branch: `main` · Domain: `zulaiz.com`

## What was changed to make this work

| File | Change |
| --- | --- |
| [next.config.ts](next.config.ts) | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` |
| [src/app/sitemap.ts](src/app/sitemap.ts) | `export const dynamic = "force-static"` |
| [src/app/robots.ts](src/app/robots.ts) | `export const dynamic = "force-static"` |
| `public/CNAME` | Holds `zulaiz.com`, so it lands at the root of the artifact |
| `public/.nojekyll` | Stops Pages' Jekyll pass deleting `_next/` |
| [.github/workflows/deploy.yml](.github/workflows/deploy.yml) | Build and publish on every push to `main` |

Three notes on why:

- **`trailingSlash: true`** makes every route a directory with an
  `index.html`. Without it, `/services` depends on the host guessing at
  `/services.html`.
- **`images.unoptimized`** is required because the Next image optimiser is a
  server feature. `<Image>` now emits a plain `<img>`. The files in
  `public/images` were already converted to JPEG and sized for the web, so
  this costs little.
- **`.nojekyll`** matters because Jekyll ignores directories whose names begin
  with an underscore, and Next puts every asset in `_next/`. Without it the
  site deploys with no CSS or JavaScript.

## One-time setup

### 1. Repository settings

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

Not "Deploy from a branch". The workflow publishes an artifact directly, and
the branch option will ignore it.

### 2. DNS at your registrar

Four A records for the apex, and one CNAME so `www` works too. GitHub
redirects `www` to the apex automatically once the apex is the custom domain.

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    zulkefal.github.io
```

If your registrar supports `ALIAS` or `ANAME` at the apex, use that pointing
to `zulkefal.github.io` instead of the four A records. It survives GitHub
changing its IPs.

### 3. Enforce HTTPS

**Settings → Pages → Enforce HTTPS**, once the certificate is issued. That can
take up to an hour after DNS propagates, and the checkbox stays greyed out
until then.

## Deploying

Push to `main`. The workflow type-checks, lints, builds and publishes.
`workflow_dispatch` is enabled, so you can also redeploy from the Actions tab
without a commit.

To check the export locally before pushing:

```bash
npm run build        # writes ./out
npx serve out        # serve it exactly as a static host would
```

## Verified locally

Against the real `./out` served by a static file server:

- All 13 internal links navigate and render the right page.
- All 17 routes return 200; an unknown path returns the custom 404.
- 28 images decode, none broken.
- The contact form still posts to `https://formspree.io/f/xoeaporq`.
- Dark mode is the default and the theme toggle persists across reloads.
- `sitemap.xml` and `robots.txt` generate with the correct absolute URLs.

## Gotchas

- **`site.url` in [src/lib/site.ts](src/lib/site.ts) must match the domain.**
  It feeds `metadataBase`, the sitemap and the Open Graph tags. It is currently
  `https://zulaiz.com`. Change the domain and you change this too.
- **Deleting the CNAME file unsets the custom domain.** The repo history shows
  a `Create CNAME` then a `Delete CNAME`, which is why the domain did not
  stick. Keeping it in `public/` means every deploy re-asserts it.
- **`out/` is gitignored** and should stay that way. The workflow builds it.
- **Browser devtools will show cancelled `HEAD` requests** on the deployed
  site. That is Next 16's link prefetching, it is expected, and navigation is
  unaffected.
