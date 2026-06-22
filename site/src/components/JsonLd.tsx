/**
 * Renders one or more JSON-LD structured-data blocks.
 *
 * Server component — safe to use in layouts and pages. JSON is serialized with
 * the `<` → `<` escape recommended by the Next.js JSON-LD guide to prevent
 * the closing-tag XSS vector inside <script> blocks.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
