// @ts-nocheck

// Define a utility type to extract the keys from a union type
type ExtractKeys<T> = T extends string ? T : never;

/**
 * Get nested property of an object
 * @param obj
 * @param path
 * @returns {*}
 */
export const getNestedProperty = (obj: any, path: string) => {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj,
    );
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */

export function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

// Create a generic function to create the record and options based on the type
export const createObjectKeys = <T extends string>(keys: ExtractKeys<T>[]) => {
  const values = keys.reduce(
    (acc, key) => {
      acc[key] = key;
      return acc;
    },
    {} as Record<ExtractKeys<T>, string>,
  );

  return values;
};
