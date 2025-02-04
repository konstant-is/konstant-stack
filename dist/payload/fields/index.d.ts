import * as payload from 'payload';
import { Field } from 'payload';
import { F as FieldCreateType } from '../../createField-CXDLLcBC.js';

declare const fields: Record<"addressLine1" | "addressLine2" | "city" | "location" | "postalCode" | "state", string>;
type FieldKeys = keyof typeof fields;
declare const addressField: (props?: FieldCreateType<{
    hideFields?: FieldKeys[];
}>) => payload.Field;

declare const arrayRowLabelField: (props: {
    fieldName: string;
    prefix: string;
}) => {
    clientProps: {
        fieldName: string;
        prefix: string;
    };
    path: string;
};

type Options = {
    relationTo: string[];
    showAppearance?: boolean;
};
declare const linkField: (props?: FieldCreateType<Options>) => Field;
declare const documentReferenceField: (props?: FieldCreateType<{
    relationTo: string[];
}>) => Field;

declare const weekdaysMap: Record<string, string>;
declare const openingHoursField: () => payload.Field;

declare const socialsOptions: {
    options: {
        label: string;
        value: "facebook" | "instagram" | "linkedin" | "strava" | "twitter";
    }[];
    values: Record<"facebook" | "instagram" | "linkedin" | "strava" | "twitter", string>;
};
type SocialsTypes = keyof typeof socialsOptions.values;
declare const socialsField: (props?: FieldCreateType<{
    showOnly: SocialsTypes[];
}>) => payload.Field;

declare const timeField: (props?: {
    condition?: (data: any, siblingData: any) => boolean;
    description?: string;
    fields?: payload.Field[];
    hidden?: boolean;
    hideGutter?: boolean;
    label?: string;
    localized?: boolean;
    name?: string;
    overrides?: Record<string, unknown>;
    required?: boolean;
}) => payload.Field;

declare const urlField: (props?: {
    condition?: (data: any, siblingData: any) => boolean;
    description?: string;
    fields?: payload.Field[];
    hidden?: boolean;
    hideGutter?: boolean;
    label?: string;
    localized?: boolean;
    name?: string;
    overrides?: Record<string, unknown>;
    required?: boolean;
}) => payload.Field;

export { addressField, arrayRowLabelField, documentReferenceField, linkField, openingHoursField, socialsField, timeField, urlField, weekdaysMap };
