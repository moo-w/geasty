// @ts-check
import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: [
    'src/index.ts',
  ],
  exports: {
    customExports: (exports) => {
      delete exports['./package.json']
      return exports
    },
  },
  format: ['esm'],
  // fixedExtension: true,
  // TODO: Change outExtensions to fixedExtension when jsdocs-io/web support new extractor
  outExtensions: (ctx) => {
    if (ctx.format === 'es') {
      return {
        js: '.mjs',
        dts: '.d.ts',
      }
    }
  },
  shims: true,
  sourcemap: true,
})
