import Link from "next/link";
import { topicSlugFromName } from "@/lib/site";

const chipClass = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("ai") || n.includes("ml") || n.includes("drug discovery"))
    return "rf-chip rf-chip--ai";
  if (n.includes("neural") || n.includes("bci") || n.includes("neuro"))
    return "rf-chip rf-chip--neuro";
  if (
    n.includes("biotech") ||
    n.includes("crispr") ||
    n.includes("gene") ||
    n.includes("stem")
  )
    return "rf-chip rf-chip--biotech";
  return "rf-chip";
};

export function TopicChip({
  name,
  linked = true,
}: {
  name: string;
  linked?: boolean;
}) {
  const slug = topicSlugFromName(name);
  const className = chipClass(name);
  if (!linked) return <span className={className}>{name}</span>;
  return (
    <Link href={`/topics/${slug}/`} className={`${className} no-underline hover:opacity-80`}>
      {name}
    </Link>
  );
}
