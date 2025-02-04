import { Field } from 'payload';

type PayloadQuery<P = unknown> = {
    depth?: number;
    limit?: number;
    locale?: string;
    page?: number;
} & P;
type FieldOverrides<P = unknown> = {
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

export type { FieldOverrides as F, PayloadQuery as P };
