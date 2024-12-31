import { FieldHook } from "payload";
import path from "path";
import { fileURLToPath } from "url";

import { textField } from "@/payload/fields";

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
          path: `${path.join(__dirname, "payload", "components")}#UriComponent`,
        },
      },
    },
  });
};
