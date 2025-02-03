import { P as PayloadQuery } from '../types-96Og7R1r.cjs';
export { F as FieldOverrides } from '../types-96Og7R1r.cjs';
import * as payload from 'payload';
import { Block, CollectionConfig, GlobalConfig, Field, SanitizedConfig } from 'payload';
export { F as FieldCreateType, c as createField } from '../createField-CXDLLcBC.cjs';

type BlockConfig = Record<string, (props: unknown) => Block>;
type BlockKey = keyof BlockConfig;
declare const blockBuilder: (config: BlockConfig) => {
    build: (params?: unknown) => Block[];
    exclude: (...blocks: BlockKey[]) => /*elided*/ any;
    filter: (predicate: (value: string, index: number) => boolean) => void;
    only: (...blocks: BlockKey[]) => /*elided*/ any;
};
declare const blockBuilderHelper: (props: {
    config: BlockConfig;
}) => {
    build: (params?: unknown) => Block[];
    exclude: (...blocks: BlockKey[]) => /*elided*/ any;
    filter: (predicate: (value: string, index: number) => boolean) => void;
    only: (...blocks: BlockKey[]) => /*elided*/ any;
};

declare const createBlock: (block: Block) => Block;
type BlockWithSettingsProps<P = unknown> = P;
type BlockWithSettingsFn = <P>(props: BlockWithSettingsProps<P>) => Block;
declare const createBlockWithSettings: (fn: BlockWithSettingsFn) => (props: BlockWithSettingsProps) => Block;

declare const createCollectionConfig: (config: CollectionConfig) => CollectionConfig;

type ExtractKeys<T> = T extends string ? T : never;
declare const createFieldOptions: <T extends string>(keys: ExtractKeys<T>[]) => {
    options: {
        label: string;
        value: ExtractKeys<T>;
    }[];
    values: Record<T, string>;
};

declare const createGlobalConfig: (config: GlobalConfig) => GlobalConfig;

declare const field: (props: Field) => Field;

type SupportedLocale<T extends SanitizedConfig> = T["localization"] extends {
    locales: infer L;
} ? L extends string[] ? L[number] : never : never;
/**
 * Validates and returns the locale.
 * @param config The Payload config object.
 * @param locale The locale string to validate.
 * @returns The validated locale.
 */
declare const getLocale: <T extends SanitizedConfig>(config: T, locale: null | string | undefined) => SupportedLocale<T>;

declare const getPayloadContext: <T extends SanitizedConfig>(config: Promise<T> | T, params: PayloadQuery) => Promise<{
    draft: boolean;
    locale: never;
    payload: payload.BasePayload;
    query: {
        draft: boolean;
        locale: never;
        overrideAccess: boolean;
    };
}>;

export { PayloadQuery, blockBuilder, blockBuilderHelper, createBlock, createBlockWithSettings, createCollectionConfig, createFieldOptions, createGlobalConfig, field, getLocale, getPayloadContext };
