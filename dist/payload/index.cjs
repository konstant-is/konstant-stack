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
  SlugComponent: () => SlugComponent,
  arrayField: () => arrayField,
  blockBuilder: () => blockBuilder,
  blockBuilderHelper: () => blockBuilderHelper,
  blocksField: () => blocksField,
  checkboxField: () => checkboxField,
  collapsibleField: () => collapsibleField,
  createBlock: () => createBlock,
  createCollectionConfig: () => createCollectionConfig,
  createField: () => createField2,
  createGlobalConfig: () => createGlobalConfig,
  dateField: () => dateField,
  emailField: () => emailField,
  field: () => field,
  groupField: () => groupField,
  jsonField: () => jsonField,
  numberField: () => numberField,
  pointField: () => pointField,
  radioField: () => radioField,
  relationshipField: () => relationshipField,
  richTextField: () => richTextField,
  rowField: () => rowField,
  selectField: () => selectField,
  tabField: () => tabField,
  tabsField: () => tabsField,
  textField: () => textField,
  textareaField: () => textareaField,
  uiField: () => uiField,
  uploadField: () => uploadField
});
module.exports = __toCommonJS(payload_exports);

// src/payload/custom/slugField/component.tsx
var import_react = require("react");
var import_ui = require("@payloadcms/ui");

// src/utils/string.ts
var import_slugify = __toESM(require("slugify"), 1);
var formatSlug = (value = "") => (0, import_slugify.default)(value, {
  lower: true,
  trim: true
});

// src/payload/custom/slugField/component.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SlugComponent = ({
  field: field2,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps
}) => {
  const { label } = field2;
  const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;
  const { value, setValue } = (0, import_ui.useField)({ path: path || field2.name });
  const { dispatchFields } = (0, import_ui.useForm)();
  const checkboxValue = (0, import_ui.useFormFields)(([fields]) => {
    return fields[checkboxFieldPath]?.value;
  });
  const targetFieldValue = (0, import_ui.useFormFields)(([fields]) => {
    return fields[fieldToUse]?.value;
  });
  (0, import_react.useEffect)(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue);
        if (value !== formattedSlug) setValue(formattedSlug);
      } else {
        if (value !== "") setValue("");
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value]);
  const handleLock = (0, import_react.useCallback)(
    (e) => {
      e.preventDefault();
      dispatchFields({
        type: "UPDATE",
        path: checkboxFieldPath,
        value: !checkboxValue
      });
    },
    [checkboxValue, checkboxFieldPath, dispatchFields]
  );
  const readOnly = readOnlyFromProps || checkboxValue;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "field-type slug-field-component", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.FieldLabel, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Button, { className: "lock-button", buttonStyle: "none", onClick: handleLock, children: checkboxValue ? "Unlock" : "Lock" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.TextInput,
      {
        value,
        onChange: setValue,
        path: path || field2.name,
        readOnly: Boolean(readOnly)
      }
    )
  ] });
};

// src/payload/fields/fieldConfig.ts
var fieldConfigInstance = {
  localized: false,
  required: false
};
var getFieldConfig = () => {
  if (!fieldConfigInstance) {
  }
  const config = fieldConfigInstance || {};
  return config;
};

