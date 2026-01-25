export function replaceById<T extends { id?: string }>(
  list: T[],
  id: string,
  updater: (item: T) => T,
): T[] {
  return list.map((item) => (item.id === id ? updater(item) : item));
}
