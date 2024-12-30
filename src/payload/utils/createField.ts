import { deepMerge } from "@/utils/object";
import { Field } from "payload";

export type CreateFieldProps<P = unknown> = P & {
  overrides?: Record<string, unknown>;
  fields?: Field[];
  required?: boolean;
  label?: string;
  name?: string;
  condition?: (data: any, siblingData: any) => boolean;
  hideGutter?: boolean;
  hidden?: boolean;
  description?: string;
  localized?: boolean;
};

type FieldCreationFunction<P = unknown> = (props: CreateFieldProps<P>) => Field;

export function createField<P>(fieldFn: FieldCreationFunction<P>) {
  return (props: CreateFieldProps<P> = {} as CreateFieldProps<P>) => {
    const field = fieldFn(props);
    return deepMerge(field, props.overrides || {});
  };
}
