import { Field } from 'payload';

type FieldCreateType<P = unknown> = {
    condition?: (data: any, siblingData: any) => boolean;
    description?: string;
    fields?: Field[];
    hidden?: boolean;
    hideGutter?: boolean;
    label?: string;
    localized?: boolean;
    name?: string;
    overrides?: Record<string, unknown>;
    required?: boolean;
} & P;
type FieldCreationFunction<P = unknown> = (props: FieldCreateType<P>) => Field;
declare function createField<P>(fieldFn: FieldCreationFunction<P>): (props?: FieldCreateType<P>) => Field;

export { type FieldCreateType as F, createField as c };
