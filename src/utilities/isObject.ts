/**
 * Checks if the given item is a plain object (not an array, null, or primitive).
 * @param item - The item to check.
 * @returns True if the item is an object, otherwise false.
 */
export function isObject(item: unknown): boolean {
  return item !== null && typeof item === 'object' && !Array.isArray(item)
}
