/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9000,
    devMiddleware: {
      index: 'newtab.html',
    },
  },
});
