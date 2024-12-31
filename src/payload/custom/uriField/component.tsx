"use client";

import { FieldLabel, TextInput, useField, useForm } from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";

type UriFieldProps = {} & TextFieldClientProps;
export const UriComponent = ({ path, field }: UriFieldProps) => {
  const { value, setValue } = useField<string>({ path: path || field.name });
  const { label } = field;

  return (
    <div className="field-type uri-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={true}
      />
    </div>
  );
};
