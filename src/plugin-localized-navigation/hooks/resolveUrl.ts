import { CollectionBeforeChangeHook } from "payload";

import { UrlFieldConfig } from "../types";
import { logger } from "../utils/logger";

export const resolveUrl =
  (config: UrlFieldConfig): CollectionBeforeChangeHook =>
  ({ data }) => {
    const log = logger(false);
    log.section("resolveUrl");

    // Generate URL if generateUrl function is provided
    let generatedUrl = "";
    if (typeof config.generateUrl === "function") {
      generatedUrl = config.generateUrl(data);
    }

    // Handle nested docs if useNestedDocs is enabled
    let nestedUrl = "";
    if (config.useNestedDocs) {
      log.info(data.breadcrumbs);
      const breadcrumbs = Array.isArray(data.breadcrumbs)
        ? data.breadcrumbs
        : [];
      nestedUrl = breadcrumbs.reverse()[0]?.url || "";
    }

    log.info("generatedUrl:", generatedUrl), log.info("nestedUrl:", nestedUrl);
    return {
      ...data,
      [config.fieldName]: config.useNestedDocs ? nestedUrl : generatedUrl,
    };
  };
