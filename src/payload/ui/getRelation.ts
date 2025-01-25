import { getReference } from "./getReference.js";

type RelationProps<T> = {
  relationTo: string;
  value: string | T;
};

type FetchQuery<T> = (params: { collection: string; id: string }) => Promise<T>;

export const getRelation = <T>(props: RelationProps<T>) => {
  const { relationTo, value } = props;

  const getValue = (): null | T => getReference(value);

  const fetch = async <P>(query: FetchQuery<P>) => {
    return await query({
      id: value as string,
      collection: relationTo,
    });
  };

  const getOrFetchValue = async <P>(query: FetchQuery<P>): Promise<T | P> => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }

    const result = fetch(query);
    return result;
  };

  return {
    getOrFetchValue,
    getValue,
    relationTo,
  };
};
