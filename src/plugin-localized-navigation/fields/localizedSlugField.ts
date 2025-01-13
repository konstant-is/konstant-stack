import { Field } from "payload";

import { LocalizedSlugFieldConfig } from "../types";

export const createLocalizedSlugsField = (
  config: LocalizedSlugFieldConfig
): Field => ({
  name: config.fieldName,
  type: "group",
  localized: false,
  admin: {
    readOnly: true,
    description: "Automatically generated localized slugs.",
  },
  fields: config.locales.map((locale) => ({
    name: locale,
    type: "text",
    defaultValue: "undefined",
    required: true,
    localized: false,
  })),
});
