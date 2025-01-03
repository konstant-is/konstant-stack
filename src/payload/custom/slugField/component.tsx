"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import "./slug.scss";

import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields,
} from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";
import { formatSlug } from "@/utils/string";

type SlugComponentProps = {
  fieldToUse: string;
  checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field;

  // Safely compute checkboxFieldPath
  const checkboxFieldPath = useMemo(() => {
    if (!path) return checkboxFieldPathFromProps;
    return path.includes(".")
      ? `${path}.${checkboxFieldPathFromProps}`
      : checkboxFieldPathFromProps;
  }, [path, checkboxFieldPathFromProps]);

  const { value, setValue } = useField<string>({ path: path || field.name });
  const { dispatchFields } = useForm();

  // Safely access checkbox value
  const checkboxValue = useFormFields(
    useCallback(
      ([fields]) => fields?.[checkboxFieldPath]?.value as boolean,
      [checkboxFieldPath],
    ),
  );

  // Safely access target field value
  const targetFieldValue = useFormFields(
    useCallback(
      ([fields]) => fields?.[fieldToUse]?.value as string,
      [fieldToUse],
    ),
  );

  useEffect(() => {
    if (checkboxValue) {
      const formattedSlug = targetFieldValue
        ? formatSlug(targetFieldValue)
        : "";

      if (value !== formattedSlug) {
        setValue(formattedSlug);
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value]);

  const handleLock = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();
      dispatchFields({
        type: "UPDATE",
        path: checkboxFieldPath,
        value: !checkboxValue,
      });
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  );

  const readOnly = useMemo(
    () => readOnlyFromProps || checkboxValue,
    [readOnlyFromProps, checkboxValue],
  );

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        <Button
          className="lock-button"
          buttonStyle="none"
          onClick={handleLock}
          aria-pressed={checkboxValue}
        >
          {checkboxValue ? "Unlock" : "Lock"}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
      />
    </div>
  );
};
