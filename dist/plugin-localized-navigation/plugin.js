// src/plugin-localized-navigation/plugin.ts
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

// src/plugin-localized-navigation/fields/localizedSlugField.ts
var createLocalizedSlugsField = (config) => ({
  name: config.fieldName,
  type: "group",
  localized: false,
  admin: {
    readOnly: true,
    description: "Automatically generated localized slugs."
  },
  fields: config.locales.map((locale) => ({
    name: locale,
    type: "text",
    defaultValue: "undefined",
    required: true,
    localized: false
  }))
});

// src/plugin-localized-navigation/fields/localizedUrlField.ts
var createLocalizedUrlField = (config) => {
  return {
    name: config.fieldName,
    type: "group",
    localized: false,
    admin: {
      readOnly: true,
      description: "Automatically generated localized urls."
    },
    fields: config.locales.map((locale) => ({
      name: locale,
      type: "text",
      defaultValue: "",
      required: true,
      localized: false
    }))
  };
};

// src/plugin-localized-navigation/config.ts
var pluginPath = "@konstant/stack/plugin-localized-navigation";
var pluginConfig = {
  basePath: pluginPath,
  // Base path for the plugin
  paths: {
    client: `${pluginPath}/client`,
    fields: `${pluginPath}/fields`
  },
  settings: {
    defaultLocale: "en",
    // Default locale for the plugin
    enableLogging: true
    // Toggle logging for debugging
  },
  // Helper function to generate a path dynamically
  getPath: (type, subPath = "") => {
    const base = pluginConfig.paths[type];
    if (!base) {
      throw new Error(`Invalid path type: ${type}`);
    }
    return `${base}${subPath}`;
  }
};

// src/plugin-localized-navigation/fields/permalink/permalinkField.ts
var createPermalinkField = (config) => {
  return {
    name: config.fieldName,
    type: "ui",
    admin: {
      components: {
        Field: {
          path: pluginConfig.getPath("client", "#PermalinkComponent"),
          clientProps: {
            custom: {
              sourceField: config.sourceField
            }
          }
        }
      }
    }
  };
};

// src/plugin-localized-navigation/hooks/validateSlug.ts
import slugify from "slugify";

// src/plugin-localized-navigation/utils/logger.ts
var logger = (shouldLog = true) => {
  let indent = 0;
  const init = () => {
    setIndent(0);
  };
  const section = (title) => {
    if (!shouldLog) return;
    console.log("");
    console.log(title);
    console.log("----------------------------------");
    indent = 4;
  };
  const info = (...messages) => {
    if (!shouldLog) return;
    console.log(`${" ".repeat(indent)}`, ...messages);
  };
  const setIndent = (newIndent) => {
    indent = newIndent;
  };
  return {
    init,
    section,
    info,
    setIndent
  };
};

// src/plugin-localized-navigation/hooks/validateSlug.ts
var validateSlug = (config) => ({ siblingData, value, originalDoc, data, req }) => {
  const log = logger(false);
  log.section("validateSlug");
  log.info("lockName:", config.lockFieldName);
  const slugLock = siblingData[config.lockFieldName];
  log.info("lockSlug:", slugLock);
  if (!slugLock) {
    return value;
  }
  let missingFields = [];
  const fields = config.useFields.map((field) => {
    const fieldValue = data?.[field] || null;
    if (!fieldValue) {
      missingFields.push(field);
    }
    return fieldValue;
  });
  if (missingFields.length > 0) {
    console.warn("Missing fields for slug generation:", missingFields);
    return value;
  }
  const separator = config.slugify.replacement ?? "-";
  const processedSlug = fields.filter((item) => Boolean(item)).map((fieldValue) => slugify(String(fieldValue), config.slugify)).join(separator);
  log.info("Generated slug:", processedSlug);
  return processedSlug;
};

// src/plugin-localized-navigation/fields/slug/slugField.ts
var createSlugField = (props) => {
  const { config, slugOverrides = {}, checkboxOverrides = {} } = props || {};
  const { useFields = ["title"] } = config;
  const checkBoxField = {
    name: "slugLock",
    defaultValue: true,
    ...checkboxOverrides,
    admin: {
      hidden: true,
      position: "sidebar",
      ...checkboxOverrides.admin
    },
    type: "checkbox"
  };
  const slugField = {
    name: "slug",
    type: "text",
    required: true,
    localized: true,
    index: true,
    unique: true,
    hooks: {
      beforeValidate: [validateSlug(config)]
    },
    admin: {
      position: "sidebar",
      components: {
        Field: {
          path: pluginConfig.getPath("client", "#SlugComponent"),
          clientProps: {
            custom: {
              watchFields: useFields,
              checkboxFieldPath: checkBoxField.name
            }
          }
        }
      }
    }
  };
  return [slugField, checkBoxField];
};

// src/plugin-localized-navigation/fields/urlField.ts
var createUrlField = (config) => {
  return {
    type: "text",
    defaultValue: "",
    index: false,
    // Not indexed by default
    localized: true,
    // Supports localization
    name: config.fieldName,
    admin: {
      position: "sidebar",
      readOnly: true
    }
  };
};

