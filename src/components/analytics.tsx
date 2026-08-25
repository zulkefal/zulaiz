/*
  Umami analytics.

  Cookieless and no personal data, so it needs no consent banner in the EU or
  UK. It reports counts, pages, referrers, countries and devices. It does not
  identify individual people, and nothing here attempts to.

  The website id is committed rather than configured. It is public by design:
  the script is fetched by every visitor's browser and the id travels with
  each request, so hiding it buys nothing, and committing it means analytics
  works from a clean clone with no setup. Same reasoning as the Formspree form
  id in src/lib/formspree.ts.

  The env vars stay as overrides, for pointing a staging build at a separate
  Umami site or at a self-hosted instance.
*/
/*
  || rather than ??. The workflow passes these through as
  ${{ vars.NEXT_PUBLIC_UMAMI_WEBSITE_ID }}, and when that repository variable
  is not set GitHub substitutes an empty string rather than leaving the value
  undefined. ?? only falls back on null and undefined, so an empty string won
  and the build shipped with no website id and an empty script src.
*/
const WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ||
  "d0cded98-55d1-4055-9433-8f88618e2cae";
const SCRIPT_URL =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";

export function Analytics() {
  if (!WEBSITE_ID) return null;

  return (
    <script defer src={SCRIPT_URL} data-website-id={WEBSITE_ID} />
  );
}
