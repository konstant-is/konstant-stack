import { FormatOptions } from 'date-fns';
export { isDate } from 'date-fns';

/**
 * Utility function to format a date with the specified format string.
 *
 * @param date - The date to format (can be Date, number, or string).
 * @param formatStr - The format string (default is 'PPP').
 * @param options - Additional format options.
 * @returns The formatted date string.
 */
declare const formatDate: (date: Date | number | string, formatStr?: string, options?: FormatOptions) => string;
/**
 * Utility function to format a date in ISO format.
 *
 * @param date - The date to format (can be Date, number, or string).
 * @returns The ISO formatted date string.
 */
declare const formatISODate: (date: Date | number | string) => string;
/**
 * Utility function to format a time with the specified format string.
 *
 * @param date - The date to format (can be Date, number, or string).
 * @param formatStr - The time format string (default is 'kk:mm').
 * @param options - Additional format options.
 * @returns The formatted time string.
 */
declare const formatTime: (date: Date | number | string, formatStr?: string, options?: FormatOptions) => string;

/**
 * Checks if a given date is between a start date and an end date (exclusive).
 *
 * @param date - The date to check (can be Date, number, or string).
 * @param start - The start date (can be Date, number, or string).
 * @param end - The end date (can be Date, number, or string).
 * @returns `true` if the date is between the start and end dates, otherwise `false`.
 */
declare const isBetween: (date: Date | number | string, start: Date | number | string, end: Date | number | string) => boolean;

export { formatDate, formatISODate, formatTime, isBetween };
