import { Field } from "payload";

import { UrlFieldConfig } from "../types";

export const createUrlField = (config: UrlFieldConfig): Field => {
  return {
    type: "text",
    defaultValue: "",
    index: false, // Not indexed by default
    localized: true, // Supports localization
    name: config.fieldName,
    admin: {
      position: "sidebar",
      readOnly: true,
    },
  };
};
