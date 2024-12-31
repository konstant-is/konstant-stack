import {
  deepMerge
} from "../chunk-Y4FC33LH.js";
import {
  capitalize,
  formatSlug
} from "../chunk-3I3J54W3.js";

// src/payload/fields/fieldConfig.ts
var fieldConfigInstance = {
  localized: false,
  required: false
};
var getFieldConfig = () => {
  if (!fieldConfigInstance) {
  }
  const config = fieldConfigInstance || {};
  return config;
};

// src/payload/fields/fields.ts
var createField = (field2) => {
  const config = getFieldConfig();
  const merged = { ...config, ...field2 };
  return merged;
};
var field = (props) => createField(props);
var textField = (props) => {
  const { hasMany = false, validate, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "text",
      hasMany: true,
      validate
      // Ensure validate is correctly typed
    });
  }
  return createField({
    ...rest,
    type: "text",
    hasMany: false,
    maxRows: void 0,
    minRows: void 0,
    validate
    // Ensure validate is correctly typed
  });
};
var textareaField = (props) => {
  return createField({
    type: "textarea",
    ...props
  });
};
var numberField = (props) => {
  const { hasMany = false, validate, ...rest } = props;
  if (hasMany) {
    return createField({
      type: "number",
      hasMany: true,
      validate,
      // Ensure validate is correctly typed
      ...rest
    });
  }
  return createField({
    type: "number",
    hasMany: false,
    validate,
    ...rest,
    maxRows: void 0,
    minRows: void 0
  });
};
var richTextField = (props) => {
  return createField({
    type: "richText",
    ...props
  });
};
var selectField = (props) => {
  const { hasMany = false, validate, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "select",
      hasMany: true,
      validate
      // Ensure validate is correctly typed
    });
  }
  return createField({
    ...rest,
    type: "select",
    hasMany: false,
    validate
    // Ensure validate is correctly typed
  });
};
var tabsField = (props) => {
  return createField({
    type: "tabs",
    ...props
  });
};
var tabField = (props) => props;
var blocksField = (props) => {
  return createField({
    type: "blocks",
    ...props
  });
};
var uploadField = (props) => {
  const { hasMany = false, validate, maxRows, minRows, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "upload",
      hasMany: true,
      validate,
      // Ensure validate is correctly typed
      maxRows,
      // Include maxRows if hasMany is true
      minRows
      // Include minRows if hasMany is true
    });
  }
  return createField({
    ...rest,
    max: void 0,
    min: void 0,
    type: "upload",
    hasMany: false,
    validate,
    // Ensure validate is correctly typed
    maxRows: void 0,
    // Explicitly set maxRows to undefined
    minRows: void 0
    // Explicitly set minRows to undefined
  });
};
var groupField = (props) => {
  return createField({
    type: "group",
    ...props
  });
};
var rowField = (props) => {
  return createField({
    type: "row",
    ...props
  });
};
var radioField = (props) => {
  return createField({
    type: "radio",
    ...props
  });
};
var checkboxField = (props) => {
  return createField({
    type: "checkbox",
    ...props
  });
};
var relationshipField = (props) => {
  const { hasMany = false, validate, admin, ...rest } = props;
  if (hasMany) {
    return createField({
      ...rest,
      type: "relationship",
      hasMany: true,
      validate,
      // Ensure validate is correctly typed
      admin: {
        ...admin,
        sortOptions: admin?.sortOptions
        // Ensure sortOptions is correctly typed
      },
      relationTo: rest.relationTo
      // Ensure relationTo is correctly typed
    });
  }
  return createField({
    ...rest,
    maxRows: void 0,
    // Explicitly set maxRows to undefined
    minRows: void 0,
    // Explicitly set minRows to undefined
    min: void 0,
    // Explicitly set min to undefined
    max: void 0,
    // Explicitly set max to undefined
    type: "relationship",
    hasMany: false,
    validate,
    // Ensure validate is correctly typed
    admin: {
      ...admin,
      sortOptions: admin?.sortOptions
      // Ensure sortOptions is correctly typed
    },
    relationTo: rest.relationTo
    // Ensure relationTo is correctly typed
  });
};
var arrayField = (props) => {
  return createField({
    type: "array",
    ...props
  });
};
var dateField = (props) => {
  return createField({
    type: "date",
    ...props
  });
};
var collapsibleField = (props) => {
  return {
    type: "collapsible",
    ...props,
    label: props.label,
    admin: {
      initCollapsed: true,
      ...props.admin
    }
  };
};
var pointField = (props) => {
  return createField({
    type: "point",
    ...props
  });
};
var emailField = (props) => {
  return createField({
    type: "email",
    ...props
  });
};
var jsonField = (props) => {
  return createField({
    type: "json",
    ...props
  });
};
var uiField = (props) => {
  return createField({
    type: "ui",
    ...props
  });
};

