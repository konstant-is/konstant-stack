import * as s from "slugify";

/**
 * Truncates a string to the specified length and adds an ellipsis.
 * @param str
 * @param length
 * @returns
 */
export const truncate = (str: string = "", length: number = 100): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

/**
 * Checks if a string contains another string (case-insensitive).
 * @param str
 * @param search
 * @returns
 */
export const contains = (str: string = "", search: string): boolean => {
  return str.toLowerCase().includes(search.toLowerCase());
};

// Fallback for CommonJS or ESM default export
export const slugify = s.default || s;

/**
 * Capitalizes the first letter
 * @param str
 * @returns
 */
export const toCapitalized = (str: string = ""): string => {
  if (!str.length) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toKebabCase = (string: string): string =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

/**
 * Transforms a camelCase or PascalCase string into a readable label.
 * E.g., "camelCase" → "Camel Case", "PascalCase" → "Pascal Case".
 */
export const toReadable = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handle consecutive uppercase letters
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
