"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA, doorsFor, markets, nav } from "@/lib/site";
import { Logo } from "@/components/logo";
import { ServiceIcon } from "@/components/service-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui";

const SERVICES_HREF = "/services";

/*
  Desktop "Services" entry. The label stays a real link to the overview page,
  and a caret beside it opens a panel listing every service. Opens on hover
  for mouse users and on click for keyboard and touch. Closes on Escape, on a
  click anywhere outside, and on navigation.
*/
function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* A short grace period on leave, cancelled on re-enter, so a diagonal
     mouse path from the label into the panel does not slam it shut. */
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };
  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div
        className={`flex items-center rounded-full transition-colors ${
          active ? "text-accent" : "text-muted hover:text-text"
        }`}
      >
        <Link
          href={SERVICES_HREF}
          aria-current={active ? "page" : undefined}
          className="py-2 pl-3.5 pr-1 text-sm font-medium"
        >
          Services
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => {
            cancelClose();
            setOpen(true);
          }}
          aria-expanded={open}
          aria-controls="services-menu"
          aria-label="Show all services"
          className="grid size-7 place-items-center rounded-full"
        >
          <CaretDownIcon
            weight="bold"
            aria-hidden
            className={`size-3.5 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {open ? (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div
            id="services-menu"
            role="menu"
            aria-label="Services"
            className="w-80 rounded-card border border-line bg-raised p-2 shadow-[0_24px_60px_-28px_hsl(var(--shadow-tint)/0.55)]"
          >
          {/* One group per kind of customer, doors only. The ecommerce parts
              are listed on the ecommerce page, not here. */}
          {markets.map((market, mi) => (
            <div key={market.id} className={mi > 0 ? "mt-1 border-t border-line pt-1" : ""}>
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-subtle">
                {market.label}
              </p>
              {doorsFor(market).map((door) => (
                <div key={door.slug}>
                  <Link
                    href={door.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-input px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-sunken"
                  >
                    <ServiceIcon name={door.icon} className="size-5 shrink-0 text-accent" />
                    <span>{door.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          ))}
          <div className="mt-1 border-t border-line pt-1">
            <Link
              href={SERVICES_HREF}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-input px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-sunken"
            >
              All services
            </Link>
          </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState(pathname);
  const [lifted, setLifted] = useState(false);

  /* Close the mobile menu when the route changes, adjusted during render
     rather than in an effect. The desktop services panel closes itself on
     item click, and remounts on navigation anyway. */
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

            if (item.href === SERVICES_HREF) {
              return <ServicesMenu key={item.href} active={active} />;
            }

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
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-[10px] px-3 py-2.5 text-base font-medium text-text hover:bg-sunken"
                >
                  {item.label}
                </Link>
                {item.href === SERVICES_HREF ? (
                  <div className="mb-1 ml-3 grid gap-0.5 border-l border-line pl-3">
                    {markets.flatMap((market) =>
                      doorsFor(market).map((door) => (
                        <div key={door.slug}>
                          <Link
                            href={door.href}
                            className="flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-sm font-medium text-text hover:bg-sunken"
                          >
                            <ServiceIcon
                              name={door.icon}
                              className="size-4 shrink-0 text-accent"
                            />
                            {door.navLabel}
                          </Link>
                        </div>
                      )),
                    )}
                  </div>
                ) : null}
              </div>
            ))}
            <ButtonLink href={CTA.primaryHref} className="mt-4 w-full">
              {CTA.primary}
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
