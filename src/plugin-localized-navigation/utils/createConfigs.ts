import {
  LocalizedNavigationPluginOptions,
  LocalizedSlugFieldConfig,
  LocalizedUrlFieldConfig,
  SlugFieldConfig,
  UrlFieldConfig,
} from "../types";
import { useNestedDocs } from "./utils";

const createSlugFieldConfig = (
  config: Partial<SlugFieldConfig>,
  defaults: { fieldName: string; lockFieldName: string; locales: string[] },
): SlugFieldConfig => ({
  fieldName: config.fieldName || defaults.fieldName,
  lockFieldName: config.lockFieldName || defaults.lockFieldName,
  useFields: config.useFields || ["title"],
  slugify: {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: false,
    locale: "en",
    trim: true,
    ...(config.slugify || {}),
  },
});

const createLocalizedSlugFieldConfig = (
  config: Partial<LocalizedSlugFieldConfig>,
  defaults: { fieldName: string; sourceFieldName: string; locales: string[] },
): LocalizedSlugFieldConfig => ({
  fieldName: config.fieldName || defaults.fieldName,
  sourceField: config.sourceField || defaults.sourceFieldName,
  locales: config.locales || defaults.locales,
});

const createUrlFieldConfig = (
  config: Partial<UrlFieldConfig>,
  defaults: UrlFieldConfig,
): UrlFieldConfig => ({
  fieldName: config.fieldName || defaults.fieldName,
  useNestedDocs: config.useNestedDocs ?? defaults.useNestedDocs,
  generateUrl: config.generateUrl,
});

const createLocalizedUrlFieldConfig = (
  config: Partial<LocalizedUrlFieldConfig>,
  defaults: LocalizedUrlFieldConfig,
): LocalizedUrlFieldConfig => ({
  ...defaults,
  ...(config || {}),
});

export const createConfigs = (
  pluginConfig: LocalizedNavigationPluginOptions,
  locales: string[],
) => {
  const {
    slugField = {},
    localizedSlugField = {},
    urlField = {},
    localizedUrlField = {},
  } = pluginConfig;

  const slugFieldConfig = createSlugFieldConfig(slugField, {
    fieldName: "slug",
    lockFieldName: "slugLock",
    locales,
  });

  const localizedSlugFieldConfig = createLocalizedSlugFieldConfig(
    localizedSlugField,
    {
      fieldName: "slugs",
      sourceFieldName: slugFieldConfig.fieldName,
      locales,
    },
  );

  const urlFieldConfig = createUrlFieldConfig(urlField, {
    fieldName: "url",
    useNestedDocs: useNestedDocs(pluginConfig),
  });

  const localizedUrlFieldConfig = createLocalizedUrlFieldConfig(
    localizedUrlField,
    {
      fieldName: "Urls",
      sourceField: urlFieldConfig.fieldName,
      locales,
    },
  );

  return {
    slugFieldConfig,
    urlFieldConfig,
    localizedSlugFieldConfig,
    localizedUrlFieldConfig,
  };
};
