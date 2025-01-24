import {
  createField,
  createFieldOptions,
  field
} from "../chunk-4ISETFZA.js";
import "../chunk-S7SCEFUS.js";
import {
  getLocale,
  getPayloadContext
} from "../chunk-KDU7UVDF.js";

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

// src/payload/utils/getReference.ts
function getReference(value) {
  const isResolved = typeof value !== "string";
  return isResolved ? value : null;
}

// src/payload/utils/getRelation.ts
var getRelation = (props) => {
  const { relationTo, value } = props;
  const getValue = () => getReference(value);
  const fetch = async (query) => {
    return await query({
      id: value,
      collection: relationTo
    });
  };
  const getOrFetchValue = async (query) => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }
    const result = fetch(query);
    return result;
  };
  return {
    getOrFetchValue,
    getValue,
    relationTo
  };
};
export {
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
  getPayloadContext,
  getReference,
  getRelation
};
//# sourceMappingURL=index.js.map