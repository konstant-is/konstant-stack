import { textField } from "@/payload/fields";
import { deepMerge } from "@/utils";
import { formatSlug } from "@/utils/string";
import type { CheckboxField, Field, FieldHook, TextField } from "payload";

const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    // If the value is already a string, format it
    if (typeof value === "string") {
      return formatSlug(value);
    }

    // Ensure safe access to `data.slug`
    const slugValue = data?.slug ? data.slug.value : undefined;

    // Handle create operation or when the slug value is missing
    if (operation === "create" || !slugValue) {
      const fallbackData = data?.[fallback];

      if (typeof fallbackData === "string") {
        return formatSlug(fallbackData);
      }
    }

    // Return the existing value if no changes are needed
    return value;
  };
type Props = {
  fieldToUse?: string;
  overrides?: {
    slugOverrides?: Partial<TextField>;
    checkboxOverrides?: Partial<CheckboxField>;
  };
};
export const slugField = (props: Props): [Field, Field] => {
  const { fieldToUse = "title", overrides } = props || {};
  const { slugOverrides, checkboxOverrides } = overrides || {};

  const checkBoxField: CheckboxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar",
    },
  };

  const field = textField({
    name: "slug",
    label: "Slug",
    index: true,
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
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

  const fieldResult = deepMerge(field, slugOverrides);
  const checkboxResult = deepMerge(checkBoxField, checkboxOverrides);
  return [fieldResult, checkboxResult];
};
