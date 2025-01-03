"use client";

import { FieldLabel, TextInput, useField, Button } from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";
import { useState } from "react";

type UriFieldProps = {} & TextFieldClientProps;

export const UriComponent = ({ path, field }: UriFieldProps) => {
  const { value, setValue } = useField<string>({ path: path || field.name });
  const { label } = field;

  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <div className="field-type uri-field-component">
      {/* Label */}
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
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
        path={path || field.name}
        readOnly={true}
        aria-readonly="true"
        style={{ flex: "1" }}
      />

      {/* Copy Feedback */}
      {copied && <small style={{ color: "green" }}>Copied to clipboard!</small>}
    </div>
  );
};
