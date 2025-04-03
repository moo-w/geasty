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
