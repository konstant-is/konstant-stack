import type { Field } from 'payload'

const getBaseProperties = () => {
  return {}
}
export const field = (props: Field): Field => {
  const base = getBaseProperties()

  return {
    ...base,
    ...props,
  } as Field
}
