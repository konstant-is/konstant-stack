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

// src/payload/index.ts
var payload_exports = {};
__export(payload_exports, {
  blockBuilder: () => blockBuilder,
  blockBuilderHelper: () => blockBuilderHelper,
  createBlock: () => createBlock,
  createBlockWithSettings: () => createBlockWithSettings,
  createCollectionConfig: () => createCollectionConfig,
  createField: () => createField,
  createFieldOptions: () => createFieldOptions,
  createGlobalConfig: () => createGlobalConfig,
  field: () => field,
  getLocale: () => getLocale,
  getPayloadContext: () => getPayloadContext
});
module.exports = __toCommonJS(payload_exports);

// src/payload/utils/blockBuilder.ts
var blockBuilder = (config) => {
  const helper = blockBuilderHelper({
    config
  });
  return helper;
};
var blockBuilderHelper = (props) => {
  const { config } = props;
  let blockKeys = Object.keys(config).filter((b) => {
    const blockSettings = config[b];
    if (typeof blockSettings === "boolean" && blockSettings === false) {
      return false;
    }
    return true;
  }) || [];
  const exclude = (...blocks) => {
    blockKeys = blockKeys.filter((key) => !blocks.includes(key));
    return builder;
  };
  const filter = (predicate) => {
    blockKeys = blockKeys.filter(predicate);
  };
  const only = (...blocks) => {
    blockKeys = blockKeys.filter((key) => blocks.includes(key));
    return builder;
  };
  const build = (params) => {
    const blocks = blockKeys.map((key) => {
      const block = config[key];
      if (!block) {
        console.error(`Block ${key} not found in blockMap`);
        return null;
      }
      return block(params);
    });
    return blocks.filter((b) => b !== null);
  };
  const builder = {
    build,
    exclude,
    filter,
    only
  };
  return builder;
};

// src/payload/utils/field.ts
var getBaseProperties = () => {
  return {};
};
var field = (props) => {
  const base = getBaseProperties();
  return {
    ...base,
    ...props
  };
};

// src/payload/utils/createBlock.ts
var createBlock = (block) => {
  const fallbackInterfaceName = () => block.slug.includes("Block") ? block.slug : `${block.slug}Block`;
  return {
    ...block,
    interfaceName: block?.interfaceName || fallbackInterfaceName()
  };
};
var createBlockWithSettings = (fn) => {
  return (props) => {
    const result = fn(props);
    return createBlock({
      ...result,
      fields: [
        field({
          type: "tabs",
          tabs: [
            { fields: result.fields, label: "Content" },
            {
              name: "settings",
              fields: [
                field({
                  name: "className",
                  type: "text",
                  admin: {
                    description: "Adds custom classes to the block"
                  },
                  hasMany: true,
                  label: "Class Name"
                }),
                field({
                  name: "id",
                  type: "text",
                  admin: {
                    description: "Add custom ID to the block"
                  },
                  label: "ID",
                  required: false
                })
              ],
              label: "Settings"
            }
          ]
        })
      ]
    });
  };
};

// src/payload/utils/createCollectionConfig.ts
var createCollectionConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};

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

// src/utils/deepMerge.ts
var import_deepmerge = __toESM(require("deepmerge"), 1);

// src/utils/isReactComponent.ts
var clientRefSymbol = Symbol.for("react.client.reference");

// src/utils/parseSearchParams.ts
var qs2 = __toESM(require("qs-esm"), 1);

// src/utils/stringFormat.ts
var s = __toESM(require("slugify"), 1);
var toReadable = (str) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

// src/payload/utils/createField.ts
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return (0, import_deepmerge.default)(field2, props.overrides || {});
  };
}

// src/payload/utils/createFieldOptions.ts
var createFieldOptions = (keys) => {
  const values = createObjectKeys(keys);
  const options = keys.map((key) => ({
    label: toReadable(key),
    value: key
  }));
  return { options, values };
};

// src/payload/utils/createGlobalConfig.ts
var createGlobalConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};

// src/payload/utils/getLocale.ts
var isLocale = (locale, localeCodes) => {
  if (!locale) {
    return false;
  }
  return localeCodes.includes(locale);
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
var import_headers = require("next/headers.js");
var import_payload = require("payload");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blockBuilder,
  blockBuilderHelper,
  createBlock,
  createBlockWithSettings,
  createCollectionConfig,
  createField,
  createFieldOptions,
  createGlobalConfig,
  field,
  getLocale,
  getPayloadContext
});
//# sourceMappingURL=index.cjs.map