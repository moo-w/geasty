// ########### Geasty Methods Options ###########
interface PaginationOptions {
  page?: number
  per_page?: number
}

export interface GeastyOptions {
  access_token?: string
}

export interface CreateAGistOptions {
  description?: string
  public?: boolean
  files: {
    [key: string]: {
      content: string
    }
  }
}

export type UpdateAGistOptions = {
  gistId: string
  description?: string
  files?: {
    [key: string]: {
      content: string
    }
  }
} & ({
  description: string
} | {
  files: {
    [key: string]: {
      content: string
    }
  }
})

export interface GetGistsOptions extends PaginationOptions {
  since?: string // YYYY-MM-DDTHH:MM:SSZ
}

export interface GetGistForUserOptions extends GetGistsOptions {
  username: string
}

export interface GetGistForksOrCommitsOptions extends PaginationOptions {
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
  filename?: string
  type?: string
  raw_url?: string
  size?: number
  language?: string
  encoding?: 'base64' | 'utf-8'
  content?: string
  truncated?: boolean
}

export class GistFile {
  filename?: string
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
}

interface GistUserConstructorOptions {
  id: number
  node_id: string
  name?: string
  email?: string
  url: string
  type: string
  site_admin: boolean
}

export class GistUser {
  id: number
  node_id: string
  name?: string
  email?: string
  url: string
  type: string
  site_admin: boolean

  constructor(options: GistUserConstructorOptions) {
    this.id = options.id
    this.node_id = options.node_id
    this.name = options.name
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
  user?: GistUser
  change_status: {
    total?: number
    additions?: number
    deletions?: number
  }

  committed_at: string

  constructor(options: GistCommitConstructorOptions) {
    this.url = options.url
    this.version = options.version
    this.user = options.user
    this.change_status = options.change_status
    this.committed_at = options.committed_at
  }
}
