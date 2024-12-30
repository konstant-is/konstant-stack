import {
  format,
  formatISO,
  FormatOptions,
  isAfter,
  isBefore,
  isDate,
} from "date-fns";
import { is } from "date-fns/locale";

type DT = Date | number | string;

export const formatIso = (date: DT): string => {
  return formatISO(new Date(date));
};
export const dateFormat = (
  date: DT,
  formatStr: string = "PPP",
  options?: FormatOptions
): string => {
  const dt = new Date(date);
  return format(dt, formatStr, { ...options, locale: options?.locale || is });
};

export const timeFormat = (
  date: Date | number | string,
  formatStr: string = "kk:mm",
  options?: FormatOptions
): string => {
  const dt = new Date(date);
  return format(dt, formatStr, { ...options, locale: options?.locale || is });
};

export const isBetween = (date: DT, start: DT, end: DT) => {
  return isAfter(date, start) && isBefore(date, end);
};

export const useDate = () => {
  return {
    format,
    dateFormat,
    timeFormat,
    isBetween,
  };
};

export { isDate };
