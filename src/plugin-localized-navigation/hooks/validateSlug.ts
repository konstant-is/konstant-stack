import { FieldHook } from "payload";
import slugify from "slugify"; // Ensure you have this installed and configured

import { SlugFieldConfig } from "../types";
import { logger } from "../utils/logger";

export const validateSlug =
  (config: SlugFieldConfig): FieldHook =>
  ({ siblingData, value, originalDoc, data, req }) => {
    const log = logger(false);

    log.section("validateSlug");
    log.info("lockName:", config.lockFieldName);

    const slugLock = siblingData[config.lockFieldName];
    log.info("lockSlug:", slugLock);

    // If the slug is locked, return the existing value
    if (!slugLock) {
      return value;
    }

    let missingFields: string[] = [];

    // Collect values of the fields used for slug generation
    const fields = config.useFields.map((field) => {
      const fieldValue = data?.[field] || null;

      if (!fieldValue) {
        missingFields.push(field); // Track missing fields
      }

      return fieldValue;
    });

    // If any required fields are missing, log and return the original value
    if (missingFields.length > 0) {
      console.warn("Missing fields for slug generation:", missingFields);
      return value;
    }

    const separator = config.slugify.replacement ?? "-";

    // Generate the slug using slugify
    const processedSlug = fields
      .filter((item) => Boolean(item)) // Remove null/undefined values
      .map((fieldValue) => slugify(String(fieldValue), config.slugify)) // Slugify each field
      .join(separator); // Join the slugified parts

    log.info("Generated slug:", processedSlug);

    return processedSlug;
  };
