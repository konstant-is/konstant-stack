export function getReference<T>(value: null | string | T | undefined) {
  const isResolved = typeof value !== 'string'

  return isResolved ? (value as T) : null
}
