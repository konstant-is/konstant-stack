import { Field } from "payload";

import {
  createLocalizedSlugsField,
  createLocalizedUrlField,
  createSlugField,
  createUrlField,
} from "../fields";
import { LocalizedNavigationPluginOptions } from "../types";
import { createConfigs } from "./createConfigs";
import { logger } from "./logger";

export const enhanceFields = ({
  config,
  fields,
  locales,
}: {
  config: LocalizedNavigationPluginOptions;
  fields: Field[];
  locales: string[];
}) => {
  const log = logger(false);
  log.section("enhanceFields");

  let updatedFields = [...fields]; // Start with a copy of the existing fields

  // Create index for fast lookups
  const indexedFields = fields.reduce(
    (index, field) => {
      if ("name" in field && typeof field.name === "string") {
        index[field.name] = field;
      }
      return index;
    },
    {} as Record<string, Field>,
  );

  const addFields = (newFields: Field[]) => {
    newFields.forEach((field) => {
      if ("name" in field && typeof field.name === "string") {
        if (!indexedFields[field.name]) {
          updatedFields.push(field);
          indexedFields[field.name] = field;
          log.info(`Field added: ${field.name}`);
        } else {
          log.info(`Field already exists: ${field.name}`);
        }
      } else {
        console.warn("Field without a name encountered. Skipping:", field);
      }
    });
  };

  // Generate configurations
  const {
    slugFieldConfig,
    urlFieldConfig,
    localizedSlugFieldConfig,
    localizedUrlFieldConfig,
  } = createConfigs(config, locales);

  // Add slug fields
  if (!indexedFields[slugFieldConfig.fieldName]) {
    const slugFields = createSlugField({ config: slugFieldConfig });
    log.info(`Adding slug fields for: ${slugFieldConfig.fieldName}`);
    addFields(slugFields); // Handles multiple slug-related fields
  }

  // Add localized slug fields
  if (!indexedFields[localizedSlugFieldConfig.fieldName]) {
    const localizedField = createLocalizedSlugsField(localizedSlugFieldConfig);
    log.info(
      `Adding localized slug field: ${localizedSlugFieldConfig.fieldName}`,
    );
    addFields([localizedField]);
  }

  // Add URL fields
  if (!indexedFields[urlFieldConfig.fieldName]) {
    const field = createUrlField(urlFieldConfig);
    log.info(`Adding URL field: ${urlFieldConfig.fieldName}`);
    addFields([field]);
  }

  // Add Localized URL field
  if (!indexedFields[localizedUrlFieldConfig.fieldName]) {
    const field = createLocalizedUrlField(localizedUrlFieldConfig);
    log.info(
      `Adding Localized URL field: ${localizedUrlFieldConfig.fieldName}`,
    );
    addFields([field]);
  }

  return {
    fields: updatedFields,
    configs: {
      slugFieldConfig,
      localizedSlugFieldConfig,
      urlFieldConfig,
      localizedUrlFieldConfig,
    },
  };
};
