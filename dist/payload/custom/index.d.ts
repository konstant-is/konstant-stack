import * as payload from 'payload';
import { Field, FieldHook, TextField, CheckboxField } from 'payload';
import { C as CreateFieldProps } from '../../createField-BqTtYPfj.js';

declare const fields: {
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
    postalCode: string;
    location: string;
};
type FieldKeys = keyof typeof fields;
declare const addressField: (props?: CreateFieldProps<{
    hideFields?: FieldKeys[];
}>) => payload.Field;

type LinkAppearance = "default" | "button" | "cta" | "link" | "custom";
declare const linkField: (props?: CreateFieldProps<{
    relationTo: string | string[];
    appearance?: LinkAppearance;
}>) => Field;
declare const externalLinkField: (props?: {
    overrides?: Record<string, unknown>;
    fields?: Field[];
    required?: boolean;
    label?: string;
    name?: string;
    condition?: (data: any, siblingData: any) => boolean;
    hideGutter?: boolean;
    hidden?: boolean;
    description?: string;
    localized?: boolean;
}) => Field;
declare const internalLinkField: (props?: CreateFieldProps<{
    relationTo: string | string[];
}>) => Field;

declare const formatSlugHook: (fallback: string) => FieldHook;
type Overrides = {
    slugOverrides?: Partial<TextField>;
    checkboxOverrides?: Partial<CheckboxField>;
};
type Slug = (fieldToUse?: string, overrides?: Overrides) => [Field, Field];
declare const slugField: Slug;

declare const timeField: (props?: {
    overrides?: Record<string, unknown>;
    fields?: payload.Field[];
    required?: boolean;
    label?: string;
    name?: string;
    condition?: (data: any, siblingData: any) => boolean;
    hideGutter?: boolean;
    hidden?: boolean;
    description?: string;
    localized?: boolean;
}) => payload.Field;

declare const urlField: (props?: {
    overrides?: Record<string, unknown>;
    fields?: payload.Field[];
    required?: boolean;
    label?: string;
    name?: string;
    condition?: (data: any, siblingData: any) => boolean;
    hideGutter?: boolean;
    hidden?: boolean;
    description?: string;
    localized?: boolean;
}) => payload.Field;

declare const weekdaysMap: Record<string, string>;
declare const openingHoursField: (props?: {
    overrides?: Record<string, unknown>;
    fields?: payload.Field[];
    required?: boolean;
    label?: string;
    name?: string;
    condition?: (data: any, siblingData: any) => boolean;
    hideGutter?: boolean;
    hidden?: boolean;
    description?: string;
    localized?: boolean;
}) => payload.Field;

type SocialsTypes = "facebook" | "instagram" | "twitter" | "linkedin" | "strava";
declare const socialsField: (props?: CreateFieldProps<{
    showOnly: SocialsTypes[];
}>) => payload.Field;

export { addressField, externalLinkField, formatSlugHook, internalLinkField, linkField, openingHoursField, slugField, socialsField, timeField, urlField, weekdaysMap };
