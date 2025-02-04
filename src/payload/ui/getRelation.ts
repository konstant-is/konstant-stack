import { CollectionSlug, DefaultDocumentIDType, JsonValue } from "payload";
import { getReference } from "./getReference.js";

type RelationProps<T> = {
  relationTo: string;
  value: T | DefaultDocumentIDType;
};

type FetchDocArgs = { id: DefaultDocumentIDType; collection: CollectionSlug };

export const getRelation = <T>(props: RelationProps<T>) => {
  const { relationTo, value } = props;

  const getValue = (): null | T => getReference(value);

  const getOrFetchValue = async (
    queryCb: (args: FetchDocArgs) => Promise<T>
  ): Promise<T> => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }

    const result = await queryCb({
      id: value as DefaultDocumentIDType,
      collection: relationTo,
    });

    return result;
  };

  return {
    getOrFetchValue,
    getValue,
    relationTo,
  };
};
