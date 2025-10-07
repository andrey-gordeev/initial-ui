import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import js from '@terrazzo/plugin-js';

export default defineConfig({
  tokens: ['./packages/react/src/tokens/tokens.json'],
  plugins: [
    css({
      filename: 'tokens-light.css',
      baseSelector: ':root',
    }),
    css({
      filename: 'tokens-dark.css',
      baseSelector: '[data-theme="dark"]',
      filter: (token) => {
        // Включаем только темные токены для [data-theme="dark"]
        return token.path.includes('dark');
      },
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
