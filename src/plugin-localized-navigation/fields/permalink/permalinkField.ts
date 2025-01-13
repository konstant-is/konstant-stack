import { Field } from "payload";

import { pluginConfig } from "../../config";
import { PermalinkFieldConfig } from "../../types";

export const createPermalinkField = (config: PermalinkFieldConfig): Field => {
  return {
    name: config.fieldName,
    type: "ui",
    admin: {
      components: {
        Field: {
          path: pluginConfig.getPath("client", "#PermalinkComponent"),

          clientProps: {
            custom: {
              sourceField: config.sourceField,
            },
          },
        },
      },
    },
  };
};
