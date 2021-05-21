export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sinaptica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'La comunidad de los programadores en Latam' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuelidate.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/router-extras',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Firebase Auth Config
  firebase: {
    config: {
      apiKey: process.env.FBASE_API_KEY,
      authDomain: process.env.FBASE_AUTH_DOMAIN,
      projectId: process.env.FBASE_PROJECT_ID,
      storageBucket: process.env.FBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FBASE_MESSAGING_SENDER_ID,
      appId: process.env.FBASE_APP_ID,
      measurementId: process.env.FBASE_MEASUREMENT_ID,
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
          subscribeManually: false,
        },
        emulatorPort: undefined,
      },
      database: true,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'sp',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
};
