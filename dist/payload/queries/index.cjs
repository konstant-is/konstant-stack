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

// src/payload/queries/index.ts
var queries_exports = {};
__export(queries_exports, {
  getDocumentById: () => getDocumentById
});
module.exports = __toCommonJS(queries_exports);

// src/payload/queries/getDocumentById.ts
var import_react = require("react");

// src/payload/utils/getPayloadContext.ts
var import_headers = require("next/headers.js");
var import_payload = require("payload");

// src/payload/utils/getLocale.ts
var isLocale = (locale, localeCodes) => {
  return !!locale && localeCodes.includes(locale);
};
var getLocale = (config, locale) => {
  const { localization } = config;
  if (!localization) {
    throw new Error(`Localization is not supported by Payload`);
  }
  const { defaultLocale, localeCodes } = localization;
  if (isLocale(locale, localeCodes)) {
    return locale;
  }
  return defaultLocale;
};

// src/payload/utils/getPayloadContext.ts
var getPayloadContext = async (config, params) => {
  const { isEnabled: draft } = await (0, import_headers.draftMode)();
  const payload = await (0, import_payload.getPayload)({ config });
  const processedLocale = getLocale(payload.config, params.locale);
  const query = {
    draft,
    locale: processedLocale,
    overrideAccess: draft
  };
  return { draft, locale: processedLocale, payload, query };
};

// src/payload/queries/getDocumentById.ts
var getDocumentById = (0, import_react.cache)(
  async (config, params) => {
    try {
      const { id, collection } = params;
      const { payload, query } = await getPayloadContext(config, params);
      console.info(`Fetching ${collection} with id: ${id}`);
      const result = await payload.findByID({
        id,
        collection,
        ...query,
        depth: 30
      });
      if (!result) {
        throw new Error(
          `Document with id ${id} not found in collection ${collection}`
        );
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDocumentById
});
//# sourceMappingURL=index.cjs.map