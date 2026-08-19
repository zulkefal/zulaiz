import Link from "next/link";

/*
  Wordmark plus a single geometric mark. The glyph is a "Z" cut from a rounded
  square, which is the only hand-drawn vector on the site.
*/
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zulaiz, home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <svg viewBox="0 0 32 32" aria-hidden className="size-7 shrink-0">
        <rect width="32" height="32" rx="9" fill="var(--accent)" />
        <path
          d="M10.5 11h11l-8.6 10h8.6"
          fill="none"
          stroke="var(--accent-contrast)"
          strokeWidth="2.6"
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
