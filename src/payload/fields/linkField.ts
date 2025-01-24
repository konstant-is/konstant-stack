import type { Field } from 'payload'

import { createField } from '@/utils/createField.js'
import { createFieldOptions } from '@/utils/createFieldOptions.js'
import { field } from '@/utils/field.js'

import { urlField } from './urlField.js'

const linkAppearanceOptions = createFieldOptions(['button', 'cta', 'custom', 'default', 'link'])
const linkOptions = createFieldOptions(['reference', 'custom'])

type Options = {
  relationTo: string[]
  showAppearance?: boolean
}

export const linkField = createField<Options>((props) => {
  const group = field({
    name: props.name || 'link',
    type: 'group',
    admin: {
      condition: props.condition,
      description: props.description,
      hideGutter: props.hideGutter || true,
    },
    fields: [linkOptionsField(), ...types(props), labelField, appearance(props)],
    label: props.label || 'Link',
  })
  return group
})

const linkOptionsField = () => {
  return field({
    type: 'row',
    fields: [
      field({
        name: 'type',
        type: 'radio',
        admin: {
          layout: 'horizontal',
          width: '50%',
        },
        defaultValue: linkOptions.values.reference,
        options: linkOptions.options,
        required: true,
      }),
      field({
        name: 'newTab',
        type: 'checkbox',
        admin: {
          style: {
            alignSelf: 'flex-end',
          },
          width: '50%',
        },
        label: 'Open in new tab',
      }),
    ],
  })
}

const types = (props: Options): Field[] => {
  return [
    internalLinkField({
      condition: (_, siblingData) => siblingData?.type === linkOptions.values.reference,
      relationTo: props.relationTo,
    }),
    urlField({
      condition: (_, siblingData) => siblingData?.type === linkOptions.values.custom,
      label: 'Custom URL',
    }),
  ]
}

const appearance = (props: Options) =>
  field({
    name: 'appearance',
    type: 'select',
    admin: {
      condition: () => props.showAppearance || false,
    },
    defaultValue: linkAppearanceOptions.values.default,
    label: 'Appearance',
    options: linkAppearanceOptions.options,
    required: false,
  })

const labelField = field({
  name: 'label',
  type: 'text',
  label: 'Link Text',
  required: true,
})

export const internalLinkField = createField<{
  relationTo: string[]
}>((props) =>
  field({
    name: 'reference',
    type: 'relationship',
    label: 'Document to link to',
    maxDepth: 1,
    relationTo: props.relationTo,
    required: props.required || true,
  }),
)
