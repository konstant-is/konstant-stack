import { FieldHook } from "payload";
import { textField } from "@/payload/fields";

const beforeValidateHook: FieldHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  originalDoc, // original document
}) => {
  const breadcrumbs = (data?.breadcrumbs || []).reverse();

  return breadcrumbs[0]?.url || "";
};

export const uriField = () => {
  return textField({
    name: "uri",
    index: false,
    required: false,
    hidden: false,
    localized: true,
    hooks: {
      beforeValidate: [beforeValidateHook],
    },
    unique: false,
    admin: {
      readOnly: false,
      position: "sidebar",
      components: {
        Field: {
          path: `@konstant/payload/components#UriComponent`,
        },
      },
    },
  });
};
