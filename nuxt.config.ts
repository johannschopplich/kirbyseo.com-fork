export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],

  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "nuxt-og-image",
  ],

  compatibilityDate: "2024-04-03",

  site: {
    url: "https://kirbyseo.com",
  },

  content: {
    highlight: {
      theme: {
        light: "github-light",
        default: "github-light",
        dark: "github-dark",
      },
      langs: ["json", "bash", "yaml", "php"],
    },
  },

  image: {
    quality: 80,
    format: ["webp"],
  },

  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md`
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UBadge"].includes(c.pascalName),
      );
      for (const c of globals) c.global = true;
    },
  },

  routeRules: {
    "/docs": { redirect: "/docs/get-started", prerender: false },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/playground", "/buy", "/api/search.json"],
    },
  },
});
