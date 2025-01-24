import type { CollectionConfig } from 'payload'

export const createCollectionConfig = (config: CollectionConfig): CollectionConfig => {
  return {
    access: {
      read: () => true,
      ...config.access,
    },
    ...config,
  }
}
