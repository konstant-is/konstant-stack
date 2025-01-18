import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import type { CollectionSlug, Config, Plugin } from "payload";

import { createPermalinkField } from "./fields";
import {
  resolveUrl,
  resolveLocalizedUrl,
  resolveLocalizedSlugs,
} from "./hooks";

import { LocalizedNavigationPluginOptions } from "./types";
import { enhanceFields } from "./utils/enhanceFields";
import { getLocales, mergeHooks } from "./utils/utils";

export const localizedNavigationPlugin =
  (pluginConfig: LocalizedNavigationPluginOptions): Plugin =>
  async (config) => {
    const locales = getLocales(config);

    let enhancedConfig = config;

    if (pluginConfig.nestedDocsPlugin) {
      // Integrate nestedDocsPlugin and await its result
      enhancedConfig = await nestedDocsPlugin({
        collections: pluginConfig.collections,
        ...pluginConfig.nestedDocsPlugin,
      })(enhancedConfig);
    }

    return createPlugin({ pluginConfig, config: enhancedConfig, locales });
  };

const createPlugin = ({
  pluginConfig,
  config,
  locales,
}: {
  pluginConfig: LocalizedNavigationPluginOptions;
  config: Config;
  locales: string[];
}) => ({
  ...config,
  collections: (config.collections || []).map((collection) => {
    if (!pluginConfig.collections.includes(collection.slug as CollectionSlug)) {
      return collection; // Skip collections not included in the plugin config
    }

    // Enhance fields and configurations
    const { fields, configs } = enhanceFields({
      fields: collection.fields,
      config: pluginConfig,
      locales,
    });

    // Optionally add the permalink field
    const permalinkField =
      pluginConfig.usePermalink &&
      createPermalinkField({
        fieldName: "permalink",
        sourceField: configs.urlFieldConfig.fieldName,
      });

    return {
      ...collection,
      fields: permalinkField ? [permalinkField, ...fields] : [...fields],
      hooks: {
        ...(collection.hooks || {}),
        beforeChange: mergeHooks(
          [
            resolveUrl(pluginConfig, configs.urlFieldConfig),
            resolveLocalizedUrl(configs.localizedUrlFieldConfig),
            resolveLocalizedSlugs(configs.localizedSlugFieldConfig),
          ],
          collection.hooks?.beforeChange,
        ),
      },
    };
  }),
});
