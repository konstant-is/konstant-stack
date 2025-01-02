"use client";

import { useDocumentInfo, useFormFields } from "@payloadcms/ui";
import { UIFieldClientComponent } from "payload";
import { getClientSideURL } from "@/utils/getUrl";

export const PermalinkField: UIFieldClientComponent = () => {
  const serverURL = getClientSideURL();

  const { id, collectionSlug } = useDocumentInfo();

  // Subscribe to the slug and uri fields for reactive updates
  const [slugFieldValue, setSlugFieldValue] = useFormFields(([fields]) => {
    return fields["slug"]?.value as string;
  });

  const [uriFieldValue, setUriFieldValue] = useFormFields(([fields]) => {
    return fields["uri"]?.value as string;
  });

  // Only display permalink if the document has been saved and has an ID
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
