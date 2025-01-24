import {
  createField,
  createFieldOptions,
  field
} from "../../chunk-4ISETFZA.js";
import {
  createObjectKeys,
  toCapitalized
} from "../../chunk-S7SCEFUS.js";

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
    type: "group",
    admin: {
      condition: props.condition,
      description: props.description,
      hideGutter: props.hideGutter || true
    },
    fields: [
      linkOptionsField(),
      ...types(props),
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
var types = (props) => {
  return [
    internalLinkField({
      condition: (_, siblingData) => siblingData?.type === linkOptions.values.reference,
      relationTo: props.relationTo
    }),
    urlField({
      condition: (_, siblingData) => siblingData?.type === linkOptions.values.custom,
      label: "Custom URL"
    })
  ];
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
var internalLinkField = createField(
  (props) => field({
    name: "reference",
    type: "relationship",
    label: "Document to link to",
    maxDepth: 1,
    relationTo: props.relationTo,
    required: props.required || true
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
export {
  addressField,
  arrayRowLabelField,
  internalLinkField,
  linkField,
  openingHoursField,
  socialsField,
  timeField,
  urlField,
  weekdaysMap
};
//# sourceMappingURL=index.js.map