import {
  getClientSideURL,
  getServerSideURL
} from "../chunk-H25YBAVB.js";
import {
  dateFormat,
  formatIso,
  isBetween,
  isDate,
  timeFormat,
  useDate
} from "../chunk-7WMKQBU4.js";
import {
  deepMerge,
  getNestedProperty,
  isObject
} from "../chunk-Y4FC33LH.js";
import {
  capitalize,
  formatSlug
} from "../chunk-3I3J54W3.js";

// src/utils/canUseDom.ts
var canUseDom = () => !!(typeof window !== "undefined" && window.document && window.document.createElement);

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

// src/utils/getReference.ts
function getReference(ref) {
  if (typeof ref === "string") {
    return null;
  }
  return ref;
}
export {
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
};
//# sourceMappingURL=index.js.map