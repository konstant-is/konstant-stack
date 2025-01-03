"use client";

import { useMemo } from "react";
import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { UIFieldClientProps } from "payload";
import { getClientSideURL } from "@/utils/getUrl";

type PermalinkProps = {
  fieldToUse: string;
} & UIFieldClientProps;

export const PermalinkField = ({ fieldToUse }: PermalinkProps) => {
  const serverURL = getClientSideURL();

  const { id } = useDocumentInfo();

  // Listen to the field value
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string;
  });

  // Compute permalink only when necessary
  const permalink = useMemo(() => {
    if (!targetFieldValue) return "";
    return `${serverURL}${targetFieldValue}`;
  }, [serverURL, targetFieldValue]);

  // Display message if the document hasn't been saved
  if (!id) {
    return (
      <p className="permalinksField">
        Save the document to generate a permalink.
      </p>
    );
  }

  // Handle cases where `fieldToUse` is invalid or missing
  if (!fieldToUse) {
    return (
      <p className="permalinksField">
        Please provide a valid field name to generate the permalink.
      </p>
    );
  }

  return (
    <div className="field-type permalinksField">
      <strong>Permalink:</strong>{" "}
      <a href={permalink} target="_blank" rel="noopener noreferrer">
        {permalink}
      </a>
    </div>
  );
};
