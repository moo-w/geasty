import type { $Fetch } from 'ofetch'
import type {
  CreateAGistOptions,
  GeastyOptions,
  GetGistForksOrCommitsOptions,
  GetGistForUserOptions,
  GetGistsOptions,
  UpdateAGistOptions,
} from './types'
import type { WithRequired } from './utils'
import { FetchError } from 'ofetch'
import {
  Gist,
  GistCommit,
  GistFile,
  GistUser,
} from './types'
import { requestFactory } from './utils'

export default class Geasty {
  /**
   * Access token for gist api authentication
   *
   * @private
   */
  private _accessToken?: string

  /**
   * Request instance
   *
   * @private
   */
  private _req: $Fetch

  /**
   * @param options Geasty options
   * @param options.access_token Fine-grained personal access tokens
   *
   * @example
   * ```ts
   * const geasty = new Geast({
   *   access_token: 'your_access_token_created_by_github'
   * })
   * ```
   */
  constructor(options?: GeastyOptions) {
    this._accessToken = options?.access_token
    this._req = requestFactory(options?.access_token)
  }

  // ################## create ##################

  /**
   * Allows you to add a new gist with one or more files.
   *
   * @param options
   * @param options.description Description of the gist
   * @param options.public Flag indicating whether the gist is public
   * @param options.files Names and content for the files that make up the gist
   * @returns The created gist
   *
   * @example
   * ```ts
   * creaetAGist({
   *   description: 'Example Gist',
   *   public: true,
   *   files: {'test.txt': {content: 'Hello World!'}},
   * })
   * ```
   */
  async createAGist(options: CreateAGistOptions) {
    const resp = await this._req('gists', {
      method: 'POST',
      body: JSON.stringify(options),
    })
    const gist = this._generateGist(resp)
    return gist
  }

  // ################## delete ##################

  /**
   * Delete a gist.
   * The fine-grained token must have the following permission set:
   *   - "Gists" user permissions (write)
   *
   * @param gistId The unique identifier of the gist.
   *
   * @example
   * ```ts
   * deleteAGist('gist_id')
   * ```
   */
  async deleteAGist(gistId: string) {
    await this._req(`gists/${gistId}`, {
      method: 'DELETE',
    })
  }

  // ################## update ##################

  /**
   * Allows you to update a gist's description and to update, delete, or rename gist files. Files from the previous version of the gist that aren't explicitly changed during an edit are unchanged.
   * The fine-grained token must have the following permission set:
   *   - "Gists" user permissions (write)
   *
   * @param options
   * @param options.gistId The unique identifier of the gist.
   * @param options.description The description of the gist.
   * @param options.files The gist files to be updated, renamed, or deleted.
   * @returns Updated gist
   *
   * @example
   * ```ts
   * updateAGist({
   *   gistId: 'gist_id',
   *   description: 'Updated Description',
   *   files: {'test.txt': {content: 'Hello Geasty!'}},
   * })
   * ```
   */
  async updateAGist(
    options: WithRequired<UpdateAGistOptions, 'description'>
      | WithRequired<UpdateAGistOptions, 'files'>,
  ) {
    const { gistId, ...rest } = options
    const resp = await this._req(`gists/${gistId}`, {
      method: 'PATCH',
      body: JSON.stringify(rest),
    })
    const gists = this._generateGists(resp)
    return gists
  }

  // ################## get ##################
  /**
   * Lists the authenticated user's gists or if called anonymously, this returns all public gists.
   *
   * @param options
   * @param options.since Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   * @param options.page The page number of the results to fetch.
   * @param options.per_page The number of results per page (max 100).
   * @returns List of gists
   *
   * @example
   * ```ts
   * getAllGists({
   *   since: '2023-01-01T00:00:00Z',
   *   page: 1,
   *   per_page: 10,
   * })
   * ```
   */
  async getAllGists(options?: GetGistsOptions) {
    const resp = await this._req('gists', {
      query: options,
    })
    const gists = this._generateGists(resp)
    return gists
  }

  /**
   * Gets a specified gist.
   *
   * @param gistId The unique identifier of the gist.
   * @returns Gist that matches the gist ID
   *
   * @example
   * ```ts
   * getAGist('gist_id')
   * ```
   */
  async getAGist(gistId: string) {
    const resp = await this._req(`gists/${gistId}`)
    const gist = this._generateGist(resp)
    return gist
  }

  /**
   * Lists public gists for the specified user.
   *
   * @param options
   * @param options.username The handle for the GitHub user account
   * @param options.since Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   * @param options.page The page number of the results to fetch.
   * @param options.per_page The number of results per page (max 100).
   * @returns List of public gists for the specified user
   *
   * @example
   * ```ts
   * getGistsForUser({
   *   username: 'github_username',
   *   since: '2023-01-01T00:00:00Z',
   *   page: 1,
   *   per_page: 10,
   * })
   * ```
   */
  async getGistsForUser(options: GetGistForUserOptions) {
    const { username, ...rest } = options
    const resp = await this._req(`users/${options?.username}/gists`, {
      query: rest,
    })
    const gists = this._generateGists(resp)
    return gists
  }

