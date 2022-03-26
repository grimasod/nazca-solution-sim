export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    routes: ['/ancient-sites', '/meteor-impact-craters', '/volcanoes', 'all-locations']
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nazca Simulation Experiment',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/css/tailwind.css'
  ],

  plugins: [
    '~/plugins/axios.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/stock'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: false
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        autoFetchUser: false
      }
    }
  },

  axios: {
    baseURL: '/' // Used as fallback if no runtime config is provided
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
