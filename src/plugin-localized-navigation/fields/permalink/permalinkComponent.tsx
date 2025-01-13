"use client";

import { useMemo } from "react";

import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { UIFieldClientProps } from "payload";
import { getClientSideURL } from "@/utils/getUrl";

type Props = UIFieldClientProps & {
  custom: {
    sourceField: string;
  };
};
export const PermalinkComponent = (props: Props) => {
  const { custom } = props;
  const serverURL = getClientSideURL();
  const { id } = useDocumentInfo();

  // Listen to the field value
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[custom.sourceField]?.value as string;
  });

  // Compute permalink only when necessary
  const processedValue = useMemo(() => {
    if (!targetFieldValue) return "";
    return `${serverURL}${targetFieldValue}`;
  }, [serverURL, targetFieldValue]);

  if (!id || !processedValue) {
    return null;
  }

  return (
    <div className="field-type permalinksField">
      <strong>Permalink:</strong>{" "}
      <a href={processedValue} target="_blank" rel="noopener noreferrer">
        {processedValue}
      </a>
    </div>
  );
};
