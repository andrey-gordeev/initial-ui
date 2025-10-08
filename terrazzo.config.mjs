import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import js from '@terrazzo/plugin-js';

export default defineConfig({
  tokens: [
    './packages/react/src/tokens/tokens-light.json',
    './packages/react/src/tokens/tokens-dark.json',
  ],
  plugins: [
    css({
      filename: 'tokens-light.css',
      baseSelector: ':root',
    }),
    css({
      filename: 'tokens-dark.css',
      baseSelector: '[data-theme="dark"]',
    }),
    // js({
    //   js: 'tokens.js',
    //   ts: 'tokens.d.ts',
    //   json: false,
    // }),
  ],
  outDir: './packages/react/src/tokens/',
  lint: {
    /** @see https://terrazzo.app/docs/cli/lint */
  },
});
