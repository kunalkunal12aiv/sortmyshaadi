const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'nth-check': path.resolve(__dirname, 'node_modules/nth-check'),
    'postcss': path.resolve(__dirname, 'node_modules/postcss'),
    'css-select': path.resolve(__dirname, 'node_modules/css-select'),
  })
);
