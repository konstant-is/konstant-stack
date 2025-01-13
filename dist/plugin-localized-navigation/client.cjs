"use strict";
"use component";
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

// src/plugin-localized-navigation/client.ts
var client_exports = {};
__export(client_exports, {
  PermalinkComponent: () => PermalinkComponent,
  SlugComponent: () => SlugComponent
});
module.exports = __toCommonJS(client_exports);

// src/plugin-localized-navigation/fields/permalink/permalinkComponent.tsx
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

// src/plugin-localized-navigation/fields/permalink/permalinkComponent.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PermalinkComponent = (props) => {
  const { custom } = props;
  const serverURL = getClientSideURL();
  const { id } = (0, import_ui.useDocumentInfo)();
  const targetFieldValue = (0, import_ui.useFormFields)(([fields]) => {
    return fields[custom.sourceField]?.value;
  });
  const processedValue = (0, import_react.useMemo)(() => {
    if (!targetFieldValue) return "";
    return `${serverURL}${targetFieldValue}`;
  }, [serverURL, targetFieldValue]);
  if (!id || !processedValue) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "field-type permalinksField", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Permalink:" }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: processedValue, target: "_blank", rel: "noopener noreferrer", children: processedValue })
  ] });
};

// src/plugin-localized-navigation/fields/slug/slugComponent.tsx
var import_react2 = __toESM(require("react"), 1);
var import_ui2 = require("@payloadcms/ui");
var import_slugify = __toESM(require("slugify"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var SlugComponent = ({
  field,
  custom,
  path,
  readOnly: readOnlyFromProps
}) => {
  const { label } = field;
  const {
    watchFields,
    slugifyOptions,
    checkboxFieldPath: checkboxFieldPathFromProps
  } = custom;
  const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;
  const { value, setValue } = (0, import_ui2.useField)({ path: path || field.name });
  const { dispatchFields } = (0, import_ui2.useForm)();
  const checkboxValue = (0, import_ui2.useFormFields)(([fields2]) => {
    return fields2[checkboxFieldPath]?.value;
  });
  const fields = (0, import_ui2.useFormFields)(([fields2, dispatch]) => {
    return watchFields.map((watch) => fields2[watch]);
  });
  const processedValue = (0, import_react2.useMemo)(() => {
    const separator = slugifyOptions?.replacement ?? "-";
    return fields.filter((item) => Boolean(item?.value)).reduce((accumulator, currentValue, currentIndex) => {
      return String(accumulator) + (currentIndex > 0 ? separator : "") + (0, import_slugify.default)(String(currentValue?.value), slugifyOptions);
    }, "");
  }, [fields]);
  import_react2.default.useEffect(() => {
    if (processedValue !== value) {
      setValue(processedValue);
    }
  }, [processedValue]);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PermalinkComponent,
  SlugComponent
});
//# sourceMappingURL=client.cjs.map