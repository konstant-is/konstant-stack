export const arrayRowLabelField = (props: {
  fieldName: string;
  prefix: string;
}) => {
  return {
    clientProps: props,
    path: "@konstant/stack/payload/client#ArrayRowLabel",
  };
};