// src/plugin-localized-navigation/hooks/resolveLocalizedUrls.ts
var resolveLocalizedUrl = (config) => ({ data, operation, req }) => {
  const { payload, locale } = req;
  const { defaultLocale } = payload.config.localization || {};
  const currentLocale = locale || defaultLocale || "en";
  if (operation === "create") {
    return data;
  }
  const sourceField = data[config.sourceField];
  if (!sourceField) {
    payload.logger.error(
      `Error: Missing source field "${config.sourceField}" while resolving localized url.`
    );
    return data;
  }
  const field = data[config.fieldName] || {};
  if (typeof field !== "object") {
    payload.logger.error(
      `Error: Localized url field "${config.fieldName}" is not an object.`
    );
    return data;
  }
  const updated = {
    ...field,
    [currentLocale]: sourceField
  };
  return {
    ...data,
    [config.fieldName]: updated
  };
};

// src/plugin-localized-navigation/hooks/resolveUrl.ts
var resolveUrl = (pluginConfig2, config) => ({ data, req }) => {
  const { payload, locale } = req;
  const { defaultLocale = "en" } = payload.config.localization || {};
  const currentLocale = locale || defaultLocale || "en";
  const useNestedDocs = pluginConfig2.nestedDocsPlugin !== void 0;
  const log = logger(false);
  log.section("resolveUrl");
  const baseUrl = generateUrl(config, data, useNestedDocs);
  log.info("Base URL generated:", baseUrl);
  const resolvedUrl = resolveFinalUrl({
    baseUrl,
    locale: currentLocale,
    defaultLocale,
    appendTo: pluginConfig2.appendLocaleToUrl
  });
  log.info("Final resolved URL:", resolvedUrl);
  return {
    ...data,
    [config.fieldName]: resolvedUrl
  };
};
var generateUrl = (config, data, useNestedDocs) => {
  const generatedUrl = typeof config.generateUrl === "function" ? config.generateUrl(data) : "";
  if (useNestedDocs) {
    const breadcrumbs = Array.isArray(data.breadcrumbs) ? data.breadcrumbs : [];
    const nestedUrl = breadcrumbs.reverse()[0]?.url || "";
    return nestedUrl || generatedUrl;
  }
  return generatedUrl;
};
var resolveFinalUrl = ({
  baseUrl,
  appendTo = "none",
  locale,
  defaultLocale
}) => {
  switch (appendTo) {
    case "all":
      return `/${locale}${baseUrl}`;
    case "exclude-default":
      return locale === defaultLocale ? baseUrl : `/${locale}${baseUrl}`;
    default:
      return baseUrl;
  }
};

// src/plugin-localized-navigation/hooks/resolveLocalizedSlugs.ts
var resolveLocalizedSlugs = (config) => async ({ data, req, operation }) => {
  const { payload, locale } = req;
  const { defaultLocale } = payload.config.localization || {};
  const currentLocale = locale || defaultLocale || "en";
  if (operation === "create") {
    return data;
  }
  const sourceField = data[config.sourceField];
  if (!sourceField) {
    payload.logger.error(
      `Error: Missing source field "${config.sourceField}" while populating localized slugs.`
    );
    return data;
  }
  const localizedSlugField = data[config.fieldName] || {};
  if (typeof localizedSlugField !== "object") {
    payload.logger.error(
      `Error: Localized slugs field "${config.fieldName}" is not an object.`
    );
    return data;
  }
  const updatedLocalizedField = {
    ...localizedSlugField,
    [currentLocale]: sourceField
  };
  payload.logger.info(
    `Localized slug updated for locale "${currentLocale}" in field "${config.fieldName}".`
  );
  return {
    ...data,
    [config.fieldName]: updatedLocalizedField
  };
};

// src/plugin-localized-navigation/utils/createConfigs.ts
var createSlugFieldConfig = (config, defaults) => ({
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
    ...config.slugify || {}
  }
});
var createLocalizedSlugFieldConfig = (config, defaults) => ({
  fieldName: config.fieldName || defaults.fieldName,
  sourceField: config.sourceField || defaults.sourceFieldName,
  locales: config.locales || defaults.locales
});
var createUrlFieldConfig = (config, defaults) => ({
  fieldName: config.fieldName || defaults.fieldName,
  generateUrl: config.generateUrl
});
var createLocalizedUrlFieldConfig = (config, defaults) => ({
  ...defaults,
  ...config || {}
});
var createConfigs = (pluginConfig2, locales) => {
  const {
    slugField = {},
    localizedSlugField = {},
    urlField = {},
    localizedUrlField = {}
  } = pluginConfig2;
  const slugFieldConfig = createSlugFieldConfig(slugField, {
    fieldName: "slug",
    lockFieldName: "slugLock",
    locales
  });
  const localizedSlugFieldConfig = createLocalizedSlugFieldConfig(
    localizedSlugField,
    {
      fieldName: "slugs",
      sourceFieldName: slugFieldConfig.fieldName,
      locales
    }
  );
  const urlFieldConfig = createUrlFieldConfig(urlField, {
    fieldName: "url"
  });
  const localizedUrlFieldConfig = createLocalizedUrlFieldConfig(
    localizedUrlField,
    {
      fieldName: "urls",
      sourceField: urlFieldConfig.fieldName,
      locales
    }
  );
  return {
    slugFieldConfig,
    urlFieldConfig,
    localizedSlugFieldConfig,
    localizedUrlFieldConfig
  };
};

