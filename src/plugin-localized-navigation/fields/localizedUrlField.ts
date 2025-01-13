import { Field } from "payload";

import { LocalizedUrlFieldConfig } from "../types";

export const createLocalizedUrlField = (
  config: LocalizedUrlFieldConfig
): Field => {
  return {
    name: config.fieldName,
    type: "group",
    localized: false,
    admin: {
      readOnly: true,
      description: "Automatically generated localized urls.",
    },
    fields: config.locales.map((locale) => ({
      name: locale,
      type: "text",
      defaultValue: "undefined",
      required: true,
      localized: false,
    })),
  };
};
