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

export { deepMerge, getNestedProperty, isObject };
