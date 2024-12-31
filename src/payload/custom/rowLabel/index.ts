export const arrayRowLabelField = (props: {
  prefix: string;
  fieldName: string;
}) => {
  return {
    path: "@/payload/components#ArrayRowLabel",
    clientProps: props,
  };
};
