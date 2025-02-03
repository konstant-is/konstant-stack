import type { Locale, SanitizedConfig } from "payload";

type LocaleCode = Locale["code"];

/**
 * Checks if a given string is a valid locale.
 * @param locale The locale string to validate.
 * @returns True if the locale is valid, otherwise false.
 */
const isLocale = <T extends SanitizedConfig>(
  locale: null | string | undefined,
  localeCodes: string[]
): locale is SupportedLocale<T> => {
  return !!locale && localeCodes.includes(locale as SupportedLocale<T>);
};

type SupportedLocale<T extends SanitizedConfig> = T["localization"] extends {
  locales: infer L;
}
  ? L extends string[]
    ? L[number]
    : never
  : never;

/**
 * Validates and returns the locale.
 * @param config The Payload config object.
 * @param locale The locale string to validate.
 * @returns The validated locale.
 */
export const getLocale = <T extends SanitizedConfig>(
  config: T,
  locale: null | string | undefined
): SupportedLocale<T> => {
  const { localization } = config;
  if (!localization) {
    throw new Error(`Localization is not supported by Payload`);
  }
  const { defaultLocale, localeCodes } = localization;

  if (isLocale<T>(locale, localeCodes)) {
    return locale;
  }

  return defaultLocale as SupportedLocale<T>;
};
