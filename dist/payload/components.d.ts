import * as react_jsx_runtime from 'react/jsx-runtime';
import { UIFieldClientProps, TextFieldClientProps } from 'payload';
import React from 'react';

type PermalinkProps = {
    fieldToUse: string;
} & UIFieldClientProps;
declare const PermalinkField: ({ fieldToUse }: PermalinkProps) => react_jsx_runtime.JSX.Element;

type SlugComponentProps = {
    fieldToUse: string;
    checkboxFieldPath: string;
} & TextFieldClientProps;
declare const SlugComponent: React.FC<SlugComponentProps>;

type UriFieldProps = {} & TextFieldClientProps;
declare const UriComponent: ({ path, field }: UriFieldProps) => react_jsx_runtime.JSX.Element;

type Props = {
    fieldName: string;
    prefix?: string;
    fallback?: string;
};
declare const ArrayRowLabel: (props: Props) => react_jsx_runtime.JSX.Element;

export { ArrayRowLabel, PermalinkField, SlugComponent, UriComponent };
