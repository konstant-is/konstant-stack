import * as qs from 'qs-esm'

export const createQueryString = (query: any): string => {
  return qs.stringify(query, { addQueryPrefix: true })
}
