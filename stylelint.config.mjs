/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-order', 'stylelint-plugin-logical-css'],
  extends: ['stylelint-config-pepelsbey'],
  rules: {
    'plugin/use-logical-properties-and-values': [true, { severity: 'warning' }],
    'plugin/use-logical-units': [true, { severity: 'warning' }],
  },
};
