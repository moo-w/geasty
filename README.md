# geasty

[![npm version][ver-img-src]][pkg-href]
[![npm downloads][dls-img-src]][pkg-href]

Simple and easy to use TypeScript library for interacting with GitHub [Gist](https://gist.github.com) API.

## Features

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

## API Methods

### Gist Management

- `createAGist(options)`
- `deleteAGist(gistId)`
- `updateAGist(options)`
- `getAGist(gistId)`
- `getAllGists(options)`
- `getPublicGists(options)`
- `getStarredGists(options)`

### User Gists

- `getGistsForUser(options)`

### Forks & Commits

- `getGistForks(options)`
- `getGistCommits(options)`
- `forkAGist(gistId)`

### Stars

- `isGistStarred(gistId)`
- `starAGist(gistId)`
- `unstarAGist(gistId)`

## License

MIT

<!-- Badges -->
[ver-img-src]: <https://img.shields.io/npm/v/geasty> "npm version image"
[dls-img-src]: <https://img.shields.io/npm/dm/geasty> "npm downloads image"
[pkg-href]: <https://npmjs.com/pakcage/geasty> "npm version image"
