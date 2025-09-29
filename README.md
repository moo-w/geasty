# geasty

[![npm version][ver-img-src]][pkg-href]
[![npm downloads][dls-img-src]][pkg-href]
[![jsDocs.io][jsdocs-img-src]][jsdocs-href]

Simple and easy to use TypeScript library for interacting with GitHub [Gist](https://gist.github.com) API.

## Features

- Use [`ofetch`](https://github.com/unjs/ofetch), a better fetch API, works on node, browser and workers.
- Full CRUD operations for gists
- Support for forks, stars, and commits
- Type-safe API with proper TypeScript definitions
- Authentication via [GitHub access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

## Installation

```bash
npm install geasty
```

## Usage

```typescript
import Geasty from 'geasty'

// Initialize with your GitHub access token
const geasty = new Geasty({ access_token: 'your-github-token' })

// Example: Create a gist
const newGist = await geasty.createAGist({
  files: {
    'hello.txt': { content: 'Hello World!' }
  },
  public: true,
  description: 'My first gist'
})

// Example: Get all gists
const myGists = await geasty.getAllGists()
```

## GitHub Authentication

You can use Geasty with or without authentication. However, to access private gists or perform write operations, you need to provide a GitHub access token. It is recommended to provide an access token, cause authenticated requests have a [higher rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

> [!NOTE]
> [Check how to create a GitHub access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

## API Methods

### Gist Retrieval

- `getAGist(gistId)`
- `getAllGists(options)`
- `getPublicGists(options)`
- `getStarredGists(options)`
- `getGistsForUser(options)`

### Create, Delete, Update

- `createAGist(options)`
- `deleteAGist(gistId)`
- `updateAGist(options)`

### Forks

- `getGistForks(options)`
- `forkAGist(gistId)`

### Commits

- `getGistCommits(options)`
- `getAGistRevision(options)`

### Stars

- `isGistStarred(gistId)`
- `starAGist(gistId)`
- `unstarAGist(gistId)`

### Utils

- `getRawGistFileContent(options)`
- `hasAccessToken()`

> [!IMPORTANT]
> Check the [Type Doc][jsdocs-href] for detailed information.

## References

[GitHub REST API endpoints for gists](https://docs.github.com/en/rest/gists?apiVersion=2022-11-28)

## License

[MIT](./LICENSE) License &copy; 2025-PRESENT [Moozon Wei](https://github.com/moo-w)

<!-- Badges -->
[ver-img-src]: <https://img.shields.io/npm/v/geasty> "npm version image"
[dls-img-src]: <https://img.shields.io/npm/dm/geasty> "npm downloads image"
[pkg-href]: <https://npmjs.com/pakcage/geasty> "npm version image"
[jsdocs-img-src]: <https://img.shields.io/badge/jsDocs.io-reference-blue> "jsDocs.io image"
[jsdocs-href]: <https://www.jsdocs.io/package/geasty> "jsDocs.io reference"
