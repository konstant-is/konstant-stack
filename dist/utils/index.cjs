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
  canUseDOM: () => canUseDOM,
  contains: () => contains,
  createObjectKeys: () => createObjectKeys,
  createQueryString: () => createQueryString,
  decodeUrl: () => decodeUrl,
  deepMerge: () => import_deepmerge.default,
  deepMergeWithCombinedArrays: () => deepMergeWithCombinedArrays,
  deepMergeWithReactComponents: () => deepMergeWithReactComponents,
  deepMergeWithSourceArrays: () => deepMergeWithSourceArrays,
  encodeUrl: () => encodeUrl,
  getClientSideURL: () => getClientSideURL,
  getNestedProperty: () => getNestedProperty,
  getServerSideURL: () => getServerSideURL,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  isReactClientComponent: () => isReactClientComponent,
  isReactComponentOrFunction: () => isReactComponentOrFunction,
  isReactServerComponentOrFunction: () => isReactServerComponentOrFunction,
  mapAsync: () => mapAsync,
  parseSearchParams: () => parseSearchParams,
  removeUndefined: () => removeUndefined,
  slugify: () => slugify,
  toCapitalized: () => toCapitalized,
  toKebabCase: () => toKebabCase,
  truncate: () => truncate
});
module.exports = __toCommonJS(utils_exports);

// src/utils/canUseDOM.ts
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// src/utils/createObjectKeys.ts
var createObjectKeys = (keys) => {
  return keys.reduce(
    (acc, key) => {
      acc[key] = key;
      return acc;
    },
    {}
  );
};

// src/utils/createQueryString.ts
var qs = __toESM(require("qs-esm"), 1);
var createQueryString = (query) => {
  return qs.stringify(query, { addQueryPrefix: true });
};

// src/utils/deepMerge.ts
var import_deepmerge = __toESM(require("deepmerge"), 1);

// src/utils/isReactComponent.ts
var clientRefSymbol = Symbol.for("react.client.reference");
function isReactServerComponentOrFunction(component) {
  if (component === null || component === void 0) {
    return false;
  }
  const hasClientComponentSymbol = component.$$typeof == clientRefSymbol;
  const isFunctionalComponent = typeof component === "function";
  const isAnonymousFunction = typeof component === "function" && component.name === "";
  const isRSC = isFunctionalComponent && !isAnonymousFunction && !hasClientComponentSymbol;
  return isRSC;
}
function isReactClientComponent(component) {
  if (component === null || component === void 0) {
    return false;
  }
  return !isReactServerComponentOrFunction(component) && component.$$typeof == clientRefSymbol;
}
function isReactComponentOrFunction(component) {
  return isReactServerComponentOrFunction(component) || isReactClientComponent(component);
}

// src/utils/isPlainObject.ts
function isPlainObject(o) {
  if (isReactComponentOrFunction(o)) {
    return false;
  }
  return typeof o === "object" && o !== null && !(o instanceof RegExp) && !(o instanceof Date);
}

// src/utils/deepMerge.ts
function deepMergeWithCombinedArrays(obj1, obj2, options = {}) {
  return (0, import_deepmerge.default)(obj1, obj2, {
    arrayMerge: (target, source, options2) => {
      const destination = target.slice();
      source.forEach((item, index) => {
        if (typeof destination[index] === "undefined") {
          destination[index] = options2?.cloneUnlessOtherwiseSpecified(item, options2);
        } else if (options2?.isMergeableObject(item)) {
          destination[index] = (0, import_deepmerge.default)(target[index], item, options2);
        } else if (target.indexOf(item) === -1) {
          destination.push(item);
        }
      });
      return destination;
    },
    ...options
  });
}
function deepMergeWithSourceArrays(obj1, obj2) {
  return (0, import_deepmerge.default)(obj1, obj2, { arrayMerge: (_, source) => source });
}
function deepMergeWithReactComponents(obj1, obj2) {
  return (0, import_deepmerge.default)(obj1, obj2, {
    isMergeableObject: isPlainObject
  });
}

// src/utils/encoding.ts
var decodeUrl = (url) => {
  return url.map((s2) => decodeURIComponent(s2));
};
var encodeUrl = (url) => {
  return encodeURIComponent(url);
};

// src/utils/getNestedProperty.ts
var getNestedProperty = (obj, path) => {
  return path.split(".").reduce(
    (acc, key) => acc && typeof acc === "object" && key in acc ? acc[key] : void 0,
    obj
  );
};

// src/utils/isNumber.ts
function isNumber(value) {
  if (value === null || value === void 0 || typeof value === "string" && value.trim() === "") {
    return false;
  }
  return !Number.isNaN(Number(value));
}

// src/utils/mapAsync.ts
async function mapAsync(arr, callbackfn) {
  return Promise.all(arr.map(callbackfn));
}

// src/utils/getUrl.ts
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
  if (canUseDOM) {
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

// src/utils/isObject.ts
function isObject(item) {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

// src/utils/parseSearchParams.ts
var qs2 = __toESM(require("qs-esm"), 1);
function parseSearchParams(searchParams) {
  const search = searchParams.toString();
  return qs2.parse(search, {
    depth: 10,
    ignoreQueryPrefix: true
  });
}

// src/utils/removeUndefined.ts
function removeUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== void 0));
}

// src/utils/stringFormat.ts
var s = __toESM(require("slugify"), 1);
var truncate = (str = "", length = 100) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};
var contains = (str = "", search) => {
  return str.toLowerCase().includes(search.toLowerCase());
};
var slugify = s.default || s;
var toCapitalized = (str = "") => {
  if (!str.length) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var toKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canUseDOM,
  contains,
  createObjectKeys,
  createQueryString,
  decodeUrl,
  deepMerge,
  deepMergeWithCombinedArrays,
  deepMergeWithReactComponents,
  deepMergeWithSourceArrays,
  encodeUrl,
  getClientSideURL,
  getNestedProperty,
  getServerSideURL,
  isNumber,
  isObject,
  isPlainObject,
  isReactClientComponent,
  isReactComponentOrFunction,
  isReactServerComponentOrFunction,
  mapAsync,
  parseSearchParams,
  removeUndefined,
  slugify,
  toCapitalized,
  toKebabCase,
  truncate
});
//# sourceMappingURL=index.cjs.map