import { format, formatISO, FormatOptions } from 'date-fns'

/**
 * Utility function to format a date with the specified format string.
 *
 * @param date - The date to format (can be Date, number, or string).
 * @param formatStr - The format string (default is 'PPP').
 * @param options - Additional format options.
 * @returns The formatted date string.
 */
export const formatDate = (
  date: Date | number | string,
  formatStr: string = 'PPP',
  options?: FormatOptions,
): string => {
  const dt = new Date(date)
  return format(dt, formatStr, { ...options })
}

/**
 * Utility function to format a date in ISO format.
 *
 * @param date - The date to format (can be Date, number, or string).
 * @returns The ISO formatted date string.
 */
export const formatISODate = (date: Date | number | string): string => {
  return formatISO(new Date(date))
}

/**
 * Utility function to format a time with the specified format string.
 *
 * @param date - The date to format (can be Date, number, or string).
 * @param formatStr - The time format string (default is 'kk:mm').
 * @param options - Additional format options.
 * @returns The formatted time string.
 */
export const formatTime = (
  date: Date | number | string,
  formatStr: string = 'kk:mm',
  options?: FormatOptions,
): string => {
  return formatDate(date, formatStr, options)
}
