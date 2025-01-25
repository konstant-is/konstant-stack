"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/payload/fields/index.ts
var fields_exports = {};
__export(fields_exports, {
  addressField: () => addressField,
  arrayRowLabelField: () => arrayRowLabelField,
  documentReferenceField: () => documentReferenceField,
  linkField: () => linkField,
  openingHoursField: () => openingHoursField,
  socialsField: () => socialsField,
  timeField: () => timeField,
  urlField: () => urlField,
  weekdaysMap: () => weekdaysMap
});
module.exports = __toCommonJS(fields_exports);

// src/utils/canUseDOM.ts
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// src/utils/createObjectKeys.ts
var createObjectKeys = (keys) => {
  return keys.reduce(
    (acc, key) => {
      acc[key] = key;
      return acc;
    },
    {}
  );
};

// src/utils/createQueryString.ts
var qs = __toESM(require("qs-esm"), 1);

// src/utils/deepMerge.ts
var import_deepmerge = __toESM(require("deepmerge"), 1);

// src/utils/isReactComponent.ts
var clientRefSymbol = Symbol.for("react.client.reference");

// src/utils/parseSearchParams.ts
var qs2 = __toESM(require("qs-esm"), 1);

// src/utils/stringFormat.ts
var s = __toESM(require("slugify"), 1);
var toCapitalized = (str = "") => {
  if (!str.length) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var toReadable = (str) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

// src/payload/utils/createField.ts
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return (0, import_deepmerge.default)(field2, props.overrides || {});
  };
}

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

// src/payload/fields/addressField.ts
var fields = createObjectKeys([
  "addressLine1",
  "addressLine2",
  "city",
  "location",
  "postalCode",
  "state"
]);
var addressField = createField((props) => {
  const fieldCondition = (fieldName) => {
    if (!props.hideFields?.length) {
      return true;
    }
    return props.hideFields.includes(fieldName) ? false : true;
  };
  return field({
    name: props.name ?? "address",
    type: "group",
    admin: {
      condition: props.condition,
      description: props.description,
      hideGutter: props.hideGutter
    },
    fields: [
      field({
        type: "row",
        fields: [
          field({
            name: "addressLine1",
            type: "text",
            label: "Address",
            localized: false,
            required: false
          }),
          field({
            name: "addressLine2",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("addressLine2")
            },
            label: "Address extra",
            localized: false,
            required: false
          })
        ]
      }),
      field({
        type: "row",
        fields: [
          field({
            name: "state",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("state")
            },
            label: "State",
            localized: false,
            required: false
          }),
          field({
            name: "city",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("city")
            },
            label: "City",
            localized: false,
            required: false
          }),
          field({
            name: "postalCode",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("postalCode")
            },
            label: "Postal Code",
            localized: false,
            required: false
          })
        ]
      }),
      field({
        name: "location",
        type: "point",
        admin: {
          condition: (_) => fieldCondition("location")
        },
        localized: false,
        required: false
      })
    ],
    interfaceName: "Address",
    label: props?.label,
    localized: false
  });
});

// src/payload/fields/arrayRowLabelField.ts
var arrayRowLabelField = (props) => {
  return {
    clientProps: props,
    path: "@konstant/stack/payload/client#ArrayRowLabel"
  };
};

// src/payload/utils/createFieldOptions.ts
var createFieldOptions = (keys) => {
  const values = createObjectKeys(keys);
  const options = keys.map((key) => ({
    label: toReadable(key),
    value: key
  }));
  return { options, values };
};

// src/payload/fields/urlField.ts
var urlField = createField((props) => {
  const required = props?.required ?? true;
  return field({
    name: props?.name ?? "url",
    type: "text",
    admin: {
      condition: props?.condition,
      hidden: props.hidden
    },
    hasMany: false,
    label: props?.label ?? "Url",
    required,
    validate: (val) => {
      if (!required && !val) {
        return true;
      }
      try {
        new URL(val);
        return true;
      } catch (err) {
        return "Invalid URL";
      }
    }
  });
});

