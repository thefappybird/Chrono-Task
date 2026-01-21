export function normalizeFilter(filter: string | string[]): string[] {
  return Array.isArray(filter)
    ? filter.map((f) => f.toLowerCase().trim()).filter(Boolean)
    : filter
        .toLowerCase()
        .split(" ")
        .map((f) => f.trim())
        .filter(Boolean);
}
