import { fileURLToPath } from 'url'
import { resolve } from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-md'
// import code from '@yankeeinlondon/code-builder'
// import link from '@yankeeinlondon/link-builder'
// import meta from '@yankeeinlondon/meta-builder'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(fileURLToPath(import.meta.url), 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      // pagesDir: 'src/pages',
      extensions: ['vue', 'md'],
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/store',
      ],
      vueTemplate: true
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Unocss(),

    Markdown({
      headEnabled: true,
      frontmatterDefaults: {
        requireAuth: false,
      },
      style: {
        baseStyle: 'github',
      },
      // builders: [
      //   meta(),
      //   link(),
      //   code({
      //     theme: 'base',
      //   }),
      // ],
    }),

    Inspect(),
  ],
})

export default config
