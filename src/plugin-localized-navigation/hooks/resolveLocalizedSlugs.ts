import { CollectionBeforeChangeHook } from "payload";

import { LocalizedSlugFieldConfig } from "../types";

export const resolveLocalizedSlugs =
  (config: LocalizedSlugFieldConfig): CollectionBeforeChangeHook =>
  async ({ data, req, operation }) => {
    const { payload, locale } = req;
    const { defaultLocale } = payload.config.localization || {};
    const currentLocale = locale || defaultLocale || "en";

    if (operation === "create") {
      return data;
    }

    // Fetch source field value
    const sourceField = data[config.sourceField];
    if (!sourceField) {
      payload.logger.error(
        `Error: Missing source field "${config.sourceField}" while populating localized slugs.`,
      );

      return data;
    }

    // Fetch or initialize the localized slugs field
    const localizedSlugField = data[config.fieldName] || {};
    if (typeof localizedSlugField !== "object") {
      payload.logger.error(
        `Error: Localized slugs field "${config.fieldName}" is not an object.`,
      );
      return data;
    }

    // Update the localized field with the current locale's slug
    const updatedLocalizedField = {
      ...localizedSlugField,
      [currentLocale]: sourceField,
    };

    // Log successful operation
    payload.logger.info(
      `Localized slug updated for locale "${currentLocale}" in field "${config.fieldName}".`,
    );

    return {
      ...data,
      [config.fieldName]: updatedLocalizedField,
    };
  };
