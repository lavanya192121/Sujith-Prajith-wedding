// // @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// // or the app will break with duplicate plugins:
// //   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
// //     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
// //     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// // You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
// import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// export default defineConfig({
//   tanstackStart: {
//     // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
//     // nitro/vite builds from this
//     server: { entry: "server" },
//   },
// });

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },

    // Prerendering is disabled: on Netlify it tries to import dist/server/server.js,
    // which the Netlify Nitro preset doesn't emit, causing ERR_MODULE_NOT_FOUND.
    // Pages are server-rendered on request by the Netlify function instead.
    prerender: {
      enabled: false,
    },
  },

  vite: {
    // GitHub Pages serves the site from /Sujith-Prajith-wedding/, while Netlify serves it
    // from the domain root. Netlify sets NETLIFY=true during builds (Nitro also uses it to
    // pick its Netlify preset), so asset and route URLs match where the files are deployed.
    base: process.env.NETLIFY ? "/" : "/Sujith-Prajith-wedding/",
  },
});
