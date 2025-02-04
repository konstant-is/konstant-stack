import {
  createObjectKeys,
  deepMerge,
  toReadable
} from "./chunk-EUZPRMI5.js";

// src/payload/utils/field.ts
var getBaseProperties = () => {
  return {};
};
var field = (props) => {
  const base = getBaseProperties();
  return {
    ...base,
    ...props
  };
};

// src/payload/utils/createField.ts
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return deepMerge(field2, props.overrides || {});
  };
}

// src/payload/utils/createFieldOptions.ts
var createFieldOptions = (keys) => {
  const values = createObjectKeys(keys);
  const options = keys.map((key) => ({
    label: toReadable(key),
    value: key
  }));
  return { options, values };
};

export {
  field,
  createField,
  createFieldOptions
};
//# sourceMappingURL=chunk-DZBIXTMU.js.map