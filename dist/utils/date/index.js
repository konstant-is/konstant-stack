// src/utils/date/dateFormat.ts
import { format, formatISO } from "date-fns";
var formatDate = (date, formatStr = "PPP", options) => {
  const dt = new Date(date);
  return format(dt, formatStr, { ...options });
};
var formatISODate = (date) => {
  return formatISO(new Date(date));
};
var formatTime = (date, formatStr = "kk:mm", options) => {
  return formatDate(date, formatStr, options);
};

// src/utils/date/dateUtils.ts
import { isDate, isAfter, isBefore } from "date-fns";
var isBetween = (date, start, end) => {
  const dt = new Date(date);
  const startDt = new Date(start);
  const endDt = new Date(end);
  if (!isDate(dt) || !isDate(startDt) || !isDate(endDt)) {
    throw new Error("Invalid date provided");
  }
  return isAfter(dt, startDt) && isBefore(dt, endDt);
};
export {
  formatDate,
  formatISODate,
  formatTime,
  isBetween,
  isDate
};
//# sourceMappingURL=index.js.map