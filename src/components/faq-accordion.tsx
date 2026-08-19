import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

/*
  Native disclosure elements: keyboard accessible, works without JavaScript,
  and the right component for a list this long.
*/
export function FaqAccordion({
  items,
  className = "",
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <details
          key={item.q}
          className={`group py-5 ${i > 0 ? "border-t border-line" : ""}`}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-text transition-colors group-hover:text-accent sm:text-lg">
              {item.q}
            </h3>
            <PlusIcon
              weight="bold"
              aria-hidden
              className="mt-1 size-4 shrink-0 text-accent transition-transform duration-300 ease-[var(--ease-out-soft)] group-open:rotate-45"
            />
          </summary>
          <p className="mt-3 max-w-[70ch] pr-10 text-base leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
