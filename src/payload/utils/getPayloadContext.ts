import type { SanitizedConfig } from 'payload'

import { draftMode } from 'next/headers.js'
import { getPayload } from 'payload'

import type { PayloadQuery } from '../types.js'

import { getLocale } from './getLocale.js'

export const getPayloadContext = async (
  config: Promise<SanitizedConfig> | SanitizedConfig,
  params: PayloadQuery,
) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })
  const processedLocale = getLocale(payload.config, params.locale)
  const query = {
    draft,
    locale: processedLocale,
    overrideAccess: draft,
  }
  return { draft, locale: processedLocale, payload, query }
}
