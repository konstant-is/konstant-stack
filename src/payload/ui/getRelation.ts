import { DefaultDocumentIDType, JsonValue } from "payload";
import { getReference } from "./getReference.js";

type RelationProps<T> = {
  relationTo: string;
  value: T | DefaultDocumentIDType;
};

export const getRelation = <T>(props: RelationProps<T>) => {
  const { relationTo, value } = props;

  const getValue = (): null | T => getReference(value);

  const getOrFetchValue = async (queryCb: () => Promise<T>): Promise<T> => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }

    const result = await queryCb();
    return result;
  };

  return {
    getOrFetchValue,
    getValue,
    relationTo,
  };
};