  /**
   * Gets a specified gist revision.
   *
   * @param gistId The unique identifier of the gist
   * @param sha The sha of the gist revision
   * @returns Gist revision that matches the gist ID and sha
   *
   * @example
   * ```ts
   * getAGistRevision('gist_id', 'sha')
   * ```
   */
  async getAGistRevision(gistId: string, sha: string) {
    const resp = await this._req(`gists/${gistId}/${sha}`)
    const gists = this._generateGists(resp)
    return gists
  }

  /**
   * List public gists sorted by most recently updated to least recently updated.
   *
   * @param options
   * @param options.since Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   * @param options.page The page number of the results to fetch.
   * @param options.per_page The number of results per page (max 100).
   * @returns List of gists
   *
   * @example
   * ```ts
   * getPublicGists({
   *   since: '2023-01-01T00:00:00Z',
   *   page: 1,
   *   per_page: 10,
   * })
   * ```
   */
  async getPublicGists(options?: GetGistsOptions) {
    const resp = await this._req('gists/public', {
      query: options,
    })
    const gists = this._generateGists(resp)
    return gists
  }

  /**
   * List the authenticated user's starred gists.
   *
   * @param options
   * @param options.since Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   * @param options.page The page number of the results to fetch.
   * @param options.per_page The number of results per page (max 100).
   * @returns List of starred gists
   *
   * @example
   * ```ts
   * getStarredGists({
   *   since: '2023-01-01T00:00:00Z',
   *   page: 1,
   *   per_page: 10,
   * })
   * ```
   */
  async getStarredGists(options?: GetGistsOptions) {
    const resp = await this._req('gists/starred', {
      query: options,
    })
    const gists = this._generateGists(resp)
    return gists
  }

  /**
   * List gist forks.
   *
   * @param options
   * @param options.gistId The unique identifier of the gist.
   * @param options.page The page number of the results to fetch.
   * @param options.per_page The number of results per page (max 100).
   * @returns List of gist forks
   *
   * @example
   * ```ts
   * getGistForks({
   *   gistId: 'gist_id',
   *   page: 1,
   *   per_page: 10,
   * })
   * ```
   */
  async getGistForks(options: GetGistForksOrCommitsOptions) {
    const { gistId, ...rest } = options
    const resp = await this._req(`gists/${gistId}/forks`, {
      query: rest,
    })
    const gists = this._generateGists(resp)
    return gists
  }

  /**
   * List gist commits.
   *
   * @param options
   * @param options.gistId The unique identifier of the gist.
   * @param options.page The page number of the results to fetch.
   * @param options.per_page The number of results per page (max 100).
   * @returns List of gist commits
   *
   * @example
   * ```ts
   * getGistCommits({
   *   gistId: 'gist_id',
   *   page: 1,
   *   per_page: 10,
   * })
   * ```
   */
  async getGistCommits(options: GetGistForksOrCommitsOptions) {
    const { gistId, ...rest } = options
    const resp = await this._req(`gists/${gistId}/commits`, {
      query: rest,
    })
    const commits = this._generateCommits(resp)
    return commits
  }

  // ################## other ##################

  /**
   * Check if a gist is starred.
   *
   * @param gistId The unique identifier of the gist.
   * @returns Boolean indicating whether the gist is starred
   *
   * @example
   * ```ts
   * isGistStarred('gist_id')
   * ```
   */
  async isGistStarred(gistId: string) {
    try {
      await this._req(`gists/${gistId}/star`)
    }
    catch (error) {
      if (error instanceof FetchError && error.status === 404) {
        return false
      }
      throw error
    }
    return true
  }

  /**
   * Star a gist.
   * The fine-grained token must have the following permission set:
   *   - "Gists" user permissions (write)
   *
   * @param gistId The unique identifier of the gist.
   *
   * @example
   * ```ts
   * starAGist('gist_id')
   * ```
   */
  async starAGist(gistId: string) {
    await this._req(`gists/${gistId}/star`, {
      method: 'PUT',
    })
  }

  /**
   * Star a gist.
   * The fine-grained token must have the following permission set:
   *   - "Gists" user permissions (write)
   *
   * @param gistId The unique identifier of the gist.
   *
   * @example
   * ```ts
   * unstarAGist('gist_id')
   * ```
   */
  async unstarAGist(gistId: string) {
    await this._req(`gists/${gistId}/star`, {
      method: 'DELETE',
    })
  }

  /**
   * Fork a gist.
   * The fine-grained token must have the following permission set:
   *   - "Gists" user permissions (write)
   *
   * @param gistId The unique identifier of the gist.
   *
   * @example
   * ```ts
   * forkAGist('gist_id')
   * ```
   */
  async forkAGist(gistId: string) {
    await this._req(`gists/${gistId}/forks`)
  }

  // ################## utils ##################
  // async getGistFirstFileContent(options: {
  //   username: string
  //   gistId: string
  // }) {
  //   const url = `https://gist.githubusercontent.com/${options.username}/${options.gistId}/raw`
  //   const content = await ky.get(url).text()
  //   return content
  // }

  private _hasAccessToken() {
    return this._accessToken !== undefined
  }

  private _checkAccessToken() {
    if (!this._hasAccessToken()) {
      throw new Error('Access token is required, please provide it.')
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
