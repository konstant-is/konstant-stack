"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  canUseDom: () => canUseDom,
  capitalize: () => capitalize,
  createFieldOptions: () => createFieldOptions,
  dateFormat: () => dateFormat,
  deepMerge: () => deepMerge,
  formatIso: () => formatIso,
  formatSlug: () => formatSlug,
  getClientSideURL: () => getClientSideURL,
  getNestedProperty: () => getNestedProperty,
  getReference: () => getReference,
  getServerSideURL: () => getServerSideURL,
  isBetween: () => isBetween,
  isDate: () => import_date_fns.isDate,
  isObject: () => isObject,
  timeFormat: () => timeFormat,
  useDate: () => useDate
});
module.exports = __toCommonJS(utils_exports);

// src/utils/canUseDom.ts
var canUseDom = () => !!(typeof window !== "undefined" && window.document && window.document.createElement);

// src/utils/string.ts
var import_slugify = __toESM(require("slugify"), 1);
var capitalize = (str = "") => {
  if (!str.length) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var formatSlug = (value = "") => (0, import_slugify.default)(value, {
  lower: true,
  trim: true
});

// src/utils/createFieldOptions.ts
var createFieldOptions = (keys) => {
  const values = keys.reduce(
    (acc, key) => {
      acc[key] = key;
      return acc;
    },
    {}
  );
  const options = keys.map((key) => ({
    label: capitalize(key),
    value: key
  }));
  return { values, options };
};

// src/utils/date.ts
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

// src/utils/getReference.ts
function getReference(ref) {
  if (typeof ref === "string") {
    return null;
  }
  return ref;
}

// src/utils/getUrl.ts
var import_canUseDOM = require("@payloadcms/ui/utilities/canUseDOM");
var getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (!url) {
    url = "http://localhost:3000";
  }
  return url;
};
var getClientSideURL = () => {
  if (import_canUseDOM.canUseDOM) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;
    return `${protocol}//${domain}${port ? `:${port}` : ""}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || "";
};

// src/utils/object.ts
var getNestedProperty = (obj, path) => {
  return path.split(".").reduce(
    (acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0,
    obj
  );
};
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canUseDom,
  capitalize,
  createFieldOptions,
  dateFormat,
  deepMerge,
  formatIso,
  formatSlug,
  getClientSideURL,
  getNestedProperty,
  getReference,
  getServerSideURL,
  isBetween,
  isDate,
  isObject,
  timeFormat,
  useDate
});
//# sourceMappingURL=index.cjs.map