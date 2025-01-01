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

export {
  getNestedProperty,
  isObject,
  deepMerge
};
//# sourceMappingURL=chunk-Y4FC33LH.js.map