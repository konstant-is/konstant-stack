import { createField } from '@/utils/createField.js'
import { field } from '@/utils/field.js'

export const urlField = createField((props) => {
  const required = props?.required ?? true
  return field({
    name: props?.name ?? 'url',
    type: 'text',
    admin: {
      condition: props?.condition,
      hidden: props.hidden,
    },
    hasMany: false,
    label: props?.label ?? 'Url',
    required,
    validate: (val: any) => {
      if (!required && !val) {
        return true
      }
      try {
        new URL(val)
        return true
      } catch (err: any) {
        return 'Invalid URL'
      }
    },
  })
})
