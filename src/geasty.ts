import type { KyInstance } from 'ky'
import type {
  CreateAGistOptions,
  GeastyOptions,
  GetGistForksOrCommitsOptions,
  GetGistForUserOptions,
  GetGistsOptions,
  UpdateAGistOptions,
} from './types'
import { GeastyError } from './errors'
import { requestFactory } from './utils'

export default class Geasty {
  private _accessToken?: string
  private _authReq: KyInstance
  private _req = requestFactory()

  constructor(options?: GeastyOptions) {
    this._accessToken = options?.access_token
    this._authReq = requestFactory(options?.access_token)
  }

  private _checkAccessToken() {
    if (!this._accessToken) {
      throw new GeastyError('Access token is required, please provide it.')
    }
  }

  // ################## create ##################

  async createAGist(options: CreateAGistOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .post('gists', { json: { ...options } })
      .json()
    return resp
  }

  // ################## delete ##################

  async deleteAGist(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .delete(`gists/${gistId}`)
      .json()
    return resp
  }

  // ################## update ##################

  async updateAGist(options: UpdateAGistOptions) {
    this._checkAccessToken()
    const { gistId, ...rest } = options
    const resp = await this._authReq
      .patch(`gists/${gistId}`, { json: { ...rest } })
      .json()
    return resp
  }

  // ################## get ##################

  async getAllGists(options?: GetGistsOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get('gists', { searchParams: { ...options } })
      .json()
    return resp
  }

  async getAGist(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}`)
      .json()
    return resp
  }

  async getGistsForUser(options: GetGistForUserOptions) {
    this._checkAccessToken()
    const { username, ...rest } = options
    const resp = await this._authReq
      .get(`users/${options?.username}/gists`, { searchParams: rest })
      .json()
    return resp
  }

  async getAGistRevision(gistId: string, sha: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}/${sha}`)
      .json()
    return resp
  }

  async getPublicGists(options?: GetGistsOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get('gists/public', { searchParams: { ...options } })
      .json()
    return resp
  }

  async getStarredGists(options?: GetGistsOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get('gists/starred', { searchParams: { ...options } })
      .json()
    return resp
  }

  async getGistForks(options: GetGistForksOrCommitsOptions) {
    this._checkAccessToken()
    const { gistId, ...rest } = options
    const resp = await this._authReq
      .get(`gists/${gistId}/forks`, { searchParams: rest })
      .json()
    return resp
  }

  async getGistCommits(options: GetGistForksOrCommitsOptions) {
    this._checkAccessToken()
    const { gistId, ...rest } = options
    const resp = await this._authReq
      .get(`gists/${gistId}/commits`, { searchParams: rest })
      .json()
    return resp
  }

  // ################## other ##################

  async isGistStarred(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}/star`)
      .json()
    return resp
  }

  async starAGist(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}/star`)
      .json()
    return resp
  }

  async unstarAGist(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}/star`)
      .json()
    return resp
  }

  async forkAGist(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}/forks`)
      .json()
    return resp
  }
}
