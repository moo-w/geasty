// @ts-check
import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: [
    'src/index.ts',
  ],
  exports: true,
  fixedExtension: true,
  format: ['esm', 'cjs'],
  shims: true,
  sourcemap: true,
})
