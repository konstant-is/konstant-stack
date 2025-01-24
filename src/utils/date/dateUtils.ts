import { isDate, isAfter, isBefore } from 'date-fns'

/**
 * Checks if a given date is between a start date and an end date (exclusive).
 *
 * @param date - The date to check (can be Date, number, or string).
 * @param start - The start date (can be Date, number, or string).
 * @param end - The end date (can be Date, number, or string).
 * @returns `true` if the date is between the start and end dates, otherwise `false`.
 */
export const isBetween = (
  date: Date | number | string,
  start: Date | number | string,
  end: Date | number | string,
): boolean => {
  const dt = new Date(date)
  const startDt = new Date(start)
  const endDt = new Date(end)

  if (!isDate(dt) || !isDate(startDt) || !isDate(endDt)) {
    throw new Error('Invalid date provided')
  }

  return isAfter(dt, startDt) && isBefore(dt, endDt)
}

export { isDate }
