import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss(),], },
  css: ['~/assets/styles/global.css'],
  runtimeConfig: {
    public: {
      formEndpoint: process.env.FORM_ENDPOINT,
    },
  },
  app: {
    head: {
      title: "Talent's Forge - Le Talent ça se Forge",
      titleTemplate: '%s - Talent\'s Forge',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Forgez des talents, des idées et des collaborations uniques. Talent\'s Forge connecte les talents pour créer des projets exceptionnels.'
        },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Talent\'s Forge - Le Talent ça se Forge' },
        {
          property: 'og:description',
          content: 'Forgez des talents, des idées et des collaborations uniques. Talent\'s Forge connecte les talents pour créer des projets exceptionnels.'
        },
        { property: 'og:locale', content: 'fr_FR' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Talent\'s Forge - Le Talent ça se Forge' },
        {
          name: 'twitter:description',
          content: 'Forgez des talents, des idées et des collaborations uniques. Talent\'s Forge connecte les talents pour créer des projets exceptionnels.'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
