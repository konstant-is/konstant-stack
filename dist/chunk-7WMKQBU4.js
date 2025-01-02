// src/utils/date.ts
import {
  format,
  formatISO,
  isAfter,
  isBefore,
  isDate
} from "date-fns";
import { is } from "date-fns/locale";
var formatIso = (date) => {
  return formatISO(new Date(date));
};
var dateFormat = (date, formatStr = "PPP", options) => {
  const dt = new Date(date);
  return format(dt, formatStr, { ...options, locale: options?.locale || is });
};
var timeFormat = (date, formatStr = "kk:mm", options) => {
  const dt = new Date(date);
  return format(dt, formatStr, { ...options, locale: options?.locale || is });
};
var isBetween = (date, start, end) => {
  return isAfter(date, start) && isBefore(date, end);
};
var useDate = () => {
  return {
    format,
    dateFormat,
    timeFormat,
    isBetween
  };
};

export {
  isDate,
  formatIso,
  dateFormat,
  timeFormat,
  isBetween,
  useDate
};
//# sourceMappingURL=chunk-7WMKQBU4.js.map