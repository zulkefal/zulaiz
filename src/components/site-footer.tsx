import Link from "next/link";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, nav, services, site } from "@/lib/site";
import { Container } from "@/components/ui";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-sunken">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
              Customer support for ecommerce brands, rental hosts and course
              creators, run by a team that learns your business.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {/*
                Leaves the site, so it opens in a new tab. noopener stops the
                new page reaching back through window.opener, and noreferrer
                withholds the referrer header.

                Drawn as LinkedIn's own tile, white mark on LinkedIn blue, so it
                reads as LinkedIn at a glance. A third-party brand colour, like
                the tool logos, so it sits outside the one-accent rule.
              */}
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zulaiz on LinkedIn, opens in a new tab"
                className="grid size-11 place-items-center rounded-[10px] bg-[#0a66c2] text-white shadow-[0_10px_24px_-14px_rgba(10,102,194,0.8)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#004182]"
              >
                <LinkedinLogoIcon weight="fill" className="size-6" />
              </a>
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="text-sm font-semibold text-text">Services</h2>
            <ul className="mt-4 grid gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-text">Company</h2>
            <ul className="mt-4 grid gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              Terms
            </Link>
            <Link
              href={CTA.primaryHref}
              className="font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {CTA.primary}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
