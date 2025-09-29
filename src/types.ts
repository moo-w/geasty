// ########### Geasty Methods Options ###########
interface PaginationOptions {
  /**
   * The page number of the results to fetch.
   *
   * @default 1
   */
  page?: number
  /**
   * The number of results per page (max 100).
   *
   * @default 30
   */
  per_page?: number
}

export interface GeastyOptions {
  /**
   * Fine-grained personal access tokens
   *
   * @see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token
   */
  access_token?: string
}

export interface CreateAGistOptions {
  /**
   * Description of the gist
   */
  description?: string
  /**
   * Flag indicating whether the gist is public
   */
  public?: boolean
  /**
   * Names and content for the files that make up the gist
   *
   * @example
   * ```ts
   * {
   *   'test.txt': {
   *     content: 'Hello World!'
   *   }
   * }
   * ```
   */
  files: {
    /**
     * A user-defined key to represent an item in files.
     */
    [key: string]: {
      /**
       * The new content of the file.
       */
      content: string
    }
  }
}

export interface UpdateAGistOptions {
  /**
   * The unique identifier of the gist.
   */
  gistId: string
  /**
   * The description of the gist.
   */
  description?: string
  /**
   * The gist files to be updated, renamed, or deleted. Each key must match the current filename (including extension) of the targeted gist file. For example: hello.py.
   *
   * To delete a file, set the whole file to null. For example: hello.py : null. The file will also be deleted if the specified object does not contain at least one of content or filename.
   */
  files?: {
    /**
     * A user-defined key to represent an item in files.
     */
    [key: string]: {
      /**
       * The new content of the file.
       */
      content?: string
      /**
       * The new filename for the file.
       */
      filename?: string | null
    }
  }
}

export interface GetGistsOptions extends PaginationOptions {
  /**
   * Only show results that were last updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   *
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  since?: string // YYYY-MM-DDTHH:MM:SSZ
}

export interface GetGistForUserOptions extends GetGistsOptions {
  /**
   * The handle for the GitHub user account.
   */
  username: string
}

export interface GetGistForksOrCommitsOptions extends PaginationOptions {
  /**
   * The unique identifier of the gist.
   */
  gistId: string
}

// ################## Gist Types ##################

interface GistConstructorOptions {
  id: string
  node_id: string
  description?: string
  public: boolean
  created_at: string
  updated_at: string
  files: GistFile[]
  owner: GistUser
  comments: number
  comments_enabled: boolean
}

export class Gist {
  id: string
  node_id: string
  description?: string
  public: boolean
  created_at: string
  updated_at: string
  files: GistFile[]
  owner: GistUser
  comments: number
  comments_enabled: boolean

  constructor(options: GistConstructorOptions) {
    this.id = options.id
    this.node_id = options.node_id
    this.description = options.description
    this.public = options.public
    this.created_at = options.created_at
    this.updated_at = options.updated_at
    this.files = options.files
    this.owner = options.owner
    this.comments = options.comments
    this.comments_enabled = options.comments_enabled
  }
}

interface GistFileConstructorOptions {
  filename: string
  type?: string
  raw_url?: string
  size?: number
  language?: string
  encoding?: 'base64' | 'utf-8'
  content?: string
  truncated?: boolean
}

export class GistFile {
  filename: string
  type?: string
  raw_url?: string
  size?: number
  language?: string
  encoding?: 'base64' | 'utf-8'
  content?: string
  truncated?: boolean

  constructor(options: GistFileConstructorOptions) {
    this.filename = options.filename
    this.type = options.type
    this.raw_url = options.raw_url
    this.size = options.size
    this.language = options.language
    this.encoding = options.encoding
    this.content = options.content
    this.truncated = options.truncated
  }

  async getContentByRawURL() {
    // TODO: implement fetch content by raw_url
  }
}

interface GistUserConstructorOptions {
  id: number
  node_id: string
  login: string
  name?: string
  email?: string
  url: string
  type: string
  site_admin: boolean
}

export class GistUser {
  id: number
  login: string
  node_id: string
  name?: string
  email?: string
  url: string
  type: string
  site_admin: boolean

  constructor(options: GistUserConstructorOptions) {
    this.id = options.id
    this.login = options.login
    this.node_id = options.node_id
    this.name = options.name || options.login
    this.email = options.email
    this.url = options.url
    this.type = options.type
    this.site_admin = options.site_admin
  }
}

interface GistCommitConstructorOptions {
  url: string
  version: string
  user?: GistUser
  change_status: {
    total?: number
    additions?: number
    deletions?: number
  }
  committed_at: string
}

export class GistCommit {
  url: string
  version: string
  committed_at: string
  user?: GistUser
  change_status: {
    total?: number
    additions?: number
    deletions?: number
  }

  constructor(options: GistCommitConstructorOptions) {
    this.url = options.url
    this.version = options.version
    this.committed_at = options.committed_at
    this.user = options.user
    this.change_status = options.change_status
  }
}
