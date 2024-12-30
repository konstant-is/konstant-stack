import { Block, CollectionConfig, GlobalConfig } from 'payload';
export { C as CreateFieldProps, c as createField } from '../../createField-BqTtYPfj.cjs';

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

export { blockBuilder, blockBuilderHelper, createBlock, createCollectionConfig, createGlobalConfig };
