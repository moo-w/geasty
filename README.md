# geasty

Simple and easy to use TypeScript library for interacting with GitHub [Gist](https://gist.github.com) API.

## Features

- Full CRUD operations for gists
- Support for forks, stars, and commits
- Type-safe API with proper TypeScript definitions
- Authentication via GitHub access tokens

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