// src/payload/utils/createField.ts
function createField2(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return deepMerge(field2, props.overrides || {});
  };
}

// src/payload/custom/addressField.ts
var addressField = createField2((props) => {
  const fieldCondition = (fieldName) => {
    if (!props.hideFields?.length) return true;
    return props.hideFields.includes(fieldName) ? false : true;
  };
  return groupField({
    name: props.name ?? "address",
    label: props?.label,
    interfaceName: "Address",
    localized: false,
    admin: {
      condition: props?.condition,
      hideGutter: props?.hideGutter,
      description: props?.description
    },
    fields: [
      rowField({
        fields: [
          textField({
            name: "addressLine1",
            label: "Address",
            localized: false,
            required: false
          }),
          textField({
            name: "addressLine2",
            label: "Address extra",
            localized: false,
            required: false,
            admin: {
              condition: (_, siblingData) => fieldCondition("addressLine2")
            }
          })
        ]
      }),
      rowField({
        fields: [
          textField({
            name: "state",
            label: "State",
            localized: false,
            required: false,
            admin: {
              condition: (_, siblingData) => fieldCondition("state")
            }
          }),
          textField({
            name: "city",
            label: "City",
            localized: false,
            required: false,
            admin: {
              condition: (_, siblingData) => fieldCondition("city")
            }
          }),
          textField({
            name: "postalCode",
            label: "Postal Code",
            localized: false,
            required: false,
            admin: {
              condition: (_, siblingData) => fieldCondition("postalCode")
            }
          })
        ]
      }),
      pointField({
        name: "location",
        localized: false,
        required: false,
        admin: {
          condition: (_, siblingData) => fieldCondition("location")
        }
      })
    ]
  });
});

// src/payload/utils/blockBuilder.ts
var blockBuilder = (config) => {
  const helper = blockBuilderHelper({
    config
  });
  return helper;
};
var blockBuilderHelper = (props) => {
  const { config } = props;
  let blockKeys = Object.keys(config).filter((b) => {
    const blockSettings = config[b];
    if (typeof blockSettings === "boolean" && blockSettings === false) {
      return false;
    }
    return true;
  }) || [];
  const exclude = (...blocks) => {
    blockKeys = blockKeys.filter((key) => !blocks.includes(key));
    return builder;
  };
  const filter = (predicate) => {
    blockKeys = blockKeys.filter(predicate);
  };
  const only = (...blocks) => {
    blockKeys = blockKeys.filter((key) => blocks.includes(key));
    return builder;
  };
  const build = (params) => {
    const blocks = blockKeys.map((key) => {
      const block = config[key];
      if (!block) {
        console.error(`Block ${key} not found in blockMap`);
        return null;
      }
      return block(params);
    });
    return blocks.filter((b) => b !== null);
  };
  const builder = {
    filter,
    exclude,
    build,
    only
  };
  return builder;
};

// src/payload/utils/createConfig.ts
var createCollectionConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};
var createGlobalConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};
var createBlock = (block) => {
  const fallbackInterfaceName = () => block.slug.includes("Block") ? block.slug : `${block.slug}Block`;
  return {
    ...block,
    interfaceName: block?.interfaceName || fallbackInterfaceName()
  };
};

