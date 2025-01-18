import { CollectionBeforeChangeHook } from "payload";

import { LocalizedNavigationPluginOptions, UrlFieldConfig } from "../types";
import { logger } from "../utils/logger";

export const resolveUrl =
  (
    pluginConfig: LocalizedNavigationPluginOptions,
    config: UrlFieldConfig,
  ): CollectionBeforeChangeHook =>
  ({ data, req }) => {
    const { payload, locale } = req;
    const { defaultLocale = "en" } = payload.config.localization || {};
    const currentLocale = locale || defaultLocale || "en";
    const useNestedDocs = pluginConfig.nestedDocsPlugin !== undefined;

    const log = logger(false);
    log.section("resolveUrl");

    // Generate the base URL
    const baseUrl = generateUrl(config, data, useNestedDocs);
    log.info("Base URL generated:", baseUrl);

    // Resolve the final URL by appending locale if needed
    const resolvedUrl = resolveFinalUrl({
      baseUrl,
      locale: currentLocale,
      defaultLocale,
      appendTo: pluginConfig.appendLocaleToUrl,
    });

    log.info("Final resolved URL:", resolvedUrl);

    return {
      ...data,
      [config.fieldName]: resolvedUrl,
    };
  };

const generateUrl = (
  config: UrlFieldConfig,
  data: Partial<any>,
  useNestedDocs: boolean,
) => {
  // Generate URL if `generateUrl` function is provided
  const generatedUrl =
    typeof config.generateUrl === "function" ? config.generateUrl(data) : "";

  // Handle nested docs logic
  if (useNestedDocs) {
    const breadcrumbs = Array.isArray(data.breadcrumbs) ? data.breadcrumbs : [];
    const nestedUrl = breadcrumbs.reverse()[0]?.url || "";
    return nestedUrl || generatedUrl;
  }

  return generatedUrl;
};

const resolveFinalUrl = ({
  baseUrl,
  appendTo = "none",
  locale,
  defaultLocale,
}: {
  baseUrl: string;
  appendTo: LocalizedNavigationPluginOptions["appendLocaleToUrl"];
  defaultLocale: string;
  locale: string;
}): string => {
  switch (appendTo) {
    case "all":
      return `/${locale}${baseUrl}`;
    case "exclude-default":
      return locale === defaultLocale ? baseUrl : `/${locale}${baseUrl}`;
    default:
      return baseUrl;
  }
};
