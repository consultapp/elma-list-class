// vite.config.ts
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log('__dirname', __dirname)

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ProactorListClassModule', // Имя глобальной переменной для UMD
      formats: ['umd'],
      fileName: (format) => `proactor-list-class.${format}.js`,
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
