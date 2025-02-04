import { DefaultDocumentIDType } from 'payload';

declare function getReference<T>(value: DefaultDocumentIDType | T | null | undefined): T | null;

type RelationProps<T> = {
    relationTo: string;
    value: T | DefaultDocumentIDType;
};
declare const getRelation: <T>(props: RelationProps<T>) => {
    getOrFetchValue: (queryCb: () => Promise<T>) => Promise<T>;
    getValue: () => null | T;
    relationTo: string;
};

export { getReference, getRelation };
