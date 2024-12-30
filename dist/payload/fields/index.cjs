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

// src/payload/fields/index.ts
var fields_exports = {};
__export(fields_exports, {
  arrayField: () => arrayField,
  blocksField: () => blocksField,
  checkboxField: () => checkboxField,
  collapsibleField: () => collapsibleField,
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
module.exports = __toCommonJS(fields_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  arrayField,
  blocksField,
  checkboxField,
  collapsibleField,
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