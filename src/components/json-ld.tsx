/*
  Renders one JSON-LD block. The "<" escape is the one Next's own guide uses:
  it stops a "</script>" inside any string from closing the tag early.
*/
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
