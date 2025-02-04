import { JsonValue, DefaultDocumentIDType } from 'payload';

declare function getReference<T>(value: null | string | T | undefined): T | null;

type RelationValue = {
    [key: string]: JsonValue;
    id: DefaultDocumentIDType;
} | DefaultDocumentIDType;
type RelationProps<T extends RelationValue> = {
    relationTo: string;
    value: T;
};
declare const getRelation: <T extends RelationValue>(props: RelationProps<T>) => {
    getOrFetchValue: (queryCb: () => Promise<T>) => Promise<T>;
    getValue: () => null | T;
    relationTo: string;
};

export { getReference, getRelation };
