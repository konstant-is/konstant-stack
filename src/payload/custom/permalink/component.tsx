"use client";

import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { UIFieldClientComponent } from "payload";
import { getClientSideURL } from "@/utils/getUrl";

type PermalinkFieldProps = {
  fieldToUse: string;
};
export const PermalinkField: UIFieldClientComponent = () => {
  const serverURL = getClientSideURL();

  const { id, collectionSlug } = useDocumentInfo();

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields["slug"]?.value as string;
  });

  const uriFieldValue = useFormFields(([fields]) => {
    return fields["uri"]?.value as string;
  });

  // Only display permalink if document is published
  if (!id) {
    return (
      <div className="permalinksField">
        Save the document to generate a permalink.
      </div>
    );
  }

  const permalink = `${serverURL}${uriFieldValue}`;

  return (
    <div className="field-type permalinksField">
      <strong>Permalink:</strong>{" "}
      <a href={permalink} target="_blank">
        {permalink}
      </a>
    </div>
  );
};

export default PermalinkField;
