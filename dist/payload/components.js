"use client";
import {
  getNestedProperty
} from "../chunk-Y4FC33LH.js";
import {
  formatSlug
} from "../chunk-3I3J54W3.js";

// src/payload/custom/slugField/component.tsx
import { useCallback, useEffect } from "react";
import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields
} from "@payloadcms/ui";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value;
  });
  const targetFieldValue = useFormFields(([fields]) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "field-type slug-field-component", children: [
    /* @__PURE__ */ jsxs("div", { className: "label-wrapper", children: [
      /* @__PURE__ */ jsx(FieldLabel, { htmlFor: `field-${path}`, label }),
      /* @__PURE__ */ jsx(Button, { className: "lock-button", buttonStyle: "none", onClick: handleLock, children: checkboxValue ? "Unlock" : "Lock" })
    ] }),
    /* @__PURE__ */ jsx(
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
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var UriComponent = ({ path, field }) => {
  const { value, setValue } = useField2({ path: path || field.name });
  const { label } = field;
  return /* @__PURE__ */ jsxs2("div", { className: "field-type uri-field-component", children: [
    /* @__PURE__ */ jsx2("div", { className: "label-wrapper", children: /* @__PURE__ */ jsx2(FieldLabel2, { htmlFor: `field-${path}`, label }) }),
    /* @__PURE__ */ jsx2(
      TextInput2,
      {
        value,
        onChange: setValue,
        path: path || field.name,
        readOnly: true
      }
    )
  ] });
};

// src/payload/custom/rowLabel/component.tsx
import { useRowLabel } from "@payloadcms/ui";
import { jsx as jsx3 } from "react/jsx-runtime";
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ jsx3("div", { children: label });
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
  SlugComponent,
  UriComponent
};
//# sourceMappingURL=components.js.map