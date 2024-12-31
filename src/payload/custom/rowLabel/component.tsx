"use client";

import { getNestedProperty } from "@/utils/object";
import { useRowLabel } from "@payloadcms/ui";

type Props = {
  fieldName: string;
  prefix?: string;
  fallback?: string;
};
export const ArrayRowLabel = (props: Props) => {
  const { label } = useArrayRowLabel(props);

  return <div>{label}</div>;
};

const useArrayRowLabel = (props: Props) => {
  const { prefix, fieldName, fallback } = props;
  const { data, rowNumber } = useRowLabel<{
    [key: string]: any; // Allow indexing with a string key
  }>();
  const rowNr = `${(rowNumber || 0) + 1}`;

  function getField(): any {
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
    rowNr: `${(rowNumber || 0) + 1}`,
  };
};
