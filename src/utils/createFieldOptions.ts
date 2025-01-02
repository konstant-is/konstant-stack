import { capitalize } from "./string";

// Define a utility type to extract the keys from a union type
type ExtractKeys<T> = T extends string ? T : never;

// Create a generic function to create the record and options based on the type
export const createFieldOptions = <T extends string>(
  keys: ExtractKeys<T>[],
) => {
  const values = keys.reduce(
    (acc, key) => {
      acc[key] = key;
      return acc;
    },
    {} as Record<ExtractKeys<T>, string>,
  );

  const options = keys.map((key) => ({
    label: capitalize(key),
    value: key,
  }));

  return { values, options };
};
