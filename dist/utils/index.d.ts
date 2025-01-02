export { dateFormat, formatIso, isBetween, timeFormat, useDate } from './date.js';
export { deepMerge, getNestedProperty, isObject } from './object.js';
export { capitalize, formatSlug } from './string.js';
export { isDate } from 'date-fns';

declare const canUseDom: () => boolean;

type ExtractKeys<T> = T extends string ? T : never;
declare const createFieldOptions: <T extends string>(keys: ExtractKeys<T>[]) => {
    values: Record<ExtractKeys<T>, string>;
    options: {
        label: string;
        value: ExtractKeys<T>;
    }[];
};

declare function getReference<T>(ref: T | string | null | undefined): T | null;

declare const getServerSideURL: () => string;
declare const getClientSideURL: () => string;

export { canUseDom, createFieldOptions, getClientSideURL, getReference, getServerSideURL };