// src/payload/fields/linkField.ts
var linkAppearanceOptions = createFieldOptions([
  "button",
  "cta",
  "custom",
  "default",
  "link"
]);
var linkOptions = createFieldOptions(["reference", "custom"]);
var linkField = createField((props) => {
  const group = field({
    name: props.name || "link",
    interfaceName: "Link",
    type: "group",
    admin: {
      condition: props.condition,
      description: props.description,
      hideGutter: props.hideGutter || true
    },
    fields: [
      linkOptionsField(),
      documentReferenceField({
        condition: (_, siblingData) => siblingData?.type === linkOptions.values.reference,
        relationTo: props.relationTo
      }),
      urlField({
        condition: (_, siblingData) => siblingData?.type === linkOptions.values.custom,
        label: "Custom URL"
      }),
      labelField,
      appearance(props)
    ],
    label: props.label || "Link"
  });
  return group;
});
var linkOptionsField = () => {
  return field({
    type: "row",
    fields: [
      field({
        name: "type",
        type: "radio",
        admin: {
          layout: "horizontal",
          width: "50%"
        },
        defaultValue: linkOptions.values.reference,
        options: linkOptions.options,
        required: true
      }),
      field({
        name: "newTab",
        type: "checkbox",
        admin: {
          style: {
            alignSelf: "flex-end"
          },
          width: "50%"
        },
        label: "Open in new tab"
      })
    ]
  });
};
var appearance = (props) => field({
  name: "appearance",
  type: "select",
  admin: {
    condition: () => props.showAppearance || false
  },
  defaultValue: linkAppearanceOptions.values.default,
  label: "Appearance",
  options: linkAppearanceOptions.options,
  required: false
});
var labelField = field({
  name: "label",
  type: "text",
  label: "Link Text",
  required: true
});
var documentReferenceField = createField(
  (props) => field({
    name: props.name || "reference",
    type: "relationship",
    label: props.label || "Document to link to",
    maxDepth: 1,
    relationTo: props.relationTo,
    required: props.required,
    admin: {
      condition: props?.condition,
      hidden: props.hidden
    }
  })
);

// src/payload/fields/timeField.ts
var timeField = createField(
  (props) => field({
    name: props.name || "time",
    type: "date",
    label: props.label || "Time",
    localized: props.localized || false,
    // defaultValue: name === "open" ? "09:00" : "16:00",
    admin: {
      condition: props.condition,
      date: {
        displayFormat: "HH:mm",
        pickerAppearance: "timeOnly",
        timeFormat: "HH:mm"
      },
      hidden: props.hidden
    }
  })
);

// src/payload/fields/openingHoursField.ts
var weekdaysMap = {
  1: "Mondays",
  2: "Tuesdays",
  3: "Wednesdays",
  4: "Thursdays",
  5: "Fridays",
  6: "Saturdays",
  7: "Sundays"
};
var dayOptions = Object.keys(weekdaysMap).map((key) => ({
  label: weekdaysMap[key] || "",
  value: key
}));
var openingHoursField = () => {
  const items = field({
    name: "items",
    type: "array",
    admin: {
      components: {
        RowLabel: arrayRowLabelField({
          fieldName: "label",
          prefix: ""
        })
      }
    },
    fields: [
      field({
        name: "days",
        type: "select",
        defaultValue: [],
        hasMany: true,
        localized: false,
        options: dayOptions,
        required: true
      }),
      field({ name: "label", type: "text", localized: true, required: true }),
      ...timeFields()
    ],
    label: "Opening Hours"
  });
  const customOpeningHours = field({
    name: "custom",
    type: "array",
    fields: [
      field({ name: "label", type: "text", localized: true, required: true }),
      field({
        name: "date",
        type: "date",
        admin: {
          date: {
            displayFormat: "d MMM yyy",
            pickerAppearance: "dayOnly"
          }
        },
        label: "Date",
        localized: false,
        required: true
      }),
      ...timeFields()
    ],
    label: "Custom Opening Hours"
  });
  return field({
    name: "openingHours",
    type: "group",
    fields: [items, customOpeningHours],
    interfaceName: "OpeningHours",
    label: ""
  });
};
var timeFields = () => {
  return [
    field({
      type: "row",
      admin: {
        condition: (_, siblingData) => !siblingData.isClosed
      },
      fields: ["openingTime", "closingTime"].map(
        (name) => timeField({ name, label: toCapitalized(name) })
      )
    }),
    field({ name: "isClosed", type: "checkbox", label: "Closed whole day" }),
    field({
      name: "closedLabel",
      type: "text",
      admin: { condition: (_, siblingData) => siblingData.isClosed }
    })
  ];
};

// src/payload/fields/socialsField.ts
var socialsOptions = createFieldOptions([
  "facebook",
  "instagram",
  "linkedin",
  "strava",
  "twitter"
]);
var fields2 = (showOnly = []) => {
  const { options } = socialsOptions;
  return options.map((option) => {
    const show = showOnly.length === 0 || showOnly.includes(option.value);
    return urlField({
      name: option.value,
      condition: () => show,
      label: option.label,
      overrides: {
        admin: {
          width: "50%"
        }
      },
      required: false
    });
  });
};
var socialsField = createField((props) => {
  return field({
    name: props.name || "socialMedia",
    type: "group",
    fields: [
      field({
        type: "row",
        fields: fields2(props.showOnly)
      })
    ],
    label: props.label || "Social Media"
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addressField,
  arrayRowLabelField,
  documentReferenceField,
  linkField,
  openingHoursField,
  socialsField,
  timeField,
  urlField,
  weekdaysMap
});
//# sourceMappingURL=index.cjs.map