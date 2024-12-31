import React from 'react';
import { TextFieldClientProps, Field, TextField, TextareaField, NumberField, RichTextField, SelectField, TabsField, Tab, BlocksField, UploadField, GroupField, RowField, RadioField, CheckboxField, RelationshipField, ArrayField, DateField, CollapsibleField, PointField, EmailField, JSONField, UIField, Block, CollectionConfig, GlobalConfig } from 'payload';

type SlugComponentProps = {
    fieldToUse: string;
    checkboxFieldPath: string;
} & TextFieldClientProps;
declare const SlugComponent: React.FC<SlugComponentProps>;

declare const field: (props: Field) => Field;
declare const textField: (props: Omit<TextField, "type">) => Field;
declare const textareaField: (props: Omit<TextareaField, "type">) => Field;
declare const numberField: (props: Omit<NumberField, "type">) => Field;
declare const richTextField: (props: Omit<RichTextField, "type">) => Field;
declare const selectField: (props: Omit<SelectField, "type">) => Field;
declare const tabsField: (props: Omit<TabsField, "type">) => Field;
declare const tabField: (props: Tab) => Tab;
declare const blocksField: (props: Omit<BlocksField, "type">) => Field;
declare const uploadField: (props: Omit<UploadField, "type">) => Field;
declare const groupField: (props: Omit<GroupField, "type">) => Field;
declare const rowField: (props: Omit<RowField, "type">) => Field;
declare const radioField: (props: Omit<RadioField, "type">) => Field;
declare const checkboxField: (props: Omit<CheckboxField, "type">) => Field;
declare const relationshipField: (props: Omit<RelationshipField, "type">) => Field;
declare const arrayField: (props: Omit<ArrayField, "type">) => Field;
declare const dateField: (props: Omit<DateField, "type">) => Field;
declare const collapsibleField: (props: Omit<CollapsibleField, "type">) => CollapsibleField;
declare const pointField: (props: Omit<PointField, "type">) => Field;
declare const emailField: (props: Omit<EmailField, "type">) => Field;
declare const jsonField: (props: Omit<JSONField, "type">) => Field;
declare const uiField: (props: Omit<UIField, "type">) => Field;

type BlockConfig = Record<string, (props: unknown) => Block>;
type BlockKey = keyof BlockConfig;
declare const blockBuilder: (config: BlockConfig) => {
    filter: (predicate: (value: string, index: number) => boolean) => void;
    exclude: (...blocks: BlockKey[]) => /*elided*/ any;
    build: (params?: unknown) => Block[];
    only: (...blocks: BlockKey[]) => /*elided*/ any;
};
declare const blockBuilderHelper: (props: {
    config: BlockConfig;
}) => {
    filter: (predicate: (value: string, index: number) => boolean) => void;
    exclude: (...blocks: BlockKey[]) => /*elided*/ any;
    build: (params?: unknown) => Block[];
    only: (...blocks: BlockKey[]) => /*elided*/ any;
};

declare const createCollectionConfig: (config: CollectionConfig) => CollectionConfig;
declare const createGlobalConfig: (config: GlobalConfig) => GlobalConfig;
declare const createBlock: (block: Block) => Block;

type CreateFieldProps<P = unknown> = P & {
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
};
type FieldCreationFunction<P = unknown> = (props: CreateFieldProps<P>) => Field;
declare function createField<P>(fieldFn: FieldCreationFunction<P>): (props?: CreateFieldProps<P>) => Field;

export { type CreateFieldProps, SlugComponent, arrayField, blockBuilder, blockBuilderHelper, blocksField, checkboxField, collapsibleField, createBlock, createCollectionConfig, createField, createGlobalConfig, dateField, emailField, field, groupField, jsonField, numberField, pointField, radioField, relationshipField, richTextField, rowField, selectField, tabField, tabsField, textField, textareaField, uiField, uploadField };
