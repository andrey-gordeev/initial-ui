/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-plugin-logical-css'],
  extends: ['stylelint-config-recess-order'],
  rules: {
    'plugin/use-logical-properties-and-values': [true, { severity: 'warning' }],
    'plugin/use-logical-units': [true, { severity: 'warning' }],
  },
};
