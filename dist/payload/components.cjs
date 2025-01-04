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

// src/payload/components.ts
var components_exports = {};
__export(components_exports, {
  ArrayRowLabel: () => ArrayRowLabel,
  PermalinkField: () => PermalinkField,
  SlugComponent: () => SlugComponent,
  UriComponent: () => UriComponent
});
module.exports = __toCommonJS(components_exports);

// src/payload/custom/permalink/component.tsx
var import_react = require("react");
var import_ui = require("@payloadcms/ui");

// src/utils/getUrl.ts
var import_canUseDOM = require("@payloadcms/ui/utilities/canUseDOM");
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

// src/payload/custom/permalink/component.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PermalinkField = ({ fieldToUse }) => {
  const serverURL = getClientSideURL();
  const { id } = (0, import_ui.useDocumentInfo)();
  const targetFieldValue = (0, import_ui.useFormFields)(([fields]) => {
    return fields[fieldToUse]?.value;
  });
  const permalink = (0, import_react.useMemo)(() => {
    if (!targetFieldValue) return "";
    return `${serverURL}${targetFieldValue}`;
  }, [serverURL, targetFieldValue]);
  if (!id) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "permalinksField", children: "Save the document to generate a permalink." });
  }
  if (!fieldToUse) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "permalinksField", children: "Please provide a valid field name to generate the permalink." });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "field-type permalinksField", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Permalink:" }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: permalink, target: "_blank", rel: "noopener noreferrer", children: permalink })
  ] });
};

// src/payload/custom/slugField/component.tsx
var import_react2 = require("react");
var import_ui2 = require("@payloadcms/ui");

// src/utils/string.ts
var import_slugify = __toESM(require("slugify"), 1);
var formatSlug = (value = "") => (0, import_slugify.default)(value, {
  lower: true,
  trim: true
});

// src/payload/custom/slugField/component.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var SlugComponent = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps
}) => {
  const { label } = field;
  const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;
  const { value, setValue } = (0, import_ui2.useField)({ path: path || field.name });
  const { dispatchFields } = (0, import_ui2.useForm)();
  const checkboxValue = (0, import_ui2.useFormFields)(([fields]) => {
    return fields[checkboxFieldPath]?.value;
  });
  const targetFieldValue = (0, import_ui2.useFormFields)(([fields]) => {
    return fields[fieldToUse]?.value;
  });
  (0, import_react2.useEffect)(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue);
        if (value !== formattedSlug) setValue(formattedSlug);
      } else {
        if (value !== "") setValue("");
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value]);
  const handleLock = (0, import_react2.useCallback)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "field-type slug-field-component", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.FieldLabel, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_ui2.Button, { className: "lock-button", buttonStyle: "none", onClick: handleLock, children: checkboxValue ? "Unlock" : "Lock" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_ui2.TextInput,
      {
        value,
        onChange: setValue,
        path: path || field.name,
        readOnly: Boolean(readOnly)
      }
    )
  ] });
};

// src/payload/custom/uriField/component.tsx
var import_react3 = require("react");
var import_ui3 = require("@payloadcms/ui");
var import_jsx_runtime3 = require("react/jsx-runtime");
var UriComponent = ({ path, field }) => {
  const { label } = field;
  const { value, setValue } = (0, import_ui3.useField)({ path: path || field.name });
  const [copied, setCopied] = (0, import_react3.useState)(false);
  const handleCopyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      });
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "field-type uri-field-component", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_ui3.FieldLabel, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_ui3.Button,
        {
          className: "copy-button",
          buttonStyle: "none",
          onClick: handleCopyToClipboard,
          children: "Copy"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_ui3.TextInput,
      {
        value,
        onChange: setValue,
        path: path || field.name,
        readOnly: true
      }
    ),
    copied && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("small", { style: { color: "green" }, children: "Copied to clipboard!" })
  ] });
};

// src/utils/object.ts
var getNestedProperty = (obj, path) => {
  return path.split(".").reduce(
    (acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0,
    obj
  );
};

// src/payload/custom/rowLabel/component.tsx
var import_ui4 = require("@payloadcms/ui");
var import_jsx_runtime4 = require("react/jsx-runtime");
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: label });
};
var useArrayRowLabel = (props) => {
  const { prefix, fieldName, fallback } = props;
  const { data, rowNumber } = (0, import_ui4.useRowLabel)();
  const rowNr = `${(rowNumber || 0) + 1}`;
  function getField() {
    const prop = getNestedProperty(data, fieldName);
    if (!prop) {
      console.error(`Field ${fieldName} not found in data`, data);
    }
    return prop;
  }
  const getLabel = () => {
    const field = getField();
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
  ArrayRowLabel,
  PermalinkField,
  SlugComponent,
  UriComponent
});
//# sourceMappingURL=components.cjs.map