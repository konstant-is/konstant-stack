import type { GlobalConfig } from 'payload'

export const createGlobalConfig = (config: GlobalConfig): GlobalConfig => {
  return {
    access: {
      read: () => true,
      ...config.access,
    },
    ...config,
  }
}
