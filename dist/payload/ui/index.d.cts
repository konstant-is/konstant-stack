import { DefaultDocumentIDType, CollectionSlug } from 'payload';

declare function getReference<T>(value: DefaultDocumentIDType | T | null | undefined): T | null;

type RelationProps<T> = {
    relationTo: string;
    value: T | DefaultDocumentIDType;
};
type FetchDocArgs = {
    id: DefaultDocumentIDType;
    collection: CollectionSlug;
};
declare const getRelation: <T>(props: RelationProps<T>) => {
    getOrFetchValue: (queryCb: (args: FetchDocArgs) => Promise<T>) => Promise<T>;
    getValue: () => null | T;
    relationTo: string;
};

export { getReference, getRelation };
