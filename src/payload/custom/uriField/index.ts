import { textField } from "@/payload/fields";
import path from "path";
import { FieldHook } from "payload";

const beforeValidateHook: FieldHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  originalDoc, // original document
}) => {
  const breadcrumbs = (data?.breadcrumbs || []).reverse();

  return breadcrumbs[0]?.url || "";
};

export const uriField = () => {
  // Dynamically resolve the path to the component
  const resolvedPath = path.join(__dirname, "payload", "components");
  console.log(resolvedPath);

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
          path: `${resolvedPath}#UriComponent`,
        },
      },
    },
  });
};
