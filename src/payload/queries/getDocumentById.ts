import type { CollectionSlug, SanitizedConfig } from 'payload'
import type { PayloadQuery } from 'src/types.js'

import { cache } from 'react'

import { getPayloadContext } from '../utils/getPayloadContext.js'

type GetDocumentByIdQuery = PayloadQuery<{
  collection: CollectionSlug
  id: string
}>
export const getDocumentById = cache(
  async (config: Promise<SanitizedConfig> | SanitizedConfig, params: GetDocumentByIdQuery) => {
    try {
      const { id, collection } = params
      const { payload, query } = await getPayloadContext(config, params)

      console.info(`Fetching ${collection} with id: ${id}`)
      const result = await payload.findByID({
        id,
        collection,
        ...query,
        depth: 30,
      })

      if (!result) {
        throw new Error(`Document with id ${id} not found in collection ${collection}`)
      }

      return result
    } catch (error) {
      console.error(error)
      return null
    }
  },
)
