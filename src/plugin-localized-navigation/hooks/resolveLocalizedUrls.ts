import { CollectionBeforeChangeHook } from "payload";

import { LocalizedUrlFieldConfig } from "../types";

export const resolveLocalizedUrl =
  (config: LocalizedUrlFieldConfig): CollectionBeforeChangeHook =>
  ({ data, operation, req }) => {
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
      [currentLocale]: sourceField,
    };

    return {
      ...data,
      [config.fieldName]: updated,
    };
  };
