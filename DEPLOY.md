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

### 1. Repository settings, and do this BEFORE touching DNS

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

Not "Deploy from a branch". The workflow publishes an artifact directly, and
the branch option will ignore it.

**Settings → Pages → Custom domain: `zulaiz.com`, then Save.**

This is the only place the domain gets set. A `CNAME` file in the repo does
nothing here: GitHub only writes and reads that file when you publish from a
branch, and explicitly ignores it when publishing from a custom Actions
workflow. That is why `public/CNAME` was removed.

Do this step before creating the DNS records. Pointing DNS at GitHub while no
repository claims the domain leaves a window where someone else can claim it
and serve their own site on your hostname.

### 2. DNS at your registrar

A records for the apex, a CNAME so `www` works too, and optionally AAAA for
IPv6. GitHub redirects `www` to the apex automatically once the apex is set as
the custom domain in repository settings.

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153

AAAA   @      2606:50c0:8000::153
AAAA   @      2606:50c0:8001::153
AAAA   @      2606:50c0:8002::153
AAAA   @      2606:50c0:8003::153

CNAME  www    zulkefal.github.io
```

The AAAA records add IPv6 and are optional. Keep the A records either way;
IPv6 adoption is patchy enough that AAAA alone is not safe.

The `www` CNAME must point at `zulkefal.github.io`, with no repository name on
the end, and must not point at the apex. Pointing a subdomain at the apex
breaks HTTPS enforcement.

If your registrar supports `ALIAS` or `ANAME` at the apex, use that pointing
to `zulkefal.github.io` instead of the four A records. It survives GitHub
changing its IPs.

### 3. Enforce HTTPS

**Settings → Pages → Enforce HTTPS**, once the certificate is issued. GitHub
allows up to 24 hours for this, and the checkbox stays greyed out until then.
DNS propagation itself can also take up to 24 hours.

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
- **The custom domain lives in repository settings, not in a file.** The repo
  history shows a `Create CNAME` then a `Delete CNAME` at the root, from the
  era of branch-based publishing. With a custom Actions workflow those files
  are ignored entirely.
- **`out/` is gitignored** and should stay that way. The workflow builds it.
- **Browser devtools will show cancelled `HEAD` requests** on the deployed
  site. That is Next 16's link prefetching, it is expected, and navigation is
  unaffected.
