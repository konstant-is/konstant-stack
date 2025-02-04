"use client";
import {
  getNestedProperty
} from "../../chunk-EUZPRMI5.js";

// src/payload/components/ArrayRowLabel.tsx
import { useRowLabel } from "@payloadcms/ui";
import { jsx } from "react/jsx-runtime";
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ jsx("div", { children: label });
};
var useArrayRowLabel = (props) => {
  const { fallback, fieldName, prefix } = props;
  const { data, rowNumber } = useRowLabel();
  const rowNr = `${(rowNumber || 0) + 1}`;
  const getLabel = () => {
    const field = getNestedProperty(data, fieldName);
    return field || fallback || "New row";
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
  ArrayRowLabel
};
//# sourceMappingURL=client.js.map