"use client";
import {
  getClientSideURL
} from "../chunk-H25YBAVB.js";
import {
  getNestedProperty
} from "../chunk-A334AXUR.js";
import {
  formatSlug
} from "../chunk-NUDE4V2R.js";

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
import { useCallback, useEffect } from "react";
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
  const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;
  const { value, setValue } = useField({ path: path || field.name });
  const { dispatchFields } = useForm();
  const checkboxValue = useFormFields2(([fields]) => {
    return fields[checkboxFieldPath]?.value;
  });
  const targetFieldValue = useFormFields2(([fields]) => {
    return fields[fieldToUse]?.value;
  });
  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue);
        if (value !== formattedSlug) setValue(formattedSlug);
      } else {
        if (value !== "") setValue("");
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
  const readOnly = readOnlyFromProps || checkboxValue;
  return /* @__PURE__ */ jsxs2("div", { className: "field-type slug-field-component", children: [
    /* @__PURE__ */ jsxs2("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ jsx2(FieldLabel, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ jsx2(Button, { className: "lock-button", buttonStyle: "none", onClick: handleLock, children: checkboxValue ? "Unlock" : "Lock" })
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
import { useState } from "react";
import { Button as Button2, FieldLabel as FieldLabel2, TextInput as TextInput2, useField as useField2 } from "@payloadcms/ui";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var UriComponent = ({ path, field }) => {
  const { label } = field;
  const { value, setValue } = useField2({ path: path || field.name });
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
    /* @__PURE__ */ jsxs3("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ jsx3(FieldLabel2, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ jsx3(
        Button2,
        {
          className: "copy-button",
          buttonStyle: "none",
          onClick: handleCopyToClipboard,
          children: "Copy"
        }
      )
    ] }),
    /* @__PURE__ */ jsx3(
      TextInput2,
      {
        value,
        onChange: setValue,
        path: path || field.name,
        readOnly: true
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