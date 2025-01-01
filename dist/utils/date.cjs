"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/date.ts
var date_exports = {};
__export(date_exports, {
  dateFormat: () => dateFormat,
  formatIso: () => formatIso,
  isBetween: () => isBetween,
  isDate: () => import_date_fns.isDate,
  timeFormat: () => timeFormat,
  useDate: () => useDate
});
module.exports = __toCommonJS(date_exports);
var import_date_fns = require("date-fns");
var import_locale = require("date-fns/locale");
var formatIso = (date) => {
  return (0, import_date_fns.formatISO)(new Date(date));
};
var dateFormat = (date, formatStr = "PPP", options) => {
  const dt = new Date(date);
  return (0, import_date_fns.format)(dt, formatStr, { ...options, locale: options?.locale || import_locale.is });
};
var timeFormat = (date, formatStr = "kk:mm", options) => {
  const dt = new Date(date);
  return (0, import_date_fns.format)(dt, formatStr, { ...options, locale: options?.locale || import_locale.is });
};
var isBetween = (date, start, end) => {
  return (0, import_date_fns.isAfter)(date, start) && (0, import_date_fns.isBefore)(date, end);
};
var useDate = () => {
  return {
    format: import_date_fns.format,
    dateFormat,
    timeFormat,
    isBetween
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dateFormat,
  formatIso,
  isBetween,
  isDate,
  timeFormat,
  useDate
});
//# sourceMappingURL=date.cjs.map