// src/payload/fields/fields.ts
var createField = (field2) => {
  const config = getFieldConfig();
  const merged = { ...config, ...field2 };
  return merged;
};
var field = (props) => createField(props);
var textField = (props) => {
  const { hasMany = false, validate, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "text",
      hasMany: true,
      validate
      // Ensure validate is correctly typed
    });
  }
  return createField({
    ...rest,
    type: "text",
    hasMany: false,
    maxRows: void 0,
    minRows: void 0,
    validate
    // Ensure validate is correctly typed
  });
};
var textareaField = (props) => {
  return createField({
    type: "textarea",
    ...props
  });
};
var numberField = (props) => {
  const { hasMany = false, validate, ...rest } = props;
  if (hasMany) {
    return createField({
      type: "number",
      hasMany: true,
      validate,
      // Ensure validate is correctly typed
      ...rest
    });
  }
  return createField({
    type: "number",
    hasMany: false,
    validate,
    ...rest,
    maxRows: void 0,
    minRows: void 0
  });
};
var richTextField = (props) => {
  return createField({
    type: "richText",
    ...props
  });
};
var selectField = (props) => {
  const { hasMany = false, validate, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "select",
      hasMany: true,
      validate
      // Ensure validate is correctly typed
    });
  }
  return createField({
    ...rest,
    type: "select",
    hasMany: false,
    validate
    // Ensure validate is correctly typed
  });
};
var tabsField = (props) => {
  return createField({
    type: "tabs",
    ...props
  });
};
var tabField = (props) => props;
var blocksField = (props) => {
  return createField({
    type: "blocks",
    ...props
  });
};
var uploadField = (props) => {
  const { hasMany = false, validate, maxRows, minRows, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "upload",
      hasMany: true,
      validate,
      // Ensure validate is correctly typed
      maxRows,
      // Include maxRows if hasMany is true
      minRows
      // Include minRows if hasMany is true
    });
  }
  return createField({
    ...rest,
    max: void 0,
    min: void 0,
    type: "upload",
    hasMany: false,
    validate,
    // Ensure validate is correctly typed
    maxRows: void 0,
    // Explicitly set maxRows to undefined
    minRows: void 0
    // Explicitly set minRows to undefined
  });
};
var groupField = (props) => {
  return createField({
    type: "group",
    ...props
  });
};
var rowField = (props) => {
  return createField({
    type: "row",
    ...props
  });
};
var radioField = (props) => {
  return createField({
    type: "radio",
    ...props
  });
};
var checkboxField = (props) => {
  return createField({
    type: "checkbox",
    ...props
  });
};
var relationshipField = (props) => {
  const { hasMany = false, validate, admin, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "relationship",
      hasMany: true,
      validate,
      // Ensure validate is correctly typed
      admin: {
        ...admin,
        sortOptions: admin?.sortOptions
        // Ensure sortOptions is correctly typed
      },
      relationTo: rest.relationTo
      // Ensure relationTo is correctly typed
    });
  }
  return createField({
    ...rest,
    maxRows: void 0,
    // Explicitly set maxRows to undefined
    minRows: void 0,
    // Explicitly set minRows to undefined
    min: void 0,
    // Explicitly set min to undefined
    max: void 0,
    // Explicitly set max to undefined
    type: "relationship",
    hasMany: false,
    validate,
    // Ensure validate is correctly typed
    admin: {
      ...admin,
      sortOptions: admin?.sortOptions
      // Ensure sortOptions is correctly typed
    },
    relationTo: rest.relationTo
    // Ensure relationTo is correctly typed
  });
};
var arrayField = (props) => {
  return createField({
    type: "array",
    ...props
  });
};
var dateField = (props) => {
  return createField({
    type: "date",
    ...props
  });
};
var collapsibleField = (props) => {
  return {
    type: "collapsible",
    ...props,
    label: props.label,
    admin: {
      initCollapsed: true,
      ...props.admin
    }
  };
};
var pointField = (props) => {
  return createField({
    type: "point",
    ...props
  });
};
var emailField = (props) => {
  return createField({
    type: "email",
    ...props
  });
};
var jsonField = (props) => {
  return createField({
    type: "json",
    ...props
  });
};
var uiField = (props) => {
  return createField({
    type: "ui",
    ...props
  });
};

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
    filter,
    exclude,
    build,
    only
  };
  return builder;
};

// src/payload/utils/createConfig.ts
var createCollectionConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};
var createGlobalConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};
var createBlock = (block) => {
  const fallbackInterfaceName = () => block.slug.includes("Block") ? block.slug : `${block.slug}Block`;
  return {
    ...block,
    interfaceName: block?.interfaceName || fallbackInterfaceName()
  };
};

// src/utils/object.ts
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

// src/payload/utils/createField.ts
function createField2(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return deepMerge(field2, props.overrides || {});
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SlugComponent,
  arrayField,
  blockBuilder,
  blockBuilderHelper,
  blocksField,
  checkboxField,
  collapsibleField,
  createBlock,
  createCollectionConfig,
  createField,
  createGlobalConfig,
  dateField,
  emailField,
  field,
  groupField,
  jsonField,
  numberField,
  pointField,
  radioField,
  relationshipField,
  richTextField,
  rowField,
  selectField,
  tabField,
  tabsField,
  textField,
  textareaField,
  uiField,
  uploadField
});
//# sourceMappingURL=index.cjs.map