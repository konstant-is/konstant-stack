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

// src/payload/ui/index.ts
var ui_exports = {};
__export(ui_exports, {
  getReference: () => getReference,
  getRelation: () => getRelation
});
module.exports = __toCommonJS(ui_exports);

// src/payload/ui/getReference.ts
function getReference(value) {
  const isResolved = typeof value !== "string";
  return isResolved ? value : null;
}

// src/payload/ui/getRelation.ts
var getRelation = (props) => {
  const { relationTo, value } = props;
  const getValue = () => getReference(value);
  const getOrFetchValue = async (queryCb) => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }
    const result = await queryCb();
    return result;
  };
  return {
    getOrFetchValue,
    getValue,
    relationTo
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getReference,
  getRelation
});
//# sourceMappingURL=index.cjs.map