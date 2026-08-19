"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, featuredServices, nav } from "@/lib/site";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState(pathname);
  const [lifted, setLifted] = useState(false);

  /* Close the menu when the route changes, adjusted during render rather
     than in an effect. */
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
  }

  /* Motion's scroll value rather than a scroll listener, so this never
     re-renders on every frame. */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 8));

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        lifted ? "border-line bg-surface/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-8 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            /* "/" would prefix-match every route, so it needs an exact test. */
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/*
            Visibility lives on a wrapper, not on the button. ButtonLink bakes
            inline-flex into its base classes, and a `hidden` passed through
            className loses to it regardless of attribute order.
          */}
          <div className="hidden sm:block">
            <ButtonLink href={CTA.primaryHref}>{CTA.primary}</ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-line text-muted lg:hidden"
          >
            {open ? (
              <XIcon weight="bold" className="size-4" />
            ) : (
              <ListIcon weight="bold" className="size-4" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-surface px-5 pb-6 pt-3 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[10px] px-3 py-2.5 text-base font-medium text-text hover:bg-sunken"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-1 border-t border-line pt-3">
              {featuredServices.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="rounded-[10px] px-3 py-2 text-sm text-muted hover:bg-sunken hover:text-text"
                >
                  {s.navLabel}
                </Link>
              ))}
            </div>
            <ButtonLink href={CTA.primaryHref} className="mt-4 w-full">
              {CTA.primary}
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
