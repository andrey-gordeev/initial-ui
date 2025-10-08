import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';

export default defineConfig({
  tokens: ['./packages/react/src/tokens/tokens-light.json'],
  plugins: [
    css({
      filename: 'tokens-light.css',
      baseSelector: ':root',
    }),
  ],
  outDir: './packages/react/src/tokens/',
});

