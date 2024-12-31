export const arrayRowLabelField = (props: {
  prefix: string;
  fieldName: string;
}) => {
  return {
    path: "@konstant/stack/payload/components#ArrayRowLabel",
    clientProps: props,
  };
};
