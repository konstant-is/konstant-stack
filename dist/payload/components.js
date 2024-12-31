"use client";
import {
  arrayRowLabelField
} from "../chunk-USSFXGLK.js";
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
export {
  SlugComponent,
  UriComponent,
  arrayRowLabelField
};
//# sourceMappingURL=components.js.map