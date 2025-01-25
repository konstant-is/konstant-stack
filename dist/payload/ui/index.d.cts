declare function getReference<T>(value: null | string | T | undefined): T | null;

type RelationProps<T> = {
    relationTo: string;
    value: string | T;
};
type FetchQuery<T> = (params: {
    collection: string;
    id: string;
}) => Promise<T>;
declare const getRelation: <T>(props: RelationProps<T>) => {
    getOrFetchValue: <P>(query: FetchQuery<P>) => Promise<T | P>;
    getValue: () => null | T;
    relationTo: string;
};

export { getReference, getRelation };
