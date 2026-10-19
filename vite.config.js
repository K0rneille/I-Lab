import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

let buildOutputDir

// https://vite.dev/config/
export default defineConfig({
  // Publication sous https://thibaultgillet.be/projets/ilab/
  base: '/projets/ilab/',
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'copy-site-metadata-images',
      apply: 'build',
      configResolved(config) {
        buildOutputDir = resolve(config.root, config.build.outDir)
      },
      closeBundle() {
        const assetsDir = resolve(buildOutputDir, 'assets')
        mkdirSync(assetsDir, { recursive: true })

        for (const fileName of ['favicon.webp', 'imageDePartage.webp']) {
          copyFileSync(
            fileURLToPath(new URL(`./src/components/img/${fileName}`, import.meta.url)),
            resolve(assetsDir, fileName),
          )
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
