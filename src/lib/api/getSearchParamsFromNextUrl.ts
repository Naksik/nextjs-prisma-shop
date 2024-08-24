import {NextURL} from 'next/dist/server/web/next-url'

export function getSearchParamsFromNextUrl<T extends Record<string, any>>(
  nextUrl: NextURL,
) {
  const {searchParams} = nextUrl

  return Object.fromEntries(searchParams.entries()) as T
}
