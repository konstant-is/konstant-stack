// src/utils/string.ts
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

export {
  capitalize,
  formatSlug
};
//# sourceMappingURL=chunk-3I3J54W3.js.map