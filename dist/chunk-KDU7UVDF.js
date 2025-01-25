// src/payload/utils/getLocale.ts
var isLocale = (locale, localeCodes) => {
  if (!locale) {
    return false;
  }
  return localeCodes.includes(locale);
};
var getLocale = (config, locale) => {
  const { localization } = config;
  if (!localization) {
    throw new Error(`Localization is not supported by Payload`);
  }
  const { defaultLocale, localeCodes } = localization;
  if (isLocale(locale, localeCodes)) {
    return locale;
  }
  return defaultLocale;
};

// src/payload/utils/getPayloadContext.ts
import { draftMode } from "next/headers.js";
import { getPayload } from "payload";
var getPayloadContext = async (config, params) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const processedLocale = getLocale(payload.config, params.locale);
  const query = {
    draft,
    locale: processedLocale,
    overrideAccess: draft
  };
  return { draft, locale: processedLocale, payload, query };
};

export {
  getLocale,
  getPayloadContext
};
//# sourceMappingURL=chunk-KDU7UVDF.js.map