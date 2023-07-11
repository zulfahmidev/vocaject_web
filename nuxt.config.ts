// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
  devServer: {
    https: true
  },
  app: {
    head: {
      title: 'Vocaject',
      meta: [
      ],
      bodyAttrs: {
        class: 'bg-slate-100 font-poppins'
      }
    }
    
  },
})
