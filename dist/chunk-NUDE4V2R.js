// src/utils/string.ts
import qs from "qs";
import slugify from "slugify";
var capitalize = (str = "") => {
  if (!str.length) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var formatSlug = (value = "") => slugify(value, {
  lower: true,
  trim: true
});
var createQueryString = (query) => {
  return qs.stringify(query, { addQueryPrefix: true });
};

export {
  capitalize,
  formatSlug,
  createQueryString
};
//# sourceMappingURL=chunk-NUDE4V2R.js.map