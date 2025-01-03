"use client";
import {
  getClientSideURL
} from "../chunk-H25YBAVB.js";
import {
  getNestedProperty
} from "../chunk-Y4FC33LH.js";
import {
  formatSlug
} from "../chunk-3I3J54W3.js";

// src/payload/custom/permalink/component.tsx
import { useMemo } from "react";
import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { jsx, jsxs } from "react/jsx-runtime";
var PermalinkField = ({ fieldToUse }) => {
  const serverURL = getClientSideURL();
  const { id } = useDocumentInfo();
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value;
  });
  const permalink = useMemo(() => {
    if (!targetFieldValue) return "";
    return `${serverURL}${targetFieldValue}`;
  }, [serverURL, targetFieldValue]);
  if (!id) {
    return /* @__PURE__ */ jsx("p", { className: "permalinksField", children: "Save the document to generate a permalink." });
  }
  if (!fieldToUse) {
    return /* @__PURE__ */ jsx("p", { className: "permalinksField", children: "Please provide a valid field name to generate the permalink." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "field-type permalinksField", children: [
    /* @__PURE__ */ jsx("strong", { children: "Permalink:" }),
    " ",
    /* @__PURE__ */ jsx("a", { href: permalink, target: "_blank", rel: "noopener noreferrer", children: permalink })
  ] });
};

// src/payload/custom/slugField/component.tsx
import { useCallback, useEffect, useMemo as useMemo2 } from "react";
import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields as useFormFields2
} from "@payloadcms/ui";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var SlugComponent = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps
}) => {
  const { label } = field;
  const checkboxFieldPath = useMemo2(
    () => path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps,
    [path, checkboxFieldPathFromProps]
  );
  const { value, setValue } = useField({ path: path || field.name });
  const { dispatchFields } = useForm();
  const checkboxValue = useFormFields2(
    useCallback(
      ([fields]) => fields[checkboxFieldPath]?.value,
      [checkboxFieldPath]
    )
  );
  const targetFieldValue = useFormFields2(
    useCallback(
      ([fields]) => fields[fieldToUse]?.value,
      [fieldToUse]
    )
  );
  useEffect(() => {
    if (checkboxValue) {
      const formattedSlug = targetFieldValue ? formatSlug(targetFieldValue) : "";
      if (value !== formattedSlug) {
        setValue(formattedSlug);
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value]);
  const handleLock = useCallback(
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
  const readOnly = useMemo2(
    () => readOnlyFromProps || checkboxValue,
    [readOnlyFromProps, checkboxValue]
  );
  return /* @__PURE__ */ jsxs2("div", { className: "field-type slug-field-component", children: [
    /* @__PURE__ */ jsxs2("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ jsx2(FieldLabel, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ jsx2(
        Button,
        {
          className: "lock-button",
          buttonStyle: "none",
          onClick: handleLock,
          "aria-pressed": checkboxValue,
          children: checkboxValue ? "Unlock" : "Lock"
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(
      TextInput,
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
import { FieldLabel as FieldLabel2, TextInput as TextInput2, useField as useField2 } from "@payloadcms/ui";
import { useState } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var UriComponent = ({ path, field }) => {
  const { value, setValue } = useField2({ path: path || field.name });
  const { label } = field;
  const [copied, setCopied] = useState(false);
  const handleCopyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      });
    }
  };
  return /* @__PURE__ */ jsxs3("div", { className: "field-type uri-field-component", children: [
    /* @__PURE__ */ jsx3("div", { className: "label-wrapper", children: /* @__PURE__ */ jsx3(FieldLabel2, { htmlFor: `field-${path}`, label }) }),
    /* @__PURE__ */ jsxs3(
      "div",
      {
        className: "input-wrapper",
        style: { display: "flex", alignItems: "center", gap: "8px" },
        children: [
          /* @__PURE__ */ jsx3(
            TextInput2,
            {
              value,
              onChange: setValue,
              path: path || field.name,
              readOnly: true,
              "aria-readonly": "true",
              style: { flex: "1" }
            }
          ),
          /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              onClick: handleCopyToClipboard,
              title: "Copy to clipboard",
              className: "copy-button",
              style: {
                padding: "8px",
                backgroundColor: "#ddd",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              },
              children: "\u{1F4CB}"
            }
          )
        ]
      }
    ),
    copied && /* @__PURE__ */ jsx3("small", { style: { color: "green" }, children: "Copied to clipboard!" })
  ] });
};

// src/payload/custom/rowLabel/component.tsx
import { useRowLabel } from "@payloadcms/ui";
import { jsx as jsx4 } from "react/jsx-runtime";
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ jsx4("div", { children: label });
};
var useArrayRowLabel = (props) => {
  const { prefix, fieldName, fallback } = props;
  const { data, rowNumber } = useRowLabel();
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
export {
  ArrayRowLabel,
  PermalinkField,
  SlugComponent,
  UriComponent
};
//# sourceMappingURL=components.js.map