"use component";
import {
  getClientSideURL
} from "../chunk-H25YBAVB.js";

// src/plugin-localized-navigation/fields/permalink/permalinkComponent.tsx
import { useMemo } from "react";
import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { jsx, jsxs } from "react/jsx-runtime";
var PermalinkComponent = (props) => {
  const { custom } = props;
  const serverURL = getClientSideURL();
  const { id } = useDocumentInfo();
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[custom.sourceField]?.value;
  });
  const processedValue = useMemo(() => {
    if (!targetFieldValue) return "";
    return `${serverURL}${targetFieldValue}`;
  }, [serverURL, targetFieldValue]);
  if (!id || !processedValue) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "field-type permalinksField", children: [
    /* @__PURE__ */ jsx("strong", { children: "Permalink:" }),
    " ",
    /* @__PURE__ */ jsx("a", { href: processedValue, target: "_blank", rel: "noopener noreferrer", children: processedValue })
  ] });
};

// src/plugin-localized-navigation/fields/slug/slugComponent.tsx
import React, { useCallback, useMemo as useMemo2 } from "react";
import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields as useFormFields2
} from "@payloadcms/ui";
import slugify from "slugify";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  const { value, setValue } = useField({ path: path || field.name });
  const { dispatchFields } = useForm();
  const checkboxValue = useFormFields2(([fields2]) => {
    return fields2[checkboxFieldPath]?.value;
  });
  const fields = useFormFields2(([fields2, dispatch]) => {
    return watchFields.map((watch) => fields2[watch]);
  });
  const processedValue = useMemo2(() => {
    const separator = slugifyOptions?.replacement ?? "-";
    return fields.filter((item) => Boolean(item?.value)).reduce((accumulator, currentValue, currentIndex) => {
      return String(accumulator) + (currentIndex > 0 ? separator : "") + slugify(String(currentValue?.value), slugifyOptions);
    }, "");
  }, [fields]);
  React.useEffect(() => {
    if (processedValue !== value) {
      setValue(processedValue);
    }
  }, [processedValue]);
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
export {
  PermalinkComponent,
  SlugComponent
};
//# sourceMappingURL=client.js.map