// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader"
const url = 'https://janaicoffee.tokyo'

export default defineNuxtConfig({
  app: {
    head: {
      title: "JANAI COFFEE",
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#'
      },
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: "時を忘れる。計ることをやめる。周りと比べない。リラックスして日常を忘れる時間を。何一つ考えず、コーヒーと非日常を存分にお楽しみいただける場所。それが『JANAI COFFEE』です。"
        },
        {
          name: 'google-site-verification',
          content: 'CZLvheWwFGDgXuBuk8Hk0Vpx45ZdQTgooFuz3jwk96c'
        },
        {
          name: 'keywords',
          content: "JANAI COFFEE"
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: "JANAI COFFEE" },
        { hid: 'og:image', property: 'og:image', content: `${url}/ogp2.jpg` },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon2.png', sizes:'any' },
        { rel: 'apple-touch-icon', type: "image/png", href: '/apple-touch-icon2.png' },
      ],
      script: [
        { src: 'https://sdk.form.run/js/v2/formrun.js', type: 'text/javascript'},
      ],
    },
  },
  runtimeConfig: {
    spaceId: '',
    accessToken: '',
    host: '',
    public: {
      environment: 'production',
    }
  },
  css: ["@/assets/styles/reset.scss", "@/assets/styles/main.scss" ],
  ssr: true,
  modules: [
    '@nuxt/image',
    "nuxt-icon",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxtjs/i18n"
  ],

  i18n: {
    locales: [
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'ja',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'ja'
    },
    strategy: 'no_prefix'
  },
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: 
          `@import "@/assets/styles/_variables.scss";\
          @import "@/assets/styles/_media-query.scss";`,
        }
      }
    },
    plugins: [
      svgLoader()
    ],
    server: {
      watch: {
        usePolling: true
      }
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => /^(swiper|swiper-slide|swiper-container)$/.test(tag),
    },
  },

  nitro: {
    preset: "vercel",
  },
})
