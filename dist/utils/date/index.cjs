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

// src/utils/date/index.ts
var date_exports = {};
__export(date_exports, {
  formatDate: () => formatDate,
  formatISODate: () => formatISODate,
  formatTime: () => formatTime,
  isBetween: () => isBetween,
  isDate: () => import_date_fns2.isDate
});
module.exports = __toCommonJS(date_exports);

// src/utils/date/dateFormat.ts
var import_date_fns = require("date-fns");
var formatDate = (date, formatStr = "PPP", options) => {
  const dt = new Date(date);
  return (0, import_date_fns.format)(dt, formatStr, { ...options });
};
var formatISODate = (date) => {
  return (0, import_date_fns.formatISO)(new Date(date));
};
var formatTime = (date, formatStr = "kk:mm", options) => {
  return formatDate(date, formatStr, options);
};

// src/utils/date/dateUtils.ts
var import_date_fns2 = require("date-fns");
var isBetween = (date, start, end) => {
  const dt = new Date(date);
  const startDt = new Date(start);
  const endDt = new Date(end);
  if (!(0, import_date_fns2.isDate)(dt) || !(0, import_date_fns2.isDate)(startDt) || !(0, import_date_fns2.isDate)(endDt)) {
    throw new Error("Invalid date provided");
  }
  return (0, import_date_fns2.isAfter)(dt, startDt) && (0, import_date_fns2.isBefore)(dt, endDt);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatDate,
  formatISODate,
  formatTime,
  isBetween,
  isDate
});
//# sourceMappingURL=index.cjs.map