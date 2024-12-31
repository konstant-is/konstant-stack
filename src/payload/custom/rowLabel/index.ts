export const arrayRowLabelField = (props: {
  prefix: string;
  fieldName: string;
}) => {
  return {
    path: `@konstant/payload/components#ArrayRowLabel`,
    clientProps: props,
  };
};
