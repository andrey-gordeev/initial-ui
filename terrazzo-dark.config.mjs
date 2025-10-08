import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';

export default defineConfig({
  tokens: ['./packages/react/src/tokens/tokens-dark.json'],
  plugins: [
    css({
      filename: 'tokens-dark.css',
      baseSelector: '[data-theme="dark"]',
    }),
  ],
  outDir: './packages/react/src/tokens/',
});

