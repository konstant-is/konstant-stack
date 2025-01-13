import { NestedDocsPluginConfig } from "node_modules/@payloadcms/plugin-nested-docs/dist/types";
import { CollectionSlug, TextField } from "payload";

export type LocalizedNavigationPluginOptions = {
  /**
   * The slugs of the collections this plugin should extend. If you need different configs for different collections, this plugin can be added to your config more than once having different collections.
   */
  collections: CollectionSlug[];
  slugField?: Partial<SlugFieldConfig>;
  urlField?: Partial<UrlFieldConfig>;
  localizedSlugField?: Partial<LocalizedSlugFieldConfig>;
  localizedUrlField?: Partial<LocalizedUrlFieldConfig>;
  usePermalink?: boolean;
  nestedDocsPlugin?: Omit<NestedDocsPluginConfig, "collections">;
};

export type LocalizedSlugFieldConfig = {
  sourceField: string; // The name of the source slug field
  fieldName: string; // The name of the field where localized slugs will be stored
  locales: string[];
};

export type LocalizedUrlFieldConfig = {
  fieldName: string; // The name of the field where localized slugs will be stored
  sourceField: string;
  locales: string[];
};

export type SlugFieldConfig = {
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

export type UrlFieldConfig = {
  fieldName: string;
  useNestedDocs: boolean;
  generateUrl?: GenerateURL;
};

/**
 * Provides additional options for the slugify function
 */
export type SlugifyOptions = {
  replacement?: string | undefined;
  remove?: RegExp | undefined;
  lower?: boolean | undefined;
  strict?: boolean | undefined;
  locale?: string | undefined;
  trim?: boolean | undefined;
};

export type PermalinkFieldConfig = {
  fieldName: string;
  sourceField: string;
};
