import type { Block } from 'payload'

import { field } from './field.js'

export const createBlock = (block: Block): Block => {
  const fallbackInterfaceName = () =>
    block.slug.includes('Block') ? block.slug : `${block.slug}Block`

  return {
    ...block,
    interfaceName: block?.interfaceName || fallbackInterfaceName(),
  }
}
type BlockWithSettingsProps<P = unknown> = P
type BlockWithSettingsFn = <P>(props: BlockWithSettingsProps<P>) => Block
export const createBlockWithSettings = (fn: BlockWithSettingsFn) => {
  return (props: BlockWithSettingsProps) => {
    const result = fn(props)

    return createBlock({
      ...result,
      fields: [
        field({
          type: 'tabs',
          tabs: [
            { fields: result.fields, label: 'Content' },
            {
              name: 'settings',
              fields: [
                field({
                  name: 'className',
                  type: 'text',
                  admin: {
                    description: 'Adds custom classes to the block',
                  },
                  hasMany: true,
                  label: 'Class Name',
                }),
                field({
                  name: 'id',
                  type: 'text',
                  admin: {
                    description: 'Add custom ID to the block',
                  },
                  label: 'ID',
                  required: false,
                }),
              ],
              label: 'Settings',
            },
          ],
        }),
      ],
    })
  }
}
