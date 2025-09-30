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
  fixedExtension: true,
  shims: true,
  sourcemap: true,
})
