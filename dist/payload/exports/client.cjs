"use strict";
"use client";
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

// src/payload/exports/client.ts
var client_exports = {};
__export(client_exports, {
  ArrayRowLabel: () => ArrayRowLabel
});
module.exports = __toCommonJS(client_exports);

// src/utils/canUseDOM.ts
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// src/utils/createQueryString.ts
var qs = __toESM(require("qs-esm"), 1);

// src/utils/deepMerge.ts
var import_deepmerge = __toESM(require("deepmerge"), 1);

// src/utils/isReactComponent.ts
var clientRefSymbol = Symbol.for("react.client.reference");

// src/utils/getNestedProperty.ts
var getNestedProperty = (obj, path) => {
  return path.split(".").reduce(
    (acc, key) => acc && typeof acc === "object" && key in acc ? acc[key] : void 0,
    obj
  );
};

// src/utils/parseSearchParams.ts
var qs2 = __toESM(require("qs-esm"), 1);

// src/utils/stringFormat.ts
var s = __toESM(require("slugify"), 1);

// src/payload/components/ArrayRowLabel.tsx
var import_ui = require("@payloadcms/ui");
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ React.createElement("div", null, label);
};
var useArrayRowLabel = (props) => {
  const { fallback, fieldName, prefix } = props;
  const { data, rowNumber } = (0, import_ui.useRowLabel)();
  const rowNr = `${(rowNumber || 0) + 1}`;
  const getLabel = () => {
    const field = getNestedProperty(data, fieldName);
    return field || fallback || "Item";
  };
  const getFullLabel = () => {
    const label = getLabel();
    return `${prefix || ""} ${rowNr}: ${label}`;
  };
  return {
    label: getFullLabel(),
    rowNr: `${(rowNumber || 0) + 1}`
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayRowLabel
});
//# sourceMappingURL=client.cjs.map