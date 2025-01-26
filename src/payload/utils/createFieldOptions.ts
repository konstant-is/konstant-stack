import { createObjectKeys, toReadable } from "@/utils/index.js";

// Define a utility type to extract the keys from a union type
type ExtractKeys<T> = T extends string ? T : never;

// Create a generic function to create the record and options based on the type
export const createFieldOptions = <T extends string>(
  keys: ExtractKeys<T>[]
) => {
  const values = createObjectKeys(keys);

  const options = keys.map((key) => ({
    label: toReadable(key),
    value: key,
  }));

  return { options, values };
};
