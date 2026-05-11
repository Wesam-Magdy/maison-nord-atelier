import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/maison-nord-atelier/",
  },
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
