import { Config } from "payload";
import { LocalizedNavigationPluginOptions } from "../types";

export const useNestedDocs = (pluginConfig: LocalizedNavigationPluginOptions) =>
  typeof pluginConfig.nestedDocsPlugin === "object";

export const getLocales = (config: Config): string[] => {
  const { locales } = config.localization || {};
  if (!locales || locales.length === 0) {
    throw new Error(
      "Localization is required but not enabled. Please configure 'localization.locales' in Payload CMS.",
    );
  }
  return locales.map((locale) => String(locale));
};

// Helper to merge hooks safely
export const mergeHooks = <T>(newHooks: T[], existingHooks?: T[]): T[] => {
  return [...(existingHooks || []), ...newHooks];
};
