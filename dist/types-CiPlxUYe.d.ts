import { NestedDocsPluginConfig } from 'node_modules/@payloadcms/plugin-nested-docs/dist/types';
import { CollectionSlug } from 'payload';

type LocalizedNavigationPluginOptions = {
    /**
     * The slugs of the collections this plugin should extend. If you need different configs for different collections, this plugin can be added to your config more than once having different collections.
     */
    collections: CollectionSlug[];
    slugField?: Partial<SlugFieldConfig>;
    urlField?: Partial<UrlFieldConfig>;
    localizedSlugField?: Partial<LocalizedSlugFieldConfig>;
    localizedUrlField?: Partial<LocalizedUrlFieldConfig>;
    usePermalink?: boolean;
    appendLocaleToUrl?: "all" | "exclude-default" | "none";
    nestedDocsPlugin?: Omit<NestedDocsPluginConfig, "collections">;
};
type LocalizedSlugFieldConfig = {
    sourceField: string;
    fieldName: string;
    locales: string[];
};
type LocalizedUrlFieldConfig = {
    fieldName: string;
    sourceField: string;
    locales: string[];
};
type SlugFieldConfig = {
    fieldName: string;
    lockFieldName: string;
    /**
     * An array of string mapping the field path names, nested fields are supported here
     * @default {string[]} ['title']
     */
    useFields: string[];
    /**
     * Options passed to the slugify function
     * @default { lower: true }
     */
    slugify: SlugifyOptions;
};
type GenerateURL = (data: Record<string, unknown>) => string;
type UrlFieldConfig = {
    fieldName: string;
    generateUrl?: GenerateURL;
};
/**
 * Provides additional options for the slugify function
 */
type SlugifyOptions = {
    replacement?: string | undefined;
    remove?: RegExp | undefined;
    lower?: boolean | undefined;
    strict?: boolean | undefined;
    locale?: string | undefined;
    trim?: boolean | undefined;
};

export type { LocalizedNavigationPluginOptions as L, SlugifyOptions as S };
