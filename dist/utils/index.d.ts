import deepMerge from 'deepmerge';
export { default as deepMerge } from 'deepmerge';
import React from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation.js';
import * as qs from 'qs-esm';
import * as _slugify from 'slugify';

declare const canUseDOM: boolean;

type ExtractKeys<T> = T extends string ? T : never;
/**
 * Creates an object where each key maps to its own name as a string.
 * @param keys - Array of keys to create the object from.
 * @returns An object where each key is assigned its own name as the value.
 */
declare const createObjectKeys: <T extends string>(keys: ExtractKeys<T>[]) => Record<T, string>;

declare const createQueryString: (query: any) => string;

/**
 * Fully-featured deepMerge.
 *
 * Array handling: Arrays in the target object are combined with the source object's arrays.
 */
declare function deepMergeWithCombinedArrays<T extends object>(obj1: object, obj2: object, options?: deepMerge.Options): T;
/**
 * Fully-featured deepMerge.
 *
 * Array handling: Arrays in the target object are replaced by the source object's arrays.
 */
declare function deepMergeWithSourceArrays<T extends object>(obj1: object, obj2: object): T;
/**
 * Fully-featured deepMerge. Does not clone React components by default.
 */
declare function deepMergeWithReactComponents<T extends object>(obj1: object, obj2: object): T;

/**
 * Decodes an array of URL-encoded strings.
 *
 * @param url - An array of URL-encoded strings.
 * @returns An array of decoded strings where each URL-encoded string is transformed into its decoded form.
 *
 * @example
 * // Decoding an array of URL-encoded strings
 * decodeUrl(["Hello%20World", "How%27s%20it%20going"]);
 * // Output: ["Hello World", "How's it going"]
 */
declare const decodeUrl: (url: string[]) => string[];
/**
 * Encodes a single string for use in a URL.
 *
 * @param url - A string to be URL-encoded.
 * @returns A URL-encoded version of the input string.
 *
 * @example
 * // Encoding a string for use in a URL
 * encodeUrl("Hello World");
 * // Output: "Hello%20World"
 */
declare const encodeUrl: (url: string) => string;

/**
 * Get a deeply nested property of an object based on a dot-separated path.
 * @param obj - The object to traverse.
 * @param path - Dot-separated string representing the path to the property.
 * @returns The value at the specified path or undefined if the path does not exist.
 */
declare const getNestedProperty: (obj: Record<string, unknown>, path: string) => any;

declare function isNumber(value: unknown): value is number;

declare function isPlainObject(o: any): boolean;

declare function isReactServerComponentOrFunction<T extends any>(component: any | React.ComponentType): component is T;
declare function isReactClientComponent<T extends any>(component: any | React.ComponentType): component is T;
declare function isReactComponentOrFunction<T extends any>(component: any | React.ComponentType): component is T;

declare function mapAsync<T, U>(arr: T[], callbackfn: (item: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;

declare const getServerSideURL: () => string;
declare const getClientSideURL: () => string;

/**
 * Checks if the given item is a plain object (not an array, null, or primitive).
 * @param item - The item to check.
 * @returns True if the item is an object, otherwise false.
 */
declare function isObject(item: unknown): boolean;

/**
 * A utility function to parse URLSearchParams into a ParsedQs object.
 * This function is a wrapper around the `qs` library.
 * In Next.js, the `useSearchParams()` hook from `next/navigation` returns a `URLSearchParams` object.
 * This function can be used to parse that object into a more usable format.
 * @param {ReadonlyURLSearchParams} searchParams - The URLSearchParams object to parse.
 * @returns {qs.ParsedQs} - The parsed query string object.
 */
declare function parseSearchParams(searchParams: ReadonlyURLSearchParams): qs.ParsedQs;

declare function removeUndefined<T extends object>(obj: T): T;

/**
 * Truncates a string to the specified length and adds an ellipsis.
 * @param str
 * @param length
 * @returns
 */
declare const truncate: (str?: string, length?: number) => string;
/**
 * Checks if a string contains another string (case-insensitive).
 * @param str
 * @param search
 * @returns
 */
declare const contains: (str: string | undefined, search: string) => boolean;
declare const slugify: typeof _slugify;
/**
 * Capitalizes the first letter
 * @param str
 * @returns
 */
declare const toCapitalized: (str?: string) => string;
declare const toKebabCase: (string: string) => string;

export { canUseDOM, contains, createObjectKeys, createQueryString, decodeUrl, deepMergeWithCombinedArrays, deepMergeWithReactComponents, deepMergeWithSourceArrays, encodeUrl, getClientSideURL, getNestedProperty, getServerSideURL, isNumber, isObject, isPlainObject, isReactClientComponent, isReactComponentOrFunction, isReactServerComponentOrFunction, mapAsync, parseSearchParams, removeUndefined, slugify, toCapitalized, toKebabCase, truncate };
