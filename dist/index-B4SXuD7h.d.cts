declare const arrayRowLabelField: (props: {
    prefix: string;
    fieldName: string;
}) => {
    path: string;
    clientProps: {
        prefix: string;
        fieldName: string;
    };
};

export { arrayRowLabelField as a };
