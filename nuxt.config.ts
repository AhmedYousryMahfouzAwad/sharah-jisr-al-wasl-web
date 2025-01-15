// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "nuxt-countdown",
  ],
  build: {
    transpile: ["primevue"],
  },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  router: {
    middleware: "redirectLogin",
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "",
        },
      },
      ripple: true,
    },
    autoImport: true,
  },

  runtimeConfig: {
    public: {
      base_url: "https://backend.swimmer.aait-sa.com/public/api/",
      device_id: "1",
    },
  },

  compatibilityDate: "2024-09-30",

  // i18n module configuration
  i18n: {
    // lazy: true,
    // strategy: "prefix_except_default",
    langDir: "locales",
    defaultLocale: "ar",
    defaultDirection: "rtl",
    detectBrowserLanguage: false,

    locales: [
      {
        code: "ar",
        iso: "ar",
        name: "العربية",
        file: { path: "ar.json", cache: false },
        dir: "rtl",
      },
      {
        code: "en",
        iso: "en",
        name: "English",
        file: { path: "en.json", cache: false },
        dir: "ltr",
      },
    ],
  },
});
