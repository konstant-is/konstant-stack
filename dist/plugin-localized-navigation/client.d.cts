import * as react_jsx_runtime from 'react/jsx-runtime';
import { UIFieldClientProps, TextFieldClientProps } from 'payload';
import React from 'react';
import { S as SlugifyOptions } from '../types-CiPlxUYe.cjs';
import 'node_modules/@payloadcms/plugin-nested-docs/dist/types';

type Props = UIFieldClientProps & {
    custom: {
        sourceField: string;
    };
};
declare const PermalinkComponent: (props: Props) => react_jsx_runtime.JSX.Element | null;

type SlugComponentProps = TextFieldClientProps & {
    custom: {
        watchFields: string[];
        checkboxFieldPath: string;
        slugifyOptions: SlugifyOptions;
    };
};
declare const SlugComponent: React.FC<SlugComponentProps>;

export { PermalinkComponent, SlugComponent };