// src/plugin-localized-navigation/utils/enhanceFields.ts
var enhanceFields = ({
  config,
  fields,
  locales
}) => {
  const log = logger(false);
  log.section("enhanceFields");
  let updatedFields = [...fields];
  const indexedFields = fields.reduce(
    (index, field) => {
      if ("name" in field && typeof field.name === "string") {
        index[field.name] = field;
      }
      return index;
    },
    {}
  );
  const addFields = (newFields) => {
    newFields.forEach((field) => {
      if ("name" in field && typeof field.name === "string") {
        if (!indexedFields[field.name]) {
          updatedFields.push(field);
          indexedFields[field.name] = field;
          log.info(`Field added: ${field.name}`);
        } else {
          log.info(`Field already exists: ${field.name}`);
        }
      } else {
        console.warn("Field without a name encountered. Skipping:", field);
      }
    });
  };
  const {
    slugFieldConfig,
    urlFieldConfig,
    localizedSlugFieldConfig,
    localizedUrlFieldConfig
  } = createConfigs(config, locales);
  if (!indexedFields[slugFieldConfig.fieldName]) {
    const slugFields = createSlugField({ config: slugFieldConfig });
    log.info(`Adding slug fields for: ${slugFieldConfig.fieldName}`);
    addFields(slugFields);
  }
  if (!indexedFields[localizedSlugFieldConfig.fieldName]) {
    const localizedField = createLocalizedSlugsField(localizedSlugFieldConfig);
    log.info(
      `Adding localized slug field: ${localizedSlugFieldConfig.fieldName}`
    );
    addFields([localizedField]);
  }
  if (!indexedFields[urlFieldConfig.fieldName]) {
    const field = createUrlField(urlFieldConfig);
    log.info(`Adding URL field: ${urlFieldConfig.fieldName}`);
    addFields([field]);
  }
  if (!indexedFields[localizedUrlFieldConfig.fieldName]) {
    const field = createLocalizedUrlField(localizedUrlFieldConfig);
    log.info(
      `Adding Localized URL field: ${localizedUrlFieldConfig.fieldName}`
    );
    addFields([field]);
  }
  return {
    fields: updatedFields,
    configs: {
      slugFieldConfig,
      localizedSlugFieldConfig,
      urlFieldConfig,
      localizedUrlFieldConfig
    }
  };
};

// src/plugin-localized-navigation/utils/utils.ts
var getLocales = (config) => {
  const { locales } = config.localization || {};
  if (!locales || locales.length === 0) {
    throw new Error(
      "Localization is required but not enabled. Please configure 'localization.locales' in Payload CMS."
    );
  }
  return locales.map((locale) => String(locale));
};
var mergeHooks = (newHooks, existingHooks) => {
  return [...existingHooks || [], ...newHooks];
};

// src/plugin-localized-navigation/plugin.ts
var localizedNavigationPlugin = (pluginConfig2) => async (config) => {
  const locales = getLocales(config);
  let enhancedConfig = config;
  if (pluginConfig2.nestedDocsPlugin) {
    enhancedConfig = await nestedDocsPlugin({
      collections: pluginConfig2.collections,
      ...pluginConfig2.nestedDocsPlugin
    })(enhancedConfig);
  }
  return createPlugin({ pluginConfig: pluginConfig2, config: enhancedConfig, locales });
};
var createPlugin = ({
  pluginConfig: pluginConfig2,
  config,
  locales
}) => ({
  ...config,
  collections: (config.collections || []).map((collection) => {
    if (!pluginConfig2.collections.includes(collection.slug)) {
      return collection;
    }
    const { fields, configs } = enhanceFields({
      fields: collection.fields,
      config: pluginConfig2,
      locales
    });
    const permalinkField = pluginConfig2.usePermalink && createPermalinkField({
      fieldName: "permalink",
      sourceField: configs.urlFieldConfig.fieldName
    });
    return {
      ...collection,
      fields: permalinkField ? [permalinkField, ...fields] : [...fields],
      hooks: {
        ...collection.hooks || {},
        beforeChange: mergeHooks(
          [
            resolveUrl(pluginConfig2, configs.urlFieldConfig),
            resolveLocalizedUrl(configs.localizedUrlFieldConfig),
            resolveLocalizedSlugs(configs.localizedSlugFieldConfig)
          ],
          collection.hooks?.beforeChange
        )
      }
    };
  })
});
export {
  localizedNavigationPlugin
};
//# sourceMappingURL=plugin.js.map