// vite.config.ts
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  ssr: {
    noExternal: ['@angular/*'], // prevents Angular from trying to run in SSR
  },
});
