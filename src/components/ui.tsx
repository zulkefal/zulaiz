import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  className = "",
  id,
  children,
}: {
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/*
  Eyebrow is deliberately rare. Budget across the whole site is one per three
  sections, so reach for a headline alone before reaching for this.
*/
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </span>
  );
}

export function Heading({
  as: Tag = "h2",
  size = "lg",
  className = "",
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
  className?: string;
  children: ReactNode;
}) {
  const scale = {
    xl: "text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02] font-semibold",
    lg: "text-3xl sm:text-4xl font-semibold",
    md: "text-xl sm:text-2xl font-semibold",
  }[size];
  return <Tag className={`${scale} ${className}`}>{children}</Tag>;
}

export function Lead({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={`max-w-[62ch] text-lg leading-relaxed text-muted ${className}`}>
      {children}
    </p>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition duration-200 ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const variants = {
  primary:
    "rounded-full bg-accent px-5 py-3 text-sm text-accent-contrast hover:bg-accent-hover",
  secondary:
    "rounded-full border border-line-strong bg-raised px-5 py-3 text-sm text-text hover:border-accent hover:text-accent",
  link: "text-sm text-accent hover:text-accent-hover",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover ${className}`}
    >
      {children}
      <ArrowRightIcon
        weight="bold"
        className="size-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
      />
    </Link>
  );
}

/* Numbers are mono everywhere so metric rows line up optically. */
export function Metric({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="font-mono text-3xl font-medium tracking-tight text-text sm:text-4xl">
        {value}
      </div>
      <p className="mt-2 max-w-[24ch] text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}
