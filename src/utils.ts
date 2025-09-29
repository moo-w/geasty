import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import { BASE_URL, GITHUB_API_VERSION } from './constant'

export function requestFactory(accessToken?: string) {
  const baseHeaders = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  }

  const baseFetchOptions: FetchOptions = {
    baseURL: BASE_URL,
    headers: baseHeaders,
    parseResponse: JSON.parse,
  }

  if (accessToken) {
    return ofetch.create({
      ...baseFetchOptions,
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }
  return ofetch.create(baseFetchOptions)
}

// type utils
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
