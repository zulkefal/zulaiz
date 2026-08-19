import Link from "next/link";

/*
  Wordmark plus the mark: a Z inside a rounded-square outline. Drawn as vector
  rather than an image so it recolours with the theme via var(--accent) and
  stays crisp at any size. The favicon uses a solid-fill variant instead
  (src/app/icon.svg), because this outline goes muddy at 16px.
*/
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zulaiz, home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <svg viewBox="0 0 32 32" aria-hidden className="size-7 shrink-0">
        <rect
          x="1.55"
          y="1.55"
          width="28.9"
          height="28.9"
          rx="8.4"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.9"
        />
        <path
          d="M10.2 11.2h11.6L10.2 20.8h11.6"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-text">
        Zulaiz
      </span>
    </Link>
  );
}
