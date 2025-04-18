import type { KyInstance } from 'ky'
import type {
  CreateAGistOptions,
  GeastyOptions,
  GetGistForksOrCommitsOptions,
  GetGistForUserOptions,
  GetGistsOptions,
  UpdateAGistOptions,
} from './types'
import ky, { HTTPError } from 'ky'
import { GeastyError } from './errors'
import {
  Gist,
  GistCommit,
  GistFile,
  GistUser,
} from './types'
import { requestFactory } from './utils'

export default class Geasty {
  private _accessToken?: string
  private _authReq: KyInstance
  private _req = requestFactory()

  constructor(options?: GeastyOptions) {
    this._accessToken = options?.access_token
    this._authReq = requestFactory(options?.access_token)
  }

  // ################## create ##################

  async createAGist(options: CreateAGistOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .post('gists', { json: { ...options } })
      .json()
    const gist = this._generateGist(resp)
    return gist
  }

  // ################## delete ##################

  async deleteAGist(gistId: string) {
    this._checkAccessToken()
    await this._authReq
      .delete(`gists/${gistId}`)
      .json()
  }

  // ################## update ##################

  async updateAGist(options: UpdateAGistOptions) {
    this._checkAccessToken()
    const { gistId, ...rest } = options
    const resp = await this._authReq
      .patch(`gists/${gistId}`, { json: { ...rest } })
      .json()
    // TODO: add gist history
    const gists = this._generateGists(resp)
    return gists
  }

  // ################## get ##################

  async getAllGists(options?: GetGistsOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get('gists', { searchParams: { ...options } })
      .json()
    const gists = this._generateGists(resp)
    return gists
  }

  async getAGist(gistId: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}`)
      .json()
    const gist = this._generateGist(resp)
    return gist
  }

  async getGistsForUser(options: GetGistForUserOptions) {
    this._checkAccessToken()
    const { username, ...rest } = options
    const resp = await this._authReq
      .get(`users/${options?.username}/gists`, { searchParams: rest })
      .json<any>()
    const gists = this._generateGists(resp)
    return gists
  }

  async getAGistRevision(gistId: string, sha: string) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get(`gists/${gistId}/${sha}`)
      .json()
    const gists = this._generateGists(resp)
    return gists
  }

  async getPublicGists(options?: GetGistsOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get('gists/public', { searchParams: { ...options } })
      .json()
    const gists = this._generateGists(resp)
    return gists
  }

  async getStarredGists(options?: GetGistsOptions) {
    this._checkAccessToken()
    const resp = await this._authReq
      .get('gists/starred', { searchParams: { ...options } })
      .json()
    const gists = this._generateGists(resp)
    return gists
  }

  async getGistForks(options: GetGistForksOrCommitsOptions) {
    this._checkAccessToken()
    const { gistId, ...rest } = options
    const resp = await this._authReq
      .get(`gists/${gistId}/forks`, { searchParams: rest })
      .json()
    const gists = this._generateGists(resp)
    return gists
  }

  async getGistCommits(options: GetGistForksOrCommitsOptions) {
    this._checkAccessToken()
    const { gistId, ...rest } = options
    const resp = await this._authReq
      .get(`gists/${gistId}/commits`, { searchParams: rest })
      .json()
    const commits = this._generateCommits(resp)
    return commits
  }

  // ################## other ##################

  async isGistStarred(gistId: string) {
    this._checkAccessToken()
    try {
      await this._authReq
        .get(`gists/${gistId}/star`)
        .json()
    }
    catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === 404) {
          return false
        }
      }
      throw error
    }
    return true
  }

  async starAGist(gistId: string) {
    this._checkAccessToken()
    await this._authReq
      .put(`gists/${gistId}/star`)
      .json()
  }

  async unstarAGist(gistId: string) {
    this._checkAccessToken()
    await this._authReq
      .delete(`gists/${gistId}/star`)
      .json()
  }

  async forkAGist(gistId: string) {
    this._checkAccessToken()
    await this._authReq
      .get(`gists/${gistId}/forks`)
      .json()
  }

  // ################## utils ##################
  async getGistFirstFileContent(options: {
    username: string,
    gistId: string,
  }) {
    const url = `https://gist.githubusercontent.com/${options.username}/${options.gistId}/raw`
    const content = await ky.get(url).text()
    return content
  }

  private _checkAccessToken() {
    if (!this._accessToken) {
      throw new GeastyError('Access token is required, please provide it.')
    }
  }

  private _generateGistFile(options: any) {
    return new GistFile({
      filename: options.filename,
      type: options.type,
      raw_url: options.raw_url,
      size: options.size,
      language: options.language,
      encoding: options.encoding,
      content: options.content,
      truncated: options.truncated,
    })
  }

  private _generateGistFiles(options: any) {
    const files = Object.entries(options).map(([filename, file]: [string, any]) => {
      return this._generateGistFile({
        filename,
        ...file,
      })
    })
    return files
  }

  private _generateGistUser(options: any) {
    return new GistUser({
      id: options.id,
      login: options.login,
      node_id: options.node_id,
      url: options.url,
      name: options.name,
      email: options.email,
      type: options.type,
      site_admin: options.site_admin,
    })
  }

  private _generateGist(options: any) {
    const files = this._generateGistFiles(options.files)
    const owner = this._generateGistUser(options.owner)
    return new Gist({
      id: options.id,
      node_id: options.node_id,
      description: options.description,
      public: options.public,
      created_at: options.created_at,
      updated_at: options.updated_at,
      files,
      owner,
      comments: options.comments,
      comments_enabled: options.comments_enabled,
    })
  }

  private _generateGists(options: any) {
    const gists: Gist[] = options.map((gist: any) => {
      return this._generateGist(gist)
    })
    return gists
  }

  private _generateCommit(options: any) {
    const user = this._generateGistUser(options.user)
    return new GistCommit({
      url: options.url,
      version: options.version,
      committed_at: options.committed_at,
      user,
      change_status: options.change_status,
    })
  }

  private _generateCommits(options: any) {
    const commits: GistCommit[] = options.map((commit: any) => {
      return this._generateCommit(commit)
    })
    return commits
  }
}
