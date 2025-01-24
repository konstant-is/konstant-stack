import type { BasePayload, SanitizedConfig } from 'payload'

/**
 * Checks if a given string is a valid locale.
 * @param locale The locale string to validate.
 * @returns The validated locale if valid, otherwise throws an error.
 */
const isLocale = (locale: null | string | undefined, localeCodes: string[]): boolean => {
  if (!locale) {
    return false
  }

  return localeCodes.includes(locale)
}

/**
 * Validates and returns the locale.
 * @param locale The locale string to validate.
 * @returns The validated locale.
 */
export const getLocale = (config: SanitizedConfig, locale: null | string | undefined): string => {
  const { localization } = config
  if (!localization) {
    throw new Error(`Localization is not supported by Payload`)
  }
  const { defaultLocale, localeCodes } = localization

  if (isLocale(locale, localeCodes)) {
    return locale as string
  }

  return defaultLocale
}
