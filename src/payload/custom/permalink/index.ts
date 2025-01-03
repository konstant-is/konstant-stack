import { Field } from "payload";

type Props = {
  fieldToUse?: string;
};
export const permalinkField = (props?: Props): Field => {
  const { fieldToUse = "uri" } = props || {};

  return {
    name: "permalink",
    type: "ui",
    admin: {
      components: {
        Field: {
          path: "@konstant/stack/payload/components#PermalinkField",
          clientProps: {
            fieldToUse,
          },
        },
      },
    },
  };
};
