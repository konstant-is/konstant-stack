type ExtractKeys<T> = T extends string ? T : never;
/**
 * Get nested property of an object
 * @param obj
 * @param path
 * @returns {*}
 */
declare const getNestedProperty: (obj: any, path: string) => any;
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
declare function isObject(item: unknown): boolean;
/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
declare function deepMerge<T, R>(target: T, source: R): T;
declare const createObjectKeys: <T extends string>(keys: ExtractKeys<T>[]) => Record<ExtractKeys<T>, string>;

export { createObjectKeys, deepMerge, getNestedProperty, isObject };
