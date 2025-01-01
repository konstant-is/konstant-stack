import { Field } from "payload";

export const permalinkField = (): Field => {
  return {
    name: "permalink",
    type: "ui",
    admin: {
      components: {
        Field: "@konstant/stack/payload/components#PermalinkField",
      },
    },
  };
};
