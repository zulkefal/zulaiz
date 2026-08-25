/*
  Umami analytics.

  Cookieless and no personal data, so it needs no consent banner in the EU or
  UK. It reports counts, pages, referrers, countries and devices. It does not
  identify individual people, and nothing here attempts to.

  Both values are public by design: the script is fetched by every visitor's
  browser and the website id travels with each request. They are NEXT_PUBLIC_
  because this is a static export, so they are baked in at build time. That
  means they must be present in CI, not just on your machine. See DEPLOY.md.

  If neither is set, nothing renders and the site runs exactly as before.
*/
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const SCRIPT_URL =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? "https://cloud.umami.is/script.js";

export function Analytics() {
  if (!WEBSITE_ID) return null;

  return (
    <script defer src={SCRIPT_URL} data-website-id={WEBSITE_ID} />
  );
}
