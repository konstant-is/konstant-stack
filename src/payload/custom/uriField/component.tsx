"use client";

import { FieldLabel, TextInput, useField, useForm } from "@payloadcms/ui";
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
      </div>

      {/* Text Input */}
      <div
        className="input-wrapper"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <TextInput
          id={`field-${path}`}
          value={value}
          onChange={setValue}
          path={path || field.name}
          readOnly={true}
          aria-readonly="true"
          style={{ flex: "1" }}
        />
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopyToClipboard}
          title="Copy to clipboard"
          className="copy-button"
          style={{
            padding: "8px",
            backgroundColor: "#ddd",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          📋
        </button>
      </div>

      {/* Copy Feedback */}
      {copied && <small style={{ color: "green" }}>Copied to clipboard!</small>}
    </div>
  );
};
