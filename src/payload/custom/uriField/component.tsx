"use client";

import { FieldLabel, TextInput, useField, Button } from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";
import { useState } from "react";

type UriFieldProps = {
  path?: string; // Make path optional
  field?: { name: string; label?: string }; // Allow flexibility in field structure
} & TextFieldClientProps;

export const UriComponent = ({ path, field }: UriFieldProps) => {
  const safePath = path || field?.name;
  const { value = "", setValue } = useField<string>({ path: safePath });
  const label = field?.label || "URI";

  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  // Safeguard for missing path or field.name
  if (!safePath) {
    console.error("UriComponent: Missing `path` or `field.name`");
    return <div>Error: Missing required path or field configuration.</div>;
  }

  return (
    <div className="field-type uri-field-component">
      {/* Label */}
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${safePath}`} label={label} />
        <Button
          className="copy-button"
          buttonStyle="none"
          onClick={handleCopyToClipboard}
        >
          Copy
        </Button>
      </div>

      {/* Text Input */}
      <TextInput
        value={value}
        onChange={setValue}
        path={safePath}
        readOnly={true}
        aria-readonly="true"
        style={{ flex: "1" }}
      />

      {/* Copy Feedback */}
      {copied && <small style={{ color: "green" }}>Copied to clipboard!</small>}
    </div>
  );
};
