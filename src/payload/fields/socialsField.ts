import { createField } from '@/utils/createField.js'
import { createFieldOptions } from '@/utils/createFieldOptions.js'
import { field } from '@/utils/field.js'

import { urlField } from './urlField.js'

const socialsOptions = createFieldOptions([
  'facebook',
  'instagram',
  'linkedin',
  'strava',
  'twitter',
])
type SocialsTypes = keyof typeof socialsOptions.values

const fields = (showOnly: SocialsTypes[] = []) => {
  const { options } = socialsOptions

  return options.map((option) => {
    const show = showOnly.length === 0 || showOnly.includes(option.value)

    return urlField({
      name: option.value,
      condition: () => show,
      label: option.label,
      overrides: {
        admin: {
          width: '50%',
        },
      },
      required: false,
    })
  })
}

export const socialsField = createField<{
  showOnly: SocialsTypes[]
}>((props) => {
  return field({
    name: props.name || 'socialMedia',
    type: 'group',
    fields: [
      field({
        type: 'row',
        fields: fields(props.showOnly),
      }),
    ],
    label: props.label || 'Social Media',
  })
})
