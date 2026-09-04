import type { Tool } from "@/lib/site";
import { ToolOrbit } from "@/components/tool-orbit";
import { Container, Heading } from "@/components/ui";

/*
  "We work in your tools" with the orbit beside it. The overview at
  /services renders it with every curated tool and the general sentence; a
  service page renders it with only that job's tools and its own sentence,
  so the same section reads as specific on each page rather than pasted.
  `tone` lets a page keep its light-dark alternation of section backgrounds.
*/
const GENERAL =
  "Whatever you already run, we log in as named users and work inside it. Nothing migrates to a system you cannot audit.";

export function ToolsSection({
  tools,
  body = GENERAL,
  tone = "sunken",
}: {
  tools: Tool[];
  body?: string;
  tone?: "sunken" | "plain";
}) {
  return (
    <section
      className={`border-b border-line py-20 sm:py-28 ${
        tone === "sunken" ? "bg-sunken" : ""
      }`}
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Heading className="max-w-[16ch]">
              We work in your tools, not ours.
            </Heading>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted">
              {body}
            </p>
          </div>
          <div className="lg:col-span-7">
            {/* A short list gets the smaller orbit so its chips sit close. */}
            <ToolOrbit tools={tools} compact={tools.length <= 10} />
          </div>
        </div>
      </Container>
    </section>
  );
}
