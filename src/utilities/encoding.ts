/**
 * Decodes an array of URL-encoded strings.
 *
 * @param url - An array of URL-encoded strings.
 * @returns An array of decoded strings where each URL-encoded string is transformed into its decoded form.
 *
 * @example
 * // Decoding an array of URL-encoded strings
 * decodeUrl(["Hello%20World", "How%27s%20it%20going"]);
 * // Output: ["Hello World", "How's it going"]
 */
export const decodeUrl = (url: string[]): string[] => {
  // Use the map function to iterate over each string in the array
  // and apply the decodeURIComponent function to decode the string.
  return url.map((s) => decodeURIComponent(s))
}

/**
 * Encodes a single string for use in a URL.
 *
 * @param url - A string to be URL-encoded.
 * @returns A URL-encoded version of the input string.
 *
 * @example
 * // Encoding a string for use in a URL
 * encodeUrl("Hello World");
 * // Output: "Hello%20World"
 */
export const encodeUrl = (url: string): string => {
  // Encode a single string
  return encodeURIComponent(url)
}
