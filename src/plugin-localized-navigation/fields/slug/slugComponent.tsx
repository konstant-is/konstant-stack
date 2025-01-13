"use client";

import React, { useCallback, useMemo } from "react";

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
import slugify from "slugify";

import { SlugifyOptions } from "../../types";

type SlugComponentProps = TextFieldClientProps & {
  custom: {
    watchFields: string[];
    checkboxFieldPath: string;
    slugifyOptions: SlugifyOptions;
  };
};

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  custom,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field;
  const {
    watchFields,
    slugifyOptions,
    checkboxFieldPath: checkboxFieldPathFromProps,
  } = custom;

  const checkboxFieldPath = path?.includes(".")
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps;

  const { value, setValue } = useField<string>({ path: path || field.name });

  const { dispatchFields } = useForm();

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string;
  });

  const fields = useFormFields(([fields, dispatch]) => {
    return watchFields.map((watch) => fields[watch]);
  });

  const processedValue = useMemo(() => {
    const separator = slugifyOptions?.replacement ?? "-";

    return fields
      .filter((item) => Boolean(item?.value))
      .reduce((accumulator, currentValue, currentIndex) => {
        return (
          String(accumulator) +
          (currentIndex > 0 ? separator : "") +
          slugify(String(currentValue?.value), slugifyOptions)
        );
      }, "");
  }, [fields]);

  //   useEffect(() => {
  //     if (checkboxValue) {
  //       if (targetFieldValue) {
  //         const formattedSlug = formatSlug(targetFieldValue);

  //         if (value !== formattedSlug) setValue(formattedSlug);
  //       } else {
  //         if (value !== "") setValue("");
  //       }
  //     }
  //   }, [targetFieldValue, checkboxValue, setValue, value]);

  React.useEffect(() => {
    if (processedValue !== value) {
      setValue(processedValue);
    }
  }, [processedValue]);

  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      dispatchFields({
        type: "UPDATE",
        path: checkboxFieldPath,
        value: !checkboxValue,
      });
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  );

  const readOnly = readOnlyFromProps || checkboxValue;

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
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
