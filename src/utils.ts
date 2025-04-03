import ky from 'ky'
import { BASE_URL, GITHUB_API_VERSION } from './constant'

export function requestFactory(accessToken?: string) {
  const headers = accessToken ? {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${accessToken}`,
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  } : {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  }
  return ky.create({
    prefixUrl: BASE_URL,
    headers,
  })
}
