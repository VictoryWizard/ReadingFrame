/** Valid topic label for filters and chips (non-empty string). */
export function isValidTopic(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const cleaned = cleanTopicLabel(value);
  return cleaned.length > 0;
}

/** Strip invisible characters and whitespace from topic labels. */
export function cleanTopicLabel(value: string): string {
  return value
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeTopics(topics: unknown): string[] {
  if (!Array.isArray(topics)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of topics) {
    if (!isValidTopic(item)) continue;
    const label = cleanTopicLabel(item);
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(label);
  }
  return result.sort((a, b) => a.localeCompare(b));
}

export function normalizeTopic(value: string): string {
  return cleanTopicLabel(value).toLowerCase();
}