// src/payload/custom/linkField.ts
var linkAppearanceOptions = {
  default: {
    label: "Default",
    value: "default"
  },
  button: {
    label: "Button",
    value: "button"
  },
  cta: {
    label: "CTA",
    value: "cta"
  },
  link: {
    label: "Link",
    value: "link"
  },
  custom: {
    label: "Custom",
    value: "custom"
  }
};
var linkOptions = {
  reference: {
    label: "Internal link",
    value: "reference"
  },
  custom: {
    label: "Custom URL",
    value: "custom"
  }
};
var linkField = createField2((props) => {
  const options = rowField({
    fields: [
      radioField({
        name: "type",
        admin: {
          layout: "horizontal",
          width: "50%"
        },
        required: true,
        defaultValue: linkOptions.reference.value,
        options: Object.values(linkOptions)
      }),
      checkboxField({
        name: "newTab",
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
  const appearance = selectField({
    name: "appearance",
    label: "Appearance",
    required: true,
    defaultValue: "default",
    options: Object.values(linkAppearanceOptions)
  });
  const types = [
    internalLinkField({
      relationTo: props.relationTo,
      condition: (_, siblingData) => siblingData?.type === "reference"
    }),
    externalLinkField({
      condition: (_, siblingData) => siblingData?.type === "custom"
    })
  ];
  const label = textField({
    name: "label",
    label: "Link Text",
    required: true
  });
  const field2 = groupField({
    name: props.name || "link",
    label: props.label || "Link",
    admin: {
      hideGutter: true,
      condition: props.condition
    },
    fields: [options, ...types, label, appearance]
  });
  return deepMerge(field2, props.overrides);
});
var externalLinkField = createField2((props) => {
  const field2 = textField({
    name: "url",
    admin: {
      condition: props.condition,
      hidden: props.hidden
    },
    label: props.label || "Custom URL",
    required: props.required || true
  });
  return field2;
});
var internalLinkField = createField2((props) => {
  const field2 = relationshipField({
    name: "reference",
    admin: {
      condition: props.condition
    },
    label: props.label || "Document to link to",
    maxDepth: 1,
    relationTo: props.relationTo,
    required: props.required || true
  });
  return field2;
});

// src/payload/custom/slugField/index.ts
var formatSlugHook = (fallback) => ({ data, operation, originalDoc, value }) => {
  if (typeof value === "string") {
    return formatSlug(value);
  }
  if (operation === "create" || !data?.slug) {
    const fallbackData = data?.[fallback] || data?.[fallback];
    if (fallbackData && typeof fallbackData === "string") {
      return formatSlug(fallbackData);
    }
  }
  return value;
};
var slugField = (fieldToUse = "title", overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides;
  const checkBoxField = {
    name: "slugLock",
    type: "checkbox",
    defaultValue: true,
    admin: {
      hidden: true,
      position: "sidebar"
    },
    ...checkboxOverrides
  };
  const field2 = textField({
    name: "slug",
    label: "Slug",
    index: true,
    ...slugOverrides || {},
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)]
    },
    admin: {
      position: "sidebar",
      ...slugOverrides?.admin || {},
      components: {
        Field: {
          path: "@konstant/payload/components#SlugComponent",
          //
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name
          }
        }
      }
    }
  });
  return [field2, checkBoxField];
};

// src/payload/custom/timeField.ts
var timeField = createField2((props) => {
  return dateField({
    name: props.name ?? "time",
    label: props.label ?? "Time",
    required: props?.required,
    localized: false,
    // defaultValue: name === "open" ? "09:00" : "16:00",
    admin: {
      condition: props?.condition,
      description: props?.description,
      date: {
        pickerAppearance: "timeOnly",
        timeFormat: "HH:mm",
        displayFormat: "HH:mm"
      }
    }
  });
});

// src/payload/custom/urlField.ts
var urlField = createField2((props) => {
  const required = props?.required ?? true;
  return textField({
    name: props?.name ?? "url",
    label: props?.label ?? "Url",
    hasMany: false,
    required,
    admin: {
      condition: props?.condition
    },
    validate: (val) => {
      if (!required && !val) return true;
      try {
        new URL(val);
        return true;
      } catch (err) {
        return "Invalid URL";
      }
    }
  });
});

// src/payload/custom/openingHoursField.ts
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
var openingHoursField = createField2((props) => {
  const items = arrayField({
    name: "items",
    label: "Opening Hours",
    fields: [
      selectField({
        name: "days",
        hasMany: true,
        required: true,
        localized: false,
        defaultValue: [],
        options: dayOptions
      }),
      textField({ name: "label", required: true }),
      ...timeFields()
    ]
  });
  const customOpeningHours = arrayField({
    name: "custom",
    label: "Custom Opening Hours",
    fields: [
      textField({ name: "label", required: true }),
      dateField({
        name: "date",
        label: "Date",
        required: true,
        admin: {
          date: {
            pickerAppearance: "dayOnly",
            displayFormat: "d MMM yyy"
          }
        }
      }),
      ...timeFields()
    ]
  });
  return groupField({
    name: "openingHours",
    interfaceName: "OpeningHours",
    fields: [
      rowField({
        fields: [
          textField({
            name: "openLabel",
            admin: { width: "50%" }
          }),
          textField({
            name: "closedLabel",
            admin: { width: "50%" }
          })
        ]
      }),
      rowField({
        fields: [
          textField({
            name: "openNowLabel",
            admin: { width: "50%" }
          }),
          textField({
            name: "closedNowLabel",
            admin: { width: "50%" }
          })
        ]
      }),
      items,
      customOpeningHours
    ]
  });
});
var timeFields = () => {
  return [
    rowField({
      admin: {
        condition: (_, siblingData) => !siblingData.isClosed
      },
      fields: ["openingTime", "closingTime"].map(
        (name) => timeField({ name, label: capitalize(name) })
      )
    }),
    checkboxField({ name: "isClosed", label: "Closed whole day" }),
    textField({
      name: "closedLabel",
      admin: { condition: (_, siblingData) => siblingData.isClosed }
    })
  ];
};

// src/payload/custom/socialMediaField.ts
var socialsOptions = {
  facebook: {
    label: "Facebook",
    value: "facebook"
  },
  instagram: {
    label: "Instagram",
    value: "instagram"
  },
  twitter: {
    label: "Twitter",
    value: "twitter"
  },
  linkedin: {
    label: "LinkedIn",
    value: "linkedin"
  },
  strava: {
    label: "Strava",
    value: "strava"
  }
};
var fields = (showOnly = []) => Object.keys(socialsOptions).map((key) => {
  const socialKey = key;
  const show = showOnly.length === 0 || showOnly.includes(socialKey);
  return urlField({
    name: socialKey,
    label: socialsOptions[socialKey].label,
    required: false,
    condition: () => show,
    overrides: {
      admin: {
        width: "50%"
      }
    }
  });
});
var socialsField = createField2((props) => {
  return groupField({
    name: props.name || "socialMedia",
    label: props.label || "Social Media",
    fields: [
      rowField({
        fields: fields(props.showOnly)
      })
    ]
  });
});
export {
  addressField,
  arrayField,
  blockBuilder,
  blockBuilderHelper,
  blocksField,
  checkboxField,
  collapsibleField,
  createBlock,
  createCollectionConfig,
  createField2 as createField,
  createGlobalConfig,
  dateField,
  emailField,
  externalLinkField,
  field,
  formatSlugHook,
  groupField,
  internalLinkField,
  jsonField,
  linkField,
  numberField,
  openingHoursField,
  pointField,
  radioField,
  relationshipField,
  richTextField,
  rowField,
  selectField,
  slugField,
  socialsField,
  tabField,
  tabsField,
  textField,
  textareaField,
  timeField,
  uiField,
  uploadField,
  urlField,
  weekdaysMap
};
//# sourceMappingURL=index.js.map