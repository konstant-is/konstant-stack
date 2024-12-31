import { textField } from "@/payload/fields/fields";
import { formatSlug } from "@/utils/string";
import type { CheckboxField, Field, FieldHook, TextField } from "payload";

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === "string") {
      return formatSlug(value);
    }

    if (operation === "create" || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        return formatSlug(fallbackData);
      }
    }

    return value;
  };

type Overrides = {
  slugOverrides?: Partial<TextField>;
  checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (fieldToUse?: string, overrides?: Overrides) => [Field, Field];

export const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides;

  const checkBoxField: CheckboxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
    ...checkboxOverrides,
  };

  const field = textField({
    name: "slug",
    label: "Slug",
    index: true,
    ...(slugOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: "@konstant/stack/payload/components#SlugComponent",
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  });

  return [field, checkBoxField];
};
