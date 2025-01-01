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

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  canUseDom: () => canUseDom,
  getClientSideURL: () => getClientSideURL,
  getReference: () => getReference,
  getServerSideURL: () => getServerSideURL
});
module.exports = __toCommonJS(utils_exports);

// src/utils/canUseDom.ts
var canUseDom = () => !!(typeof window !== "undefined" && window.document && window.document.createElement);

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

// src/utils/getReference.ts
function getReference(ref) {
  if (typeof ref === "string") {
    return null;
  }
  return ref;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canUseDom,
  getClientSideURL,
  getReference,
  getServerSideURL
});
//# sourceMappingURL=index.cjs.map