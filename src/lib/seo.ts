import type { Metadata } from "next";

/*
  next.config.ts sets trailingSlash: true, so the canonical form of every URL
  on this site ends in a slash. Anything that emits a URL has to agree with
  that, or it points at a 301 instead of at the page.
*/
export function canonicalPath(path: string) {
  if (path === "" || path === "/") return "/";
  const trimmed = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${trimmed}/`;
}

/*
  Builds page metadata with a canonical URL and a matching og:url.

  Without this, Next inherits openGraph.url from the root layout, so every page
  on the site declared the homepage as its Open Graph URL, and no page emitted
  a rel="canonical" at all. Paths are relative: Next resolves them against
  metadataBase, which is set from site.url in the root layout.
*/
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = canonicalPath(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}
