import { CheckboxField, Field, TextField } from "payload";

import { pluginConfig } from "../../config";
import { validateSlug } from "../../hooks/validateSlug";
import { SlugFieldConfig, SlugifyOptions } from "../../types";

type Props = {
  config: SlugFieldConfig;
  slugOverrides?: Partial<TextField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

export const createSlugField = (props: Props): Field[] => {
  const { config, slugOverrides = {}, checkboxOverrides = {} } = props || {};
  const { useFields = ["title"] } = config;
  const checkBoxField: CheckboxField = {
    name: "slugLock",
    defaultValue: true,
    ...checkboxOverrides,
    admin: {
      hidden: true,
      position: "sidebar",
      ...checkboxOverrides.admin,
    },
    type: "checkbox",
  };

  const slugField: TextField = {
    name: "slug",
    type: "text",
    required: true,
    localized: true,
    index: true,
    unique: true,
    hooks: {
      beforeValidate: [validateSlug(config)],
    },
    admin: {
      position: "sidebar",
      components: {
        Field: {
          path: pluginConfig.getPath(
            "fields",
            "/slug/slugComponent#SlugComponent"
          ),

          clientProps: {
            custom: {
              watchFields: useFields,
              checkboxFieldPath: checkBoxField.name,
            },
          },
        },
      },
    },
  };

  return [slugField, checkBoxField];
};